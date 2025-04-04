'use client';

import React, { useEffect, useRef, useState } from 'react';

const highlights = [
  'Cursos de medicina para expandir tus metas profesionales',
  'Medical & Scientific Knowledge, el lugar ideal para estudiar medicina a distancia',
  'Descubre los nuevos cursos médicos disponibles este mes',
  'Acceso exclusivo: Cursos médicos diseñados por expertos'
];

const HeroHighlight = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollTo = container.children[active] as HTMLElement;
      container.scrollTo({ left: scrollTo.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <div className="absolute bottom-0 md:bottom-8 w-fit h-40 md:h-auto max-w-[1500px] md:w-fit portrait:-z-10 overflow-scroll md:overflow-hidden scrollbar-track-transparent">
      <div
        ref={containerRef}
        className="rounded-t-xl w-auto md:w-full flex flex-col md:flex-row md:gap-[2px] overflow-y-hidden overflow-x-hidden justify-start items-center scroll-smooth gap-0 md:no-scrollbar"
      >
        {highlights.map((text, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-full md:w-[22%] min-h-10 md:h-[70px] p-4 md:py-[10px] flex items-start md:items-center justify-between text-left text-m md:text-xs md:whitespace-pre-line border-white md:backdrop-blur-sm transition-all duration-300 shrink-0 ${
              active === i ? 'bg-white text-black shadow-md' : 'md:bg-black/10 md:text-white bg-white text-gray-500'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroHighlight;
