"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { professionals } from "./professionals";
import ProfessionalCardDesktop from "./ProfessionalCardDesktop";
import ProfessionalCardMobile from "./ProfessionalCardMobile";

const Masterclass = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % professionals.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + professionals.length) % professionals.length
    );

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
    <div className="relative -translate-y-4 w-full min-h-screen flex items-center justify-center text-white z-[1] font-raleway">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-1 md:hidden" />
      <Image
        src="/images/masterclass/main-masterclass.png"
        alt="Masterclass principal"
        fill
        className="object-cover object-center blur-3xl md:blur-none absolute inset-0 z-[1]"
        priority
      />

      <div className="relative z-10 h-full md:h-screen w-full py-11 mt-8 md:py-0 md:mt-0 flex flex-col justify-center md:px-20 md:mb-10">
        <div className="h-full flex flex-col justify-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* Texto desktop - IZQUIERDA */}
          <div className="hidden md:flex flex-col gap-16 text-center md:text-left md:max-w-2xl md:order-1">
            <p className="border border-white rounded-full px-6 py-3 text-sm w-fit mx-auto md:mx-0">
              MASTERCLASS
            </p>
            <div className="flex flex-col md:gap-6">
              <p className="text-3xl md:text-[4rem] md:leading-none font-bold text-white leading-tight">
                El arte de escuchar los latidos
              </p>
              <p className="text-sm md:text-lg opacity-80">
                Aprende de la excelencia con esta masterclass a cargo del{" "}
                <br className="hidden md:block" />
                <strong>Dr. Ottenhof</strong>, nuestro referente mundial en
                Cardiología.
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
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
        <div className="md:hidden w-full flex flex-col items-center pl-6 gap-6 overflow-x-hidden z-[1]">
          <p className="text-1xl border border-white rounded-full px-6 py-3 self-start">
            MASTERCLASS
          </p>
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

//// INTEGRACION CON API - NO HAY FOTOS TODAVIA EN MASTERCLASS
{/* "use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import ProfessionalCardDesktop from "./ProfessionalCardDesktop";
import ProfessionalCardMobile from "./ProfessionalCardMobile";
import { Professional } from "@/modules/home/types";  // Importamos el tipo

const Masterclass = () => {
  const [current, setCurrent] = useState(0);
  const [professionals, setProfessionals] = useState<Professional[]>([]);  // Usamos el tipo aquí

  useEffect(() => {
    fetch("/api/home/masterclass")
      .then((res) => res.json())
      .then((data) => setProfessionals(data))
      .catch(console.error);
  }, []);

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

  if (professionals.length === 0) {
    return <div>Cargando...</div>; // Mostrar un mensaje mientras cargan los datos
  }

  return (
    <div className="relative -translate-y-4 w-full min-h-screen flex items-center justify-center text-white z-[1] font-raleway">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-1 md:hidden" />
      <Image
        src="/images/masterclass/main-masterclass.png"
        alt="Masterclass principal"
        fill
        className="object-cover object-center blur-3xl md:blur-none absolute inset-0 z-[1]"
        priority
      />

      <div className="relative z-10 h-full md:h-screen w-full py-11 mt-8 md:py-0 md:mt-0 flex flex-col justify-center md:px-20 md:mb-10">
        <div className="h-full flex flex-col justify-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* Texto desktop - IZQUIERDA *
          <div className="hidden md:flex flex-col gap-16 text-center md:text-left md:max-w-2xl md:order-1">
            <p className="border border-white rounded-full px-6 py-3 text-sm w-fit mx-auto md:mx-0">
              MASTERCLASS
            </p>
            <div className="flex flex-col md:gap-6">
              <p className="text-3xl md:text-[4rem] md:leading-none font-bold text-white leading-tight">
                El arte de escuchar los latidos
              </p>
              <p className="text-sm md:text-lg opacity-80">
                Aprende de la excelencia con esta masterclass a cargo del{" "}
                <br className="hidden md:block" />
                <strong>Dr. Ottenhof</strong>, nuestro referente mundial en
                Cardiología.
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Card desktop - DERECHA 
          <ProfessionalCardDesktop
            pro={professionals[current]}
            current={current}
            total={professionals.length}
            onNext={nextSlide}
            onPrev={prevSlide}
            className="md:order-2"
          />
        </div>

        {/* Carrusel Mobile 
        <div className="md:hidden w-full flex flex-col items-center pl-6 gap-6 overflow-x-hidden z-[1]">
          <p className="text-1xl border border-white rounded-full px-6 py-3 self-start">
            MASTERCLASS
          </p>
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

export default Masterclass; */}

