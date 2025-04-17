"use client";

import React from "react";
import classNames from "classnames";

type HeroCarouselProps = {
  slides: string[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
};

const HeroCarousel = ({ slides, currentSlide, setCurrentSlide }: HeroCarouselProps) => {
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
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
