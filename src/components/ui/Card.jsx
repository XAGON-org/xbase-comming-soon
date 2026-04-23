export default function Card({ src }) {
  return (
    <div className="bg-white rounded-xl p-2 shadow hover:scale-105 transition">
      <img
        src={src}
        className="w-full h-32 md:h-40 lg:h-48 object-cover rounded-lg"
      />
    </div>
  );
}