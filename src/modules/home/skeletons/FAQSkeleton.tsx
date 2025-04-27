'use client';

export default function FaqSectionSkeleton() {
  return (
    <section className="w-full bg-gray-100 font-inter text-[#1A1A1A] animate-pulse">
      <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12">
        <h2 className="text-xl md:text-[34px] font-Raleway mb-5 md:mb-[100px] md:mt-10 md:text-left text-center">
          Preguntas frecuentes
        </h2>

        <div className="divide-y divide-[#C4C7CD]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="py-6">
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
