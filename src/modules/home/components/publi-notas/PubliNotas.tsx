'use client';

import React from 'react';
import useMentions from '@/modules/home/hooks/useMentions';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const MskNewsSection = () => {
  const { data: mentions, loading, error } = useMentions();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        disabled: true,
      },
    },
  });

  const cleanContent = (html: string) => {
    return html.replace(/facebook sharing button|twitter sharing button|email sharing button|whatsapp sharing button|<br\s*\/?>/gi, '').trim();
  };

  if (loading) {
    return <div className="text-center py-10">Cargando menciones...</div>;
  }

  if (error || mentions.length === 0) {
    return <div className="text-center py-10">No se pudieron cargar las menciones.</div>;
  }

  return (
    <section className="w-full bg-gray-100 py-10 z-[1] font-raleway md:px-4">
      <div className="relative bg-white rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-4 pl-6 py-6 md:p-10 shadow-lg z-[1]">
        <h2 className="text-xl md:text-2xl font-semibold mb-8">¿Qué dicen de MSK?</h2>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-3 gap-6 ">
          {mentions.map((item, index) => (
            <a
              key={index}
              href={item.link.url}
              target={item.link.target}
              rel="noopener noreferrer"
              className="bg-[#F7F9FF] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="text-[32px] font-[700] leading-[140%] tracking-[0%] mb-4 font-raleway">{item.title}</h3>
                <p className="text-sm font-inter font-normal text-neutral-600">{cleanContent(item.content)}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 font-inter">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white border">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(item.link.url).hostname}&sz=64`}
                      alt="favicon"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span>{new Date(item.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <button className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full md:rounded-[38px] font-inter font-medium shadow-md hover:scale-105 transition text-sm w-full md:w-auto">{item.link.title}</button>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile carousel */}
        <div ref={sliderRef} className="md:hidden keen-slider">
          {mentions.map((item, index) => (
            <a
              key={index}
              href={item.link.url}
              target={item.link.target}
              rel="noopener noreferrer"
              className="keen-slider__slide min-w-[85%]"
            >
              <div className="bg-white rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between mr-2 mb-[40px] hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-[24px] font-[700] leading-[140%] tracking-[0%] mb-4 font-raleway">{item.title}</h3>
                  <p className="text-sm font-inter font-normal text-neutral-600 ">{cleanContent(item.content)}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 font-inter">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white border translate-y-[-30px]">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${new URL(item.link.url).hostname}&sz=64`}
                        alt="favicon"
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className='translate-y-[-30px]'>{new Date(item.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <button className="px-6 py-4 rounded-[38px] text-[16px] font-medium shadow-md bg-[#1A1A1A] text-white translate-y-[18px]">{item.link.title}</button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MskNewsSection;
