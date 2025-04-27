'use client';

export default function MasterclassSkeleton() {
  return (
    <section className="relative -translate-y-0 w-full min-h-screen flex items-center justify-center text-white z-5 font-raleway animate-pulse">
      {/* Fondo gris simulado */}
      <div className="absolute inset-0 bg-gray-300"></div>

      <main className="relative z-10 h-full md:h-screen overflow-visible max-w-[1600px] mx-auto md:px-4 w-full py-11 mt-8 md:py-0 md:mt-0 flex flex-col justify-center md:px-20 md:mb-10">
        <div className="h-full flex flex-col justify-center gap-10 md:flex-row md:items-center md:justify-between md:px-4">
          {/* Texto Izquierda Desktop */}
          <div className="hidden md:flex flex-col gap-6 md:max-w-2xl">
            <div className="h-10 w-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded mb-3"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-full"></div>
          </div>

          {/* Card Placeholder Derecha Desktop */}
          <div className="h-[450px] w-[320px] bg-gray-200 rounded-2xl shadow-lg"></div>
        </div>

        {/* Mobile */}
        <div className="md:hidden w-full flex flex-col items-center gap-6 pl-6 overflow-x-hidden mt-10">
          <div className="h-10 w-40 bg-gray-200 rounded-full mb-4"></div>
          <div className="flex gap-4 overflow-x-auto">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="min-w-[320px] h-[450px] bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
