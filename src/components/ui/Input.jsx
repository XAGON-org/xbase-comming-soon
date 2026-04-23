export default function Input({ value, onChange }) {
  return (
    <input
      type="email"
      placeholder="Enter your email"
      value={value}
      onChange={onChange}
      className="border p-2 w-full rounded-md"
    />
  );
}