'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Search } from 'react-feather';
import HeroCarousel from './HeroCarousel';
import HeroHighlights from './HeroHighlights';
import Navbar from '../navbar/Navbar';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative h-[550px] w-full bg-black text-white px-4 overflow-hidden">
      {/* --- BACKGROUND CAROUSEL --- */}
      <HeroCarousel />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10">
        <Navbar />

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="md:px-36 container mx-auto md:h-[90%] flex flex-col justify-center items-center text-center gap-4 md:items-start md:text-left md:gap-2">
          <p className="border border-white rounded-full px-4 py-1 text-xs w-fit">Cursos</p>

          <div className="flex wrap w-full flex-col gap-6 md:gap-0 md:mt-0 mt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-3xl md:text-5xl text-white leading-tight">
                Cursos de medicina para <br/>
                <span className="italic font-normal"> expandir </span> tus metas profesionales
              </p>
            </div>

            <Link
              href="#"
              className="mt-4 md:mt-0 bg-white text-black px-6 py-3 rounded-full font-semibold text-xs md:text-base flex items-center gap-2 whitespace-nowrap"
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
