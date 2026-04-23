import nodemailer from "nodemailer";
import admin from "firebase-admin";
import { nanoid } from "nanoid";

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

function generateCoupon(email) {
  const prefix = email.split("@")[0].substring(0, 4).toUpperCase();
  const random = nanoid(4).toUpperCase();
  return `XBASE${prefix}${random}`;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const snapshot = await db
      .collection("subscribers")
      .where("email", "==", email)
      .get();

    if (!snapshot.empty) {
      const existing = snapshot.docs[0].data();
      return res.json({ coupon: existing.coupon });
    }

    const coupon = generateCoupon(email);

    await db.collection("subscribers").add({
      email,
      coupon,
      createdAt: new Date(),
    });

    await transporter.sendMail({
      from: `"XBASE" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your XBASE Code 🚀",
      html: `<h2>${coupon}</h2>`,
    });

    return res.json({ coupon });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}