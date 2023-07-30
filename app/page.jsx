"use client";
import Image from "next/image";
import omg from "@/public/img/omg.png";
import nya from "@/public/img/nekolove.png";

import { useState } from "react";

const Page = () => {
  const images = [omg, nya];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="relative">
        <div>
          <Image
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            width={250}
            height={250}
            className="mx-auto"
          />
        </div>
        <button
          onClick={goToPreviousImage}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 text-3xl md:text-4xl text-white`}
        >
          &#8249;
        </button>
        <button
          onClick={goToNextImage}
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl md:text-4xl text-white`}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Page;
