"use client";
import React from "react";
import Image from "next/image";

const Ofertas = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white font-raleway">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/oferta/oferta.png"
          alt="Oferta Salud"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full md:px-36 px-5 pt-24 flex flex-col md:flex-row items-center md:items-end md:justify-between justify-end gap-6">
        {/* Texto */}
        <div className="text-left text-white max-w-xl">
          <p className="text-sm md:text-base mb-4">
            Disponible del 15 al 31 de enero
          </p>
          <h2 className="text-[28px] md:text-[59px] font-bold leading-snug w-full md:whitespace-nowrap">
            ¿Sos profesional de la salud? <br className="hidden md:block" />
            <span className="font-light md:text-[55px]">
              Llevá tu carrera al siguiente nivel.
            </span>
          </h2>

          <ul className="text-base md:text-2xl mt-6 space-y-3 leading-relaxed">
            <li>
              • Accedé a cursos diseñados por expertos para potenciar tus
              habilidades.
            </li>
            <li>
              • Certificación incluida: Sumá valor a tu currículum y ganá
              confianza en cada paso.
            </li>
          </ul>
        </div>

<div className="flex md:flex-row flex-col md:gap-[27px] md:translate-y-10 w-full gap-6 md:w-auto items-center">
        {/* Bloque de descuento + botón */}
        <div className="w-auto flex flex-col md:flex-row md:items-center md:justify-end gap-6">
  {/* Descuento */}
  <div className="text-white">
  <div className="flex items-center">
    {/* Left side with +20% */}
    <div className="flex items-baseline">
      <span className="text-5xl font-bold my-auto">+</span>
      <span className="text-5xl font-bold my-auto">20</span>
      <div className="flex flex-col ml-1 my-auto">
        <span className="text-3xl font-thin leading-none">%</span>
        <span className="text-xs font-medium">OFF</span>
      </div>
    </div>
    
    {/* Right side with text */}
    <div className="flex flex-col ml-2 my-auto">
      <span className="text-lg font-bold">en tu</span>
      <span className="text-lg font-bold">inscripción</span>
    </div>
  </div>
</div>
</div>

        {/* Botón */}
        <button className="bg-black/80 text-white px-6 py-2 rounded-full md:rounded-[38px] font-semibold shadow-md hover:bg-black/60 transition text-sm md:text-base w-full md:w-auto">
          Reservá tu cupo ahora →
        </button>
      </div>
      </div>
    </section>
  );
};

export default Ofertas;
