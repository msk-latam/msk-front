"use client";

import React, { useEffect, useRef, useState } from "react";

const highlights = [
  "Cursos de medicina para expandir tus metas profesionales",
  "Medical & Scientific Knowledge, el lugar ideal para estudiar medicina a distancia",
  "Descubre los nuevos cursos médicos disponibles este mes",
  "Acceso exclusivo: Cursos médicos diseñados por expertos",
];

const HeroHighlight = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const ANIMATION_DURATION = 4000;
  const PAUSE_AFTER_INTERACTION = 8000;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollTo = container.children[active] as HTMLElement;
      container.scrollTo({ left: scrollTo.offsetLeft, behavior: "smooth" });
    }
  }, [active]);

  const handleManualChange = (i: number) => {
    setActive(i);
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);

    pauseTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_INTERACTION);
  };

  return (
    <div className="md:relative md:-bottom-8 md:pb-0 absolute bottom-0 w-full h-40 md:h-auto portrait:-z-10 overflow-scroll md:overflow-hidden scrollbar-track-transparent">
      <div
        ref={containerRef}
        className="rounded-t-xl w-fit md:max-w-full flex flex-col md:flex-row md:gap-[2px] overflow-y-hidden overflow-x-hidden justify-start items-center scroll-smooth gap-0 md:no-scrollbar"
      >
        {highlights.map((text, i) => (
          <button
            key={i}
            onClick={() => handleManualChange(i)}
            className={`relative overflow-hidden w-full md:w-1/4 min-h-10 md:h-[70px] p-4 md:py-[10px] flex items-start md:items-center justify-between text-left text-m md:text-xs md:whitespace-pre-line transition-all duration-300 shrink-0 ${
              active === i
                ? "bg-white text-black shadow-md"
                : "md:bg-black/10 md:text-white bg-white text-gray-500"
            }`}
          >
            {/* Fondo animado como loader horizontal */}
            {active === i && (
              <span className="absolute inset-0 bg-gray-500 opacity-30 z-0 animate-fill-x" />
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
          animation: fill-x 4s linear forwards;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  );
};

export default HeroHighlight;
