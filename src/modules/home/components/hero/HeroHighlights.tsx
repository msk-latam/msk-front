'use client';

import React, { useEffect, useRef, useState } from 'react';

const highlights = [
  'Cursos de medicina para expandir tus metas profesionales',
  'Medical & Scientific Knowledge, el lugar ideal para estudiar medicina a distancia',
  'Descubre los nuevos cursos médicos disponibles este mes',
  'Acceso exclusivo: Cursos médicos diseñados por expertos',
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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[1500px] px-4 md:px-10">
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row gap-3 md:gap-1 overflow-y-hidden md:overflow-x-auto justify-start md:justify-center items-center md:items-start scroll-smooth no-scrollbar"
      >
        {highlights.map((text, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-full md:w-[290px] h-auto md:h-[100px] px-4 py-[10px] flex items-start md:items-center justify-between text-left text-xs font-medium whitespace-pre-line rounded-xl backdrop-blur-md transition-all duration-300 shrink-0 ${
              active === i ? 'bg-white text-black shadow-md' : 'bg-white/20 text-white'
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
