'use client';

import Image from 'next/image';
import React from 'react';

type CursoCardProps = {
  variant?: 'small' | 'large';
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
  variant = 'small',
  className = '',
  largeWidth = '',
  categoria,
  titulo,
  temas,
  horas,
  inscriptos,
  certificado,
  imagen,
}: CursoCardProps) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-md bg-black text-white ${variant === 'large' ? largeWidth : ''} ${className}`}>
      <div className="relative w-full h-full min-h-[260px] max-h-[260px]">
        <Image
          src={imagen}
          alt={`Imagen del curso ${titulo}`}
          fill
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent">
          <span className="bg-fuchsia-500 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">
            {categoria}
          </span>
          <h3 className="font-semibold text-sm leading-tight">{titulo}</h3>
          <p className="text-xs mt-1 opacity-80">
            {temas} temas · {horas} horas · {inscriptos.toLocaleString()} inscriptos
          </p>
          <p className="text-[11px] opacity-60 mt-1">Certificado por {certificado}</p>
        </div>
      </div>
    </div>
  );
};

export default CursoCard;
