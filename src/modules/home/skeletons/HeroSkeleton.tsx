'use client';

export default function HeroSkeleton() {
  return (
    <div className="relative md:h-[800px] h-[600px] w-full bg-gray-300 animate-pulse overflow-hidden pt-[150px]">
      {/* Fondo gris simulado */}
      <div className="absolute inset-0 bg-gray-300"></div>

      {/* Contenido Placeholder */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center md:justify-end text-center md:text-left md:items-start px-6 max-w-[1600px] mx-auto">
        <div className="h-8 w-24 bg-gray-200 rounded-full mb-6"></div>

        <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-8"></div>

        <div className="h-12 w-40 bg-gray-200 rounded-full"></div>

        {/* Highlights dots (opcional si quieres hacer algo más visual en la base) */}
        <div className="flex gap-2 mt-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="w-3 h-3 rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
