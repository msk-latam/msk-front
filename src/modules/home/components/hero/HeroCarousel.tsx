"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useHomeContent } from "@/modules/home/hooks/useHomeContent";

type HeroCarouselProps = {
  slides: string[];
};

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      {slides.map((src, i) => (
        <div
          key={i}
          className={classNames(
            "absolute inset-0 transition-opacity duration-1000",
            {
              "opacity-100": i === currentSlide,
              "opacity-0": i !== currentSlide,
            }
          )}
        >
          <img
            src={src}
            alt={`Slide ${i + 1}`}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;