'use client';

export default function OffersSkeleton() {
  return (
    <section className="relative w-full md:h-[993px] md:px-4 mt-[120px] min-h-screen flex items-end md:items-center justify-center text-white font-raleway animate-pulse">
      {/* Fondo Gris como placeholder */}
      <div className="absolute inset-0 bg-gray-300"></div>

      {/* Contenido Placeholder */}
      <div className="relative z-10 w-full overflow-visible max-w-[1600px] mx-auto md:px-4 px-5 py-16 flex flex-col md:flex-row items-center md:items-end md:justify-between justify-end gap-5">
        <div className="text-left text-white max-w-xl font-raleway hidden md:block mt-20 space-y-4">
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
          <ul className="space-y-4 mt-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className="h-4 w-2/3 bg-gray-200 rounded"></li>
            ))}
          </ul>
        </div>

        <div className="text-left text-white font-raleway md:hidden w-full px-3 pt-12 space-y-4">
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <ul className="space-y-4 mt-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className="h-4 w-2/3 bg-gray-200 rounded"></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
