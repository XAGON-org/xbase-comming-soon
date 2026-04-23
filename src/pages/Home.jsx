import { useEffect, useState } from "react";
import ImageBanner from "../components/sections/ImageBanner";
import SubscribeModal from "../components/modal/SubscribeModal";

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3500); // not annoying, not late

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ImageBanner />
      <SubscribeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}