'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroHighlights from "./HeroHighlights";
import { useHomeContent } from "@/modules/home/hooks/useHomeContent";
import { HeroSlide } from "@/modules/home/types";
import { usePathname } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import PlayPauseButton from "./PlayPauseButton";
import HeroSkeleton from "@/modules/home/skeletons/HeroSkeleton"; // 👈 Importar Skeleton
import Head from 'next/head'; // 👈 Agregado para preload dinámico

const STATIC_HIGHLIGHTS = [
  "Cursos de medicina para expandir tus metas profesionales",
  "Medical & Scientific Knowledge, el lugar ideal para estudiar medicina a distancia",
  "Descubre los nuevos cursos médicos disponibles este mes",
  "Acceso exclusivo: Cursos médicos diseñados por expertos",
];

const Hero = () => {
  const { data, loading } = useHomeContent(); // 👈 Usar loading
  const slides: HeroSlide[] = data?.slides || [];
  const backgroundImages = slides.map((s) => s.background_image?.[0]).filter(Boolean);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % STATIC_HIGHLIGHTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [currentSlide]);

  const handleSelect = (index: number) => {
    setCurrentSlide(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'ar';

  if (loading) return <HeroSkeleton />; // 👈 Mostrar Skeleton si está cargando

const firstHeroImage = backgroundImages[0]; // 👈 Definimos esto antes del return

return (
  <>
    {/* 🚀 Inyectamos preload dinámico solo si existe imagen */}
    {firstHeroImage && (
      <Head>
        <link rel="preload" as="image" href={firstHeroImage} />
      </Head>
    )}


      <div className="relative md:h-[800px] h-[600px] w-full bg-black text-white px-4 overflow-hidden pt-[150px]">
        <PlayPauseButton paused={paused} onToggle={() => setPaused(prev => !prev)} />

        <HeroCarousel
          slides={backgroundImages}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

      <div className="absolute inset-0 z-10">
        <div className="px-5 py-3 md:mt-40 md:py-0 overflow-visible max-w-[1600px] md:px-6 mx-auto md:h-[71%] flex flex-col justify-center items-center md:justify-end text-center gap-0 md:items-start md:text-left md:gap-2">
          <div className="md:px-6 flex flex-col justify-center items-center md:justify-end text-center gap-0 md:items-start md:text-left md:gap-2">
            <p className="mt-20 md:mt-0 border border-white rounded-full px-[18px] py-2 my-4 md:my-0 text-[14px] w-fit">
              Cursos
            </p>

            <div className="flex wrap w-fit md:w-full flex-col gap-4 md:mt-2 md:flex-row mt-10 md:justify-between">
              <div>
                <h1 className="text-[2rem] md:text-5xl text-white leading-tight md:leading-tight md:min-w-full md:text-[60px] font-bold ">
                  <span className="block md:hidden leading-tight font-Raleway font-[700] ">
                    {STATIC_HIGHLIGHTS[currentSlide] === STATIC_HIGHLIGHTS[0] ? (
                      <>
                        Cursos de medicina para{" "}
                        <span className="not-italic font-lora-italic md:text-[64px] text-[40px]">
                          expandir
                        </span>{" "}
                        tus metas profesionales
                      </>
                    ) : (
                      STATIC_HIGHLIGHTS[currentSlide]
                    )}
                  </span>
                  <div className="md:mr-72">
                    <span className="hidden md:inline">
                      {STATIC_HIGHLIGHTS[currentSlide] === STATIC_HIGHLIGHTS[0] ? (
                        <>
                          Cursos de medicina para
                          <br />
                          <span className="not-italic font-lora-italic md:text-[64px] text-[64px]">
                            expandir
                          </span>{" "}
                          tus metas profesionales
                        </>
                      ) : (
                        STATIC_HIGHLIGHTS[currentSlide]
                      )}
                    </span>
                  </div>
                </h1>
              </div>

              <Link
                href={getLocalizedUrl(lang, '/tienda?recurso=curso')}
                className="mt-4 md:mt-20 md:mb-0 mx-6 md:mx-0 w-full md:w-auto bg-white text-black px-5 py-3 rounded-full text-[14px] hover:scale-105 transition flex justify-center text-center self-center gap-2 whitespace-nowrap"
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
                  className="mt-[4px] md:mt-[0.5px]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </Link>
            </div>
          </div>

          <HeroHighlights
            currentSlide={currentSlide}
            highlights={STATIC_HIGHLIGHTS}
            onSelect={handleSelect}
            animationKey={animationKey}
            paused={paused}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Hero;
