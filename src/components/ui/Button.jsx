export default function Button({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-4 py-2 w-full rounded-md"
    >
      {loading ? "Loading..." : children}
    </button>
  );
}