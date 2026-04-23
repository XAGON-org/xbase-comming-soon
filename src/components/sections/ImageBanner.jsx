import { useEffect, useState } from "react";

export default function ImageBanner() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;

      if (width < 1300) {
        setDevice("mobile");
      } else if (width < 1500) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    updateDevice(); // initial
    window.addEventListener("resize", updateDevice);

    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  const getImage = () => {
    if (device === "mobile") {
      return "https://cdn.shopify.com/s/files/1/0705/7126/1994/files/Your_paragraph_text_1_b5e016e7-7bc1-4c12-beed-f036590ec1c5.png?v=1776944498";
    }

    // tablet + desktop use same
    return "https://cdn.shopify.com/s/files/1/0705/7126/1994/files/Your_paragraph_text.png?v=1776940849";
  };

  return (
    <div style={{ width: "100%", height: "100dvh", overflow: "hidden" }}>
      <img
        src={getImage()}
        alt="banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: device === "desktop" ? "contain" : "cover",
          display: "block",
          maxHeight:  device === "tablet" ? "80%" : "100%"
        }}
      />
    </div>
  );
}