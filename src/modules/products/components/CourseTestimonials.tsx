"use client";

import { useRef, useState } from "react";
import GradientBackground from "./GradientBackground";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sampleTestimonials = [
  {
    name: "Laura M.",
    comment: "Me ayudó a conseguir trabajo en 3 semanas. Súper recomendable.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Carlos G.",
    comment: "Los cursos están bien estructurados y actualizados. 10/10.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Sofía R.",
    comment: "Pude certificarme y avanzar en mi carrera como desarrolladora.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Juan P.",
    comment: "Excelente contenido y muy buena atención al alumno.",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "María A.",
    comment: "Gracias a esta plataforma conseguí mi primer empleo IT.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

export default function CourseTestimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <GradientBackground>
      <section className="text-white py-16 pl-6 pt-48 md:pt-60 flex md:block flex-col space-y-96 md:space-y-2">
        <div className="max-w-screen-xl mx-auto text-left pr-6">
          <h2 className="text-[32px] md:text-[52px] font-raleway font-bold mb-4 leading-snug">
            Sé parte de nuestra comunidad <br className="hidden md:inline" />
            de profesionales
          </h2>
          <p className="text-base md:text-[32px] font-light mb-6">
            ¡La próxima historia de éxito puede ser la tuya!
          </p>

          <div className="flex justify-start items-center gap-2 mb-32">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/thumb/men/${i}.jpg`}
                  alt={`User ${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className=" text-white text-left">
              <strong className="text-lg font-semibold">
                +60.000 profesionales
              </strong>
              <br />
              <p className="text-base font-raleway font-extralight">
                ya se capacitaron con nosotros
              </p>
            </div>
          </div>
        </div>

        {/* Carrusel con botones superpuestos */}
        <div className="max-w-screen-xl w-full mx-auto relative group">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 md:px-0 scrollbar-hide"
          >
            {sampleTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] snap-start 
                bg-white/50 backdrop-blur-md text-white 
                rounded-2xl p-6 shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-semibold text-sm">{t.name}</p>
                </div>
                <p className="text-sm text-white">{t.comment}</p>
                <div className="mt-4 text-right text-xs text-white">5/5 ★</div>
              </div>
            ))}
          </div>

          {/* Botones - aparecen al hacer hover sobre el grupo */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 
              z-10 border border-white rounded-full p-2 shadow 
               text-white hover:scale-105 "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 
              z-10 border border-white rounded-full p-2 shadow 
              text-white hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </GradientBackground>
  );
}
