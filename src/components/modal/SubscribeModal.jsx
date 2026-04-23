import { useEffect, useState } from "react";
import "./subscribeModal.css";

export default function SubscribeModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    if (!email) return alert("Enter email");

    setLoading(true);

    const res = await fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("RAW RESPONSE:", text);
    setLoading(false);

    if (data.coupon) {
      setCoupon(data.coupon);

      if (window.gtag) {
        window.gtag("event", "email_submit", {
          event_category: "engagement",
        });
      }
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(coupon);
    alert("Copied 😏");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {!coupon ? (
          <>
            <h2 className="modal-title">Get Early Access</h2>
            <p className="modal-subtitle">
              Join waitlist & get your exclusive code
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="modal-input"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={submit}
              disabled={loading}
              className="modal-btn"
            >
              {loading ? "Generating..." : "Get Code"}
            </button>
          </>
        ) : (
          <>
            <h2 className="modal-title">Your Code 🎉</h2>

            <div className="modal-coupon">{coupon}</div>

            <button onClick={copy} className="modal-btn">
              Copy Code
            </button>

            <p className="modal-note">
              Also sent to your email
            </p>
          </>
        )}

      </div>
    </div>
  );
}