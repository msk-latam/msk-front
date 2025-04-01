'use client';

import React from 'react';
import CursoCard from './cards/CursoCard';
import { cursosMock } from './cards/data';

const Oportunidades = () => {
  return (
    <div className="relative w-full bg-gray-100 pt-24 pb-60 z-[5]"> {/* Aumentado pb para fondo inferior */}
      <section className="relative bg-white rounded-[40px] max-w-7xl mx-auto -mt-32 -mb-64 z-[5] py-10 shadow-lg">



        <div className="px-5 md:px-10">
          {/* Título y descripción */}
          <div className="text-left mb-8 max-w-4xl">
            <h2 className="text-xl md:text-2xl font-medium mb-2">
              Te damos la bienvenida a Medical & Scientific Knowledge, el lugar ideal para estudiar medicina a distancia a través de nuestros cursos de actualización.
            </h2>
            <p className="text-sm text-neutral-600">
              Encontrá cursos de medicina y de enfermería sobre más de 20 especialidades
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 justify-center md:justify-start mb-8 flex-wrap">
            {['Novedades', 'Recomendados', 'Gratuitos'].map((tab) => (
              <button
                key={tab}
                className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid de cards */}
          <div className="hidden md:grid grid-cols-3 grid-rows-[260px_260px] gap-6">
            <CursoCard {...cursosMock[0]} variant="large" largeWidth="col-span-1" />
            <CursoCard {...cursosMock[1]} />
            <CursoCard {...cursosMock[2]} />
            <CursoCard {...cursosMock[3]} />
            <CursoCard {...cursosMock[4]} variant="large" largeWidth="col-span-2" />
          </div>

          {/* Grid mobile */}
          <div className="grid gap-6 md:hidden">
            {cursosMock.map((curso) => (
              <CursoCard key={curso.id} {...curso} />
            ))}
          </div>

          {/* Ver más (solo en mobile) */}
          <div className="mt-10 flex justify-center md:hidden">
            <button className="px-6 py-2 bg-black text-white rounded-full font-medium">
              Ver todos →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oportunidades;
