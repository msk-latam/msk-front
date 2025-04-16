"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type CursoCardProps = {
  variant?: "small" | "large";
  className?: string;
  largeWidth?: string;
  id: number;
  categoria: string;
  titulo: string;
  temas: number;
  horas: number;
  inscriptos: number;
  certificado: string;
  imagen: string;
  link: string;
};

const CursoCard = ({
  variant = "small",
  className = "",
  largeWidth = "",
  categoria,
  titulo,
  temas,
  horas,
  inscriptos,
  certificado,
  imagen,
  link,
}: CursoCardProps) => {
  return (
    <Link href={link} passHref>
      <div
        className={`relative rounded-[30px] overflow-hidden shadow-md bg-black text-white transform transition-transform duration-300 hover:scale-105 cursor-pointer ${
          variant === "large" ? largeWidth : ""
        } ${className}`}
      >
        <div className="relative w-full h-[399px] md:h-full">
          <Image
            src={imagen}
            alt={`Imagen del curso ${titulo}`}
            fill
            className="object-cover w-full h-full opacity-80"
          />
          <div className="absolute inset-0 flex md:h-auto flex-col justify-end px-[22px] py-6 bg-gradient-to-t from-black/70 to-transparent gap-2">
            <span className="bg-[#FCEAFF] text-[#9F1DB7] text-xs font-semibold px-3 py-2 rounded-full w-fit">
              {categoria}
            </span>
            <h3 className="font-semibold text-2xl leading-tight">{titulo}</h3>

            {/* Iconografía + Info */}
            <section className="flex flex-col gap-1 text-sm opacity-80">
              <p className="flex items-center gap-2">
                <Image
                  src="/icons/topic.png"
                  alt="Icono temas"
                  width={16}
                  height={16}
                />
                {temas} temas
              </p>
              <p className="flex items-center gap-2">
                <Image
                  src="/icons/time.png"
                  alt="Icono horas"
                  width={14}
                  height={14}
                />
                {horas} horas
              </p>
              <p className="flex items-center gap-2">
                <Image
                  src="/icons/registered.png"
                  alt="Icono inscriptos"
                  width={16}
                  height={16}
                />
                {inscriptos.toLocaleString()} inscriptos
              </p>
            </section>

            <section className="mt-2">
              <p className="text-xs opacity-60">Certificación</p>
              <p className="text-sm opacity-60">{certificado}</p>
            </section>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CursoCard;