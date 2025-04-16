"use client";
import React from "react";
import Image from "next/image";

import { useOffers } from "@/modules/home/hooks/useOffer";

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, '').trim();
};

const Ofertas = () => {
  const { data: offer, loading, error } = useOffers();

  if (loading) return <div className="text-center">Cargando oferta...</div>;
  if (error || !offer) return null;

  const discountNumber = stripHtml(offer.pre_cta_content?.match(/\d+/)?.[0] || "20");
  const discountDescription = stripHtml(
    offer.pre_cta_content?.replace(/<[^>]+>/g, '').replace(/\d+%?\s*/g, '') || "en tu suscripción"
  );

  const [descLine1, descLine2] = discountDescription.split(/\s+/).length >= 2
    ? [discountDescription.split(/\s+/).slice(0, 2).join(' '), discountDescription.split(/\s+/).slice(2).join(' ')]
    : [discountDescription, ''];

  return (
    <section className="relative w-full md:h-[993px] min-h-screen flex items-end md:items-center justify-center text-white font-raleway">
      {/* Imagen de fondo para mobile */}
      <div className="absolute inset-0 z-0 block lg:hidden">
        <Image
          src={offer.background_image?.[0]}
          alt="Oferta Salud Mobile"
          layout="fill"
          objectFit="cover"
          objectPosition="55% center"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Imagen de fondo para pantallas grandes */}
      <div className="absolute inset-0 z-0 hidden lg:block">
  <div className="w-full h-full filter">
    <Image
      src={offer.background_image?.[0]}
      alt="Oferta Salud Desktop"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      quality={100}
      priority
    />
  </div>
  <div className="absolute inset-0 bg-black/40" />
</div>


      {/* Contenido */}
      <div className="relative z-5 w-full overflow-visible max-w-[1400px] mx-auto px-5 py-16 flex flex-col md:flex-row items-center md:items-end md:justify-between justify-end gap-5">
        {/* Texto */}
        <div className="text-left text-white max-w-xl font-raleway">
          <p className="text-sm md:text-base mb-4 font-inter">
            {stripHtml(offer.pre_text)}
          </p>
          <h2 className="text-[24px] md:text-5xl font-bold leading-none w-full md:whitespace-nowrap font-raleway">
            {stripHtml(offer.title?.split(' ').slice(0, 4).join(' '))}
            <br className="hidden md:block" />
            <span className="font-extralight md:text-[45px] font-raleway">
              {stripHtml(offer.title?.split(' ').slice(4).join(' '))}
            </span>
          </h2>

          {/* Contenido dinámico con clases propias */}
          <ul className="text-base font-medium md:text-2xl mt-6 space-y-2 leading-snug font-raleway list-disc list-outside ml-4">
            {stripHtml(offer.content || "")
              .split(/\n|\r|\r\n/)
              .filter(line => line.trim() !== '')
              .map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
          </ul>
        </div>

        {/* Discount and Button Section - Flow on Mobile, Absolute on Desktop */}
        <div className="flex flex-col items-center md:items-end md:absolute md:bottom-12 md:right-12 md:flex-row gap-4 mt-6 md:mt-0">
          {/* Discount - Centered Text on Mobile */}
          <div className="flex items-end gap-2 text-center md:text-right">
            <span className="text-6xl md:text-[78.49px] font-inter font-bold leading-none md:leading-[100%] tracking-tighter md:tracking-[-13%]">
              +{discountNumber}
            </span>
            <div className="flex flex-col items-center md:items-start gap-1 md:gap-2">
              <span className="font-inter font-extralight text-4xl md:text-[47.42px] leading-none md:leading-[100%]">%</span>
              <span className="text-sm md:text-[19.62px] font-inter font-light leading-none md:leading-[100%] tracking-[-2.5%] whitespace-pre-line">
                OFF
              </span>
            </div>
            {(descLine1 || descLine2) && (
              <span className="text-xl md:text-[26.16px] font-inter font-extrabold leading-tight md:leading-[90%] tracking-[-2.5%] opacity-90 whitespace-pre-line text-center md:text-start">
                 <span >en tu</span> <br />
                 <span >inscripción</span>
                 
              </span>
            )}
          </div>

          {/* Botón */}
          <a
            href={offer.cta?.url || "#"}
            className="bg-[#1A1A1A] text-white px-6 md:mt-4 py-3 rounded-full md:rounded-[38px] font-inter font-medium shadow-md hover:bg-gray-800 transition text-sm w-full md:w-auto flex flex-row gap-2 justify-center items-center"
          >
            <p className="my-auto">{offer.cta?.title || "Reservá tu cupo ahora"}</p>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.21582 12H19.2158M19.2158 12L12.2158 5M19.2158 12L12.2158 19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
