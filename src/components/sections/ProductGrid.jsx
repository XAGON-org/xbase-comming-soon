import Card from "../ui/Card";
import images from "../../data/images";

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <Card key={i} src={img} />
      ))}
    </div>
  );
}