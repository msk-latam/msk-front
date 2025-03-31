'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { professionals } from './professionals';
import ProfessionalCardDesktop from './ProfessionalCardDesktop';
import ProfessionalCardMobile from './ProfessionalCardMobile';

const Masterclass = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % professionals.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + professionals.length) % professionals.length);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-auto md:h-[800px] w-full bg-black text-white overflow-hidden z-[0] -mt-30">


      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 md:hidden" />
      <Image
  src="/images/masterclass/main-masterclass.png"
  alt="Masterclass principal"
  fill
  className="object-cover object-center absolute inset-0 -z-10"
  priority
/>

      <div className="relative z-10 h-full w-full px-4 md:px-20 py-10 flex flex-col justify-center">
        <div className="container mx-auto h-full flex flex-col justify-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* Texto desktop - IZQUIERDA */}
          <div className="hidden md:flex flex-col gap-6 text-center md:text-left md:max-w-xl md:order-1">
            <p className="border border-white rounded-full px-4 py-1 text-sm w-fit mx-auto md:mx-0">MASTERCLASS</p>
            <div>
              <p className="text-3xl md:text-6xl font-bold text-white leading-tight">El arte de escuchar</p>
              <p className="text-3xl md:text-6xl font-bold text-white leading-tight">
                <span className="italic font-normal">los latidos</span>
              </p>
              <p className="text-sm md:text-base opacity-80 mt-6">
                Aprende de la excelencia con esta masterclass a cargo del <br className="hidden md:block" />
                <strong>Dr. Ottenhof</strong>, nuestro referente mundial en Cardiología.
              </p>
            </div>
            <Link
              href="#"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm md:text-base flex items-center gap-2 w-fit mx-auto md:mx-0"
            >
              Inscribite ahora
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Card desktop - DERECHA */}
          <ProfessionalCardDesktop
            pro={professionals[current]}
            current={current}
            total={professionals.length}
            onNext={nextSlide}
            onPrev={prevSlide}
            className="md:order-2"
          />
        </div>

        {/* Carrusel Mobile */}
        <div className="md:hidden w-full flex flex-col items-center mt-10 px-4 gap-4 overflow-x-hidden">
          <p className="text-1xl border border-white rounded-full px-4 py-1">MASTERCLASS</p>
          <div className="relative w-full overflow-hidden">
            <div
              {...handlers}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 340}px)` }}
            >
              {professionals.map((pro, i) => (
                <ProfessionalCardMobile key={i} pro={pro} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Masterclass;
