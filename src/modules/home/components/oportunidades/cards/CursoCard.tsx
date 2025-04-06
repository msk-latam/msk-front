"use client";

import Image from "next/image";
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
}: CursoCardProps) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-md bg-black text-white ${
        variant === "large" ? largeWidth : ""
      } ${className}`}
    >
      <div className="relative w-[345px] h-[399px] md:w-full md:h-full">
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
          <section className="flex flex-col gap-1">
            <p className="text-sm opacity-80">{temas} temas</p>
            <p className="text-sm opacity-80"> {horas} horas</p>
            <p className="text-sm opacity-80">
              {" "}
              {inscriptos.toLocaleString()} inscriptos
            </p>
          </section>
          <section>
            <p className="text-xs opacity-60">Certificación</p>
            <p className="text-sm opacity-60">{certificado}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CursoCard;
