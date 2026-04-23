export const subscribe = async (email) => {
  const res = await fetch("http://localhost:5000/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res.json();
};