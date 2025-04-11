"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import ProfessionalCardDesktop from "./ProfessionalCardDesktop";
import ProfessionalCardMobile from "./ProfessionalCardMobile";
import { useMasterclassSection } from "@/modules/home/hooks/useMasterclassSection";
import { professionals as mockProfessionals } from "./professionals";

const Masterclass = () => {
  const { data: fetchedProfessionals, loading, error } = useMasterclassSection();
  const usingMock = !fetchedProfessionals?.length;
  const professionals = usingMock ? mockProfessionals : fetchedProfessionals;

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
  }, [professionals]);

  useEffect(() => {
    if (usingMock) {
      console.warn("⚠️ Usando contenido mock de profesionales (no hay datos desde la API).");
    }
  }, [usingMock]);

  return (
    <section
      aria-labelledby="masterclass-heading"
      className="relative -translate-y-4 w-full min-h-screen flex items-center justify-center text-white z-5 font-raleway"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[1] md:hidden" />
      <Image
        src="/images/masterclass/main-masterclass.png"
        alt="Fondo sección Masterclass"
        fill
        className="object-cover object-center blur-3xl md:blur-none absolute inset-0 z-[1]"
        priority
      />

      <main className="relative z-10 h-full md:h-screen w-full py-11 mt-8 md:py-0 md:mt-0 flex flex-col justify-center md:px-20 md:mb-10">
        <div className="h-full flex flex-col justify-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* IZQUIERDA TEXTO */}
          <header className="hidden md:flex flex-col gap-16 text-center md:text-left md:max-w-2xl md:order-1">
            <p className="border border-white rounded-full px-6 py-3 text-sm w-fit mx-auto md:mx-0 uppercase tracking-widest">
              Masterclass
            </p>
            <div className="flex flex-col md:gap-6">
              <h1 id="masterclass-heading" className="text-3xl md:text-[4rem] font-bold leading-tight text-white">
                El arte de escuchar los latidos
              </h1>
              <p className="text-sm md:text-lg opacity-80">
                Aprende de la excelencia con esta masterclass a cargo del <br className="hidden md:block" />
                <strong>Dr. Ottenhof</strong>, nuestro referente mundial en Cardiología.
              </p>
            </div>
            <nav aria-label="Inscripción a Masterclass">
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
            </nav>
          </header>

          {/* DERECHA CARD DESKTOP */}
          <article className="md:order-2">
            <ProfessionalCardDesktop
              pro={professionals[current]}
              current={current}
              total={professionals.length}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
          </article>
        </div>

        {/* MOBILE */}
        <section className="md:hidden w-full flex flex-col items-center pl-6 gap-6 overflow-x-hidden z-[1]">
          <h2 className="text-1xl border border-white rounded-full px-6 py-3 self-start uppercase tracking-widest">
            Masterclass
          </h2>
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
        </section>
      </main>
    </section>
  );
};

export default Masterclass;
