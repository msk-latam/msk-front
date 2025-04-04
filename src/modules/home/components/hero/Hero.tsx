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
    <div className="relative h-[500px] md:h-[550px] w-full bg-black text-white px-4 overflow-hidden">
      {/* --- BACKGROUND CAROUSEL --- */}
      <HeroCarousel />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10">
        <Navbar />

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="md:px-28 px-5 py-2 md:py-12 container mx-auto md:h-[70%] flex flex-col justify-center items-center md:justify-end text-center gap-0 md:items-start md:text-left md:gap-2">
          <p className="border border-white rounded-full px-[18px] py-2 my-4 md:my-0 text-[12px] w-fit">Cursos</p>

          <div className="flex wrap w-fit md:w-full flex-col gap-4 md:gap-0 md:mt-0 md:flex-row md:justify-between">
            <div>
              <p className="text-[2rem] md:text-5xl text-white leading-none md:leading-tight md:min-w-full">
                Cursos de medicina para<span className="italic font-normal"> <span className="hidden md:inline"><br />
                </span> expandir </span>tus metas profesionales
              </p>
            </div>

            <Link
              href="#"
              className="mt-4 md:mb-0 mx-6 md:mx-0 md:mt-0 w-full md:w-auto bg-white text-black px-6 py-3 rounded-full font-semibold text-sm md:text-base flex items-center self-center gap-2 whitespace-nowrap"
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
