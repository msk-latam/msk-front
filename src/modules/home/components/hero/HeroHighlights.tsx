"use client";

import React, { useEffect, useRef } from "react";

type HeroHighlightsProps = {
  currentSlide: number;
  highlights: string[];
  onSelect: (index: number) => void;
  animationKey: number;
  paused: boolean;
};

const HeroHighlights = ({ currentSlide, highlights, onSelect, animationKey, paused }: HeroHighlightsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const totalItems = highlights.length;
      const itemHeight = 80; // px (ajustar según tu botón)
      const offset = currentSlide * itemHeight;

      // Si estamos en el final de la lista, reseteamos
      if (currentSlide >= totalItems) {
        // Reinicia suave
        scrollRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    }
  }, [currentSlide, highlights.length]);

  // Renderizamos la lista duplicada para un loop infinito
  const doubledHighlights = [...highlights];

  return (
    <div className="md:relative rounded-t-2xl md:-bottom-[40px] md:pb-0 md:px-6 absolute bottom-0 w-full h-40 md:h-auto z-10 overflow-hidden">
      
      {/* MOBILE vertical scroll */}
      <div ref={scrollRef} className="md:hidden overflow-y-scroll max-h-[160px] h-[160px] scroll-smooth">
        <div className="flex flex-col">
          {doubledHighlights.map((text, i) => (
            <button
              key={`mobile-${animationKey}-${i}`}
              onClick={() => onSelect(i % highlights.length)}
              className={`relative overflow-hidden w-full min-h-10 h-20 p-4 flex items-start justify-between text-left text-m transition-all duration-300 shrink-0 ${
                (i % highlights.length) === currentSlide ? "bg-white text-black shadow-md" : "bg-[#F4F4F4] text-gray-500"
              }`}
            >
              {(i % highlights.length) === currentSlide && (
                <span
                  key={`bar-${animationKey}`}
                  className="absolute inset-0 bg-gray-500 opacity-30 z-0 animate-fill-x"
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                />
              )}
              <span className="relative z-10">{text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP horizontal */}
      <div className="hidden md:flex rounded-t-xl w-fit md:max-w-full flex-row md:gap-[2px] overflow-x-hidden justify-start items-center gap-0 md:no-scrollbar">
        {highlights.map((text, i) => (
          <button
            key={`desktop-${animationKey}-${i}`}
            onClick={() => onSelect(i)}
            className={`relative overflow-hidden w-full md:w-1/4 md:h-[70px] p-4 md:py-[10px] flex items-center justify-between text-left text-xs whitespace-pre-line transition-all duration-300 shrink-0 md:bg-black/10 md:text-white ${
              i === currentSlide ? "bg-white text-black shadow-md" : ""
            }`}
          >
            {i === currentSlide && (
              <span
                key={`bar-desktop-${animationKey}`}
                className="absolute inset-0 bg-white opacity-10 z-0 animate-fill-x"
                style={{ animationPlayState: paused ? 'paused' : 'running' }}
              />
            )}
            <span className="relative z-10">{text}</span>
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fill-x {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
        .animate-fill-x {
          animation: fill-x 8s linear forwards;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  );
};

export default HeroHighlights;
