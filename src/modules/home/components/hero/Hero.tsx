'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Search } from 'react-feather';
import HeroCarousel from './HeroCarousel';
import HeroHighlights from './HeroHighlights';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative h-[800px] w-full bg-black text-white px-4 overflow-hidden">
      {/* --- BACKGROUND CAROUSEL --- */}
      <HeroCarousel />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10">
        {/* --- NAV MOBILE ---  Arreglar ubicacion*/}
        <div className="flex justify-between items-center pt-6 md:hidden">
        <Menu className="text-white w-7 h-7" />
        <Image src="/images/msk-logo/logo.png" alt="MSK" height={70} width={70} priority />
          
        </div>

        {/* --- NAV DESKTOP --- */}
        <div className="hidden md:flex justify-center pt-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="">
            <Image src="/images/msk-logo/logo.png" alt="MSK" height={70} width={70} priority />
            </div>

            {/* Navegación */}
            <nav className="flex items-center gap-6 bg-white shadow-lg rounded-full px-6 py-2">
              <button className="text-gray-700 hover:text-gray-900 flex items-center gap-1">
                Descubre
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-gray-900">Instituciones</button>

              {/* Search */}
              <div className="relative flex items-center bg-gray-100 rounded-full px-4">
                <input
                  type="text"
                  placeholder="¿Qué tema te interesa?"
                  className="bg-transparent focus:outline-none border-none w-48 text-gray-700 placeholder-gray-500"
                />
                <div className="bg-[#9200AD] p-2 rounded-full flex items-center justify-center ml-2">
                  <Search className="text-white w-5 h-5" />
                </div>
              </div>

              {/* CTA */}
              <button className="text-[#9200AD] border border-[#9200AD] rounded-3xl px-4 py-2">
                Crear cuenta
              </button>
              <button className="text-gray-700 border border-[#DBDDE2] rounded-3xl px-4 py-2">
                Iniciar sesión
              </button>
            </nav>
          </div>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center gap-4 md:items-start md:text-left md:gap-6">
          <p className="border border-white rounded-full px-4 py-1 text-sm w-fit">Cursos</p>

          <div className="flex flex-col gap-6 mt-10 md:flex-row md:items-end md:justify-between md:gap-32">
            <div>
              <p className="text-3xl md:text-6xl font-bold text-white leading-tight">
                Cursos de medicina para
              </p>
              <p className="text-3xl md:text-6xl font-bold text-white leading-tight">
                <span className="italic font-normal">expandir </span> tus metas profesionales
              </p>
            </div>

            <Link
              href="#"
              className="mt-4 md:mt-0 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm md:text-base flex items-center gap-2 whitespace-nowrap"
            >
              Comenzá tu experiencia
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

          <HeroHighlights />
        </div>
      </div>
    </div>
  );
};

export default Hero;
