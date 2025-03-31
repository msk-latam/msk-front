'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

const slides = [
  '/images/hero/hero.png',
  '/images/hero/hero.png',
  '/images/hero/hero.png',
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      {slides.map((src, i) => (
        <div
          key={i}
          className={classNames(
            'absolute inset-0 transition-opacity duration-1000',
            {
              'opacity-100': i === currentSlide,
              'opacity-0': i !== currentSlide,
            }
          )}
        >
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            className={classNames(
              'w-2 h-2 rounded-full',
              i === currentSlide ? 'bg-white' : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
