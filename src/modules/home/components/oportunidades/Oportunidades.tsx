"use client";

import React from "react";
import CursoCard from "./cards/CursoCard";
import { cursosMock } from "./cards/data";

const Oportunidades = () => {
  return (
    <div className="relative w-full md:px-20 bg-gray-100 md:pt-24 pb-60 z-[5] translate-y-32 md:translate-y-0">
      {/* Aumentado pb para fondo inferior */}
      <section className="relative bg-white rounded-[38px] -mt-32 -mb-64 z-[5] pt-6 md:pt-[72px] md:pb-16 shadow-lg">
        <div className="px-5 md:px-16 pb-6 md:mb-0">
          {/* Título y descripción */}
          <div className=" md:text-left text-center max-w-4xl px-6 gap-4 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2">
              Te damos la bienvenida a Medical & Scientific Knowledge, el lugar
              ideal para estudiar medicina a distancia a través de nuestros
              cursos de actualización.
            </h2>
            <p className="text-sm text-neutral-600">
              Encontrá cursos de medicina y de enfermería sobre más de 20
              especialidades
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex md:gap-4 gap-5 overflow-x-auto scrollbar-hide md:justify-start my-6 whitespace-nowrap"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {["Novedades", "Recomendados", "Gratuitos"].map((tab, index) => (
              <button
                key={tab}
                className={`md:px-4 md:py-2 px-5 py-3 rounded-full md:text-sm text-base font-medium transition flex-shrink-0 ${
                  index === 0
                    ? "text-black border border-gray-300"
                    : "text-gray-500 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid de cards */}

          <div className="hidden md:w-full md:grid gap-5 auto-rows-[399px]" style={{ gridTemplateColumns: "1fr 1fr 84px 1fr 1fr" }}>
  {/* Primera fila */}
  <div className="col-span-3">
    <CursoCard
      {...cursosMock[0]}
      variant="large"
      className="h-full"
    />
  </div>
  <div>
    <CursoCard {...cursosMock[1]} className="h-full" />
  </div>
  <div>
    <CursoCard {...cursosMock[2]} className="h-full" />
  </div>

  {/* Segunda fila */}
  <div>
    <CursoCard {...cursosMock[3]} className="h-full" />
  </div>
  <div>
    <CursoCard {...cursosMock[4]} className="h-full" />
  </div>
  <div className="col-span-3">
    <CursoCard
      {...cursosMock[5]}
      variant="large"
      className="h-full"
    />
  </div>
</div>

          {/* Grid mobile */}
          <div className="grid gap-6 md:hidden">
            {cursosMock.map((curso) => (
              <CursoCard key={curso.id} {...curso} />
            ))}
          </div>

          {/* Ver más (solo en mobile) */}
          <div className="mt-6 flex justify-center md:hidden">
            <button className="px-6 py-2 w-full md:w-auto bg-black text-white rounded-full font-medium">
              Ver todos →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oportunidades;
