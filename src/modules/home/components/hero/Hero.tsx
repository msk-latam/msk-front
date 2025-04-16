"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search } from "react-feather";
import HeroCarousel from "./HeroCarousel";
import HeroHighlights from "./HeroHighlights";
import Navbar from "../../../components/navbar/Navbar";
import Image from "next/image";
import { useHomeContent } from "@/modules/home/hooks/useHomeContent";
import { HeroSlide } from "@/modules/home/types";
import PopUp from "../../../components/PopUp";



const Hero = () => {
  const { data } = useHomeContent();
  const slides: HeroSlide[] = data?.slides || [];



  return (
  
      
    <div className="relative md:h-[800px] h-[600px] w-full bg-black text-white px-4 overflow-hidden pt-[150px] ">

      {/* --- BACKGROUND CAROUSEL --- */}
      <HeroCarousel slides={slides.map((s) => s.background_image[0])} />
        



      {/* Overlay content */}
      <div className="absolute inset-0 z-10">
        

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="md:px-28 px-5 py-3 md:mt-40 md:py-0 container mx-auto md:h-[71%] flex flex-col justify-center items-center md:justify-end text-center gap-0 md:items-start md:text-left md:gap-2">
        <p className="mt-20 md:mt-0 border border-white rounded-full px-[18px] py-2 my-4 md:my-0 text-[14px] w-fit">
  {slides[0]?.tag || "Cursos"}
</p>


          <div className="flex wrap w-fit md:w-full flex-col gap-4 md:gap-0 md:mt-2 md:flex-row mt-10 md:justify-between">
            
            <div>
            <h1 className="text-[2rem] md:text-5xl text-white leading-tight md:leading-tight md:min-w-full font-bold">
  {/* MOBILE VIEW TEXT (custom layout) */}
  <span className="block md:hidden leading-tight ">
    Curso de medicina<br />
    para{" "}
    <span className="italic font-[Lora,serif]  text-[40px] tracking-[0%]">
      expandir
    </span>{" "}
    tus<br />
    metas profesionales
  </span>

  {/* DESKTOP VIEW TEXT (dynamic content from slide) */}
  <span className="hidden md:inline">
    {slides[0]?.title?.split("<em>")[0] || "Cursos de medicina para"}
    <span className="italic font-[Lora,serif] font-normal tracking-[0%] md:leading-[74px] text-[64px]">
      <br />
      {slides[0]?.title?.match(/<em>(.*?)<\/em>/)?.[1] || "expandir"}
    </span>{" "}
    {slides[0]?.title?.split("</em>")[1]?.trim() || "tus metas profesionales"}
  </span>
</h1>


            </div>
            <Link
              //href={slides[0]?.cta?.url || "https://msklatam.com/tienda/?recurso=curso"} //Cambiarlo luego de crear la nueva tienda
              href={"https://msklatam.com/tienda/?recurso=curso"}
              className="mt-4 md:mt-20 md:mb-0 mx-6 md:mx-0 md:mt-0 w-full md:w-auto bg-white text-black px-5 py-3 rounded-full text-[14px] hover:scale-105 transition flex justify-center text-center self-center gap-2 whitespace-nowrap"

            >
              {slides[0]?.cta?.title || "Comenzá tu experiencia"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-[4px] md:mt-[0.5px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7-7 7M3 12h18"
                />
              </svg>
            </Link>
          </div>

          <HeroHighlights  />
        </div>
      </div>
    </div>
    
  );
};

export default Hero;
