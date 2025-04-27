'use client';

import Image from 'next/image';
import './homeSkeleton.css'; // 👈 Importamos estilos personalizados

export default function HomeSkeleton() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 opacity-20">
      <div className="flex flex-col items-center justify-center animate-pulse">
        <Image
          src="isotipo.svg" // Ajustá el path si tu logo está en otra carpeta
          alt="MSK Logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <div className="h-4 w-32 rounded-full overflow-hidden bg-gray-300 relative">
          <div className="absolute inset-0 fill-animation"></div> {/* Gradiente animado */}
        </div>
      </div>
    </div>
  );
}
