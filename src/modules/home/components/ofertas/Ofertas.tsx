'use client';
import React from 'react';
import Image from 'next/image';

const Ofertas = () => {
  return (
    <section className="relative w-full min-h-[800px] md:min-h-screen flex items-center justify-center text-white z-[1] font-raleway">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-1 min-h-[800px]">
        <Image
          src="/images/oferta/oferta.png"
          alt="Oferta Salud"
          layout="fill"
          objectFit="cover"
          objectPosition="70%" // Rostro visible en mobile
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-[2] px-6 py-10 max-w-7xl w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* Texto (compartido) */}
        <div className="text-left max-w-xl">
          <p className="text-base md:text-lg mb-4">Disponible del 15 al 31 de enero</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            ¿Sos profesional de la salud?
          </h2>
          <p className="text-2xl sm:text-3xl font-light mt-2">Llevá tu carrera al siguiente nivel.</p>
          <ul className="text-lg mt-6 space-y-3">
            <li>• Accedé a cursos diseñados por expertos para potenciar tus habilidades.</li>
            <li>• Certificación incluida: Sumá valor a tu currículum y ganá confianza en cada paso.</li>
          </ul>

          {/* 🔹 Mobile: bloque separado con posicionamiento */}
          <div className="md:hidden relative -top-30 mt-10 flex flex-col gap-4 translate-y-[60px]">
            <div className="text-3xl font-bold">
              +20<span className="text-base align-top">%</span> OFF
            </div>
            <span className="text-sm font-medium">en tu inscripción</span>
            <button className="mt-2 bg-black text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition text-base w-full">
              Reservá tu cupo ahora →
            </button>
          </div>
        </div>

        {/* 🔹 Desktop: bloque independiente */}
        <div className="hidden md:flex flex-col items-end gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl md:text-5xl font-bold whitespace-nowrap">
              +20<span className="text-base align-top">%</span> OFF
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition text-base">
              Reservá tu cupo ahora →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
