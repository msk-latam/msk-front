"use client";
import React from "react";
import Image from "next/image";

import { useOffers } from "@/modules/home/hooks/useOffer";

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, '').trim();
};

const DiscountAndButton = ({ offer, discountNumber, descLine1, descLine2 }: any) => (
  <div className="flex flex-col md:items-end md:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto md:text-right">
    <div className="flex items-end gap-2 text-left md:text-right w-full md:w-auto">
      <span className="text-6xl md:text-[78.49px] font-inter font-bold leading-none md:leading-[100%] tracking-tighter md:tracking-[-13%]">
        +{discountNumber}
      </span>
      <div className="flex flex-col items-center md:items-start gap-1 md:gap-2">
        <span className="font-inter font-extralight text-4xl md:text-[47.42px] leading-none md:leading-[100%]">%</span>
        <span className="text-sm md:text-[19.62px] font-inter font-light leading-none md:leading-[100%] tracking-[-2.5%] whitespace-pre-line">OFF</span>
      </div>
      {(descLine1 || descLine2) && (
        <span className="text-xl md:text-[26.16px] font-inter font-extrabold leading-tight md:leading-[90%] tracking-[-2.5%] opacity-90 whitespace-pre-line text-left md:text-start">
          <span>en tu</span><br /><span>inscripción</span>
        </span>
      )}
    </div>

    <a
      href={offer.cta?.url || "#"}
      className="bg-[#1A1A1A] text-white px-6 md:mt-4 py-3 rounded-full md:rounded-[38px] font-inter font-medium shadow-md hover:bg-gray-800 transition text-sm w-full md:w-auto flex flex-row gap-2 justify-center items-center"
    >
      <p className="my-auto">{offer.cta?.title || "Reservá tu cupo ahora"}</p>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.21582 12H19.2158M19.2158 12L12.2158 5M19.2158 12L12.2158 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  </div>
);

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

  const getSplitTitle = () => {
    const rawTitle = stripHtml(offer.title || "");
    const match = rawTitle.match(/¿Sos profesional de la salud\?/);
    if (match) {
      const firstPart = match[0];
      const secondPart = rawTitle.replace(firstPart, '').trim();
      return [firstPart, secondPart];
    }
    return [rawTitle, ""];
  };

  const [firstTitlePart, secondTitlePart] = getSplitTitle();

  return (
    <section className="relative w-full md:h-[993px] mt-[120px] min-h-screen flex items-end md:items-center justify-center text-white font-raleway">
      {/* Imagen de fondo para mobile */}
      <div className="absolute inset-0 z-0 block lg:hidden translate-y-[80px]">
        <Image
          src={offer.background_image?.[0]}
          alt="Oferta Salud Mobile"
          layout="fill"
          objectFit="cover"
          objectPosition="66% center"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
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
      <div className="relative z-5 w-full overflow-visible max-w-[1300px] mx-auto px-5 py-16 flex flex-col md:flex-row items-center md:items-end md:justify-between justify-end gap-5">
        {/* Texto desktop */}
        <div className="text-left text-white max-w-xl font-raleway hidden md:block mt-20 ">
          <p className="text-base mb-4 font-inter font-normal translate-y-[-190px]">
            {stripHtml(offer.pre_text)}
          </p>
          <h2 className="text-5xl  leading-none  font-raleway translate-y-[-150px]">
            <span className="whitespace-nowrap font-[800px] font-bold ">{firstTitlePart}</span>{" "}
            <span className="font-sm text-[45px] whitespace-nowrap">{secondTitlePart}</span>
          </h2>
          <ul className="text-2xl mt-6 space-y-10 leading-snug font-raleway list-disc list-outside ml-4 translate-y-[-120px]">
          {stripHtml(offer.content || "")
              .split(/\n|\r|\r\n/)
              .filter(line => line.trim() !== '')
              .map((line, idx) => (
                <li key={idx} className="whitespace-pre-line">{line}</li>
              ))}
          </ul>
        </div>

        {/* Texto mobile */}
        <div className="text-left text-white font-raleway md:hidden w-full px-3 pt-12">
          <p className="text-[14px] leading-[14px] font-inter font-normal mb-6">
            {stripHtml(offer.pre_text)}
          </p>
          <h2 className="text-[28px] leading-[32px] mb-10">
            <span className="font-bold">{firstTitlePart}</span>{" "}
            <span className="font-medium">{secondTitlePart}</span>
          </h2>
          <ul className="mt-5 space-y-8">
            {stripHtml(offer.content || "")
              .split(/\n|\r|\r\n/)
              .filter(line => line.trim() !== '')
              .map((line, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="mt-2 w-[6px] h-[6px] rounded-full bg-white flex-shrink-0" />
                  <p className="text-[16px] leading-[20px] font-[500]">{line}</p>
                </li>
              ))}
          </ul>

          {/* Descuento + Botón en mobile */}
          <div className="mt-10 w-full">
            <DiscountAndButton offer={offer} discountNumber={discountNumber} descLine1={descLine1} descLine2={descLine2} />
          </div>
        </div>

        {/* Descuento + Botón en desktop */}
        <div className="hidden md:block md:absolute md:bottom-12 md:right-12 md:translate-y-[-80px] md:translate-x-[20px]">
          <DiscountAndButton offer={offer} discountNumber={discountNumber} descLine1={descLine1} descLine2={descLine2} />
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
