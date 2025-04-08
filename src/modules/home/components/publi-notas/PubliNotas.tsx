'use client';

import React from 'react';
import { mskNews } from '@/modules/home/components/publi-notas/data/mskNews';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const MskNewsSection = () => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        disabled: true, // desactiva carrusel en desktop
      },
    },
  });

  return (
    <section className="w-full bg-gray-100 py-10 z-[1]">
      <div className="relative bg-white rounded-[40px] md:mx-20 p-6 md:p-10 shadow-lg z-[1]">
        <h2 className="text-xl md:text-2xl font-semibold mb-8">¿Qué dicen de MSK?</h2>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {mskNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div ref={sliderRef} className="md:hidden keen-slider">
          {mskNews.map((item) => (
            <div key={item.id} className="keen-slider__slide min-w-[85%]">
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between mr-2">
                <div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MskNewsSection;
