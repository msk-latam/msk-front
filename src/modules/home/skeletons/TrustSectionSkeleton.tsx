'use client';

export default function TrustSectionSkeleton() {
  return (
    <div className="relative w-full bg-gray-100 pt-24 pb-60 h-[1200px] md:h-[750px] z-9 md:px-4 animate-pulse">
      <section className="relative bg-white rounded-[38px] md:p-[72px] md:px-[104px] translate-y-[20px] -mt-40 mb-16 z-9 py-10 pl-5 md:overflow-visible max-w-[1600px] mx-auto md:px-4 shadow-lg md:min-h-[500px] md:max-h-[750px] overflow-hidden">
        <div className="space-y-6">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto md:mx-0 mb-4"></div>
          {/* Subtitle */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto md:mx-0 mb-10"></div>

          {/* Figures */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center md:items-start gap-2">
                <div className="h-10 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-2xl h-[260px]"></div>
            ))}
          </div>

          {/* Mobile Testimonials */}
          <div className="md:hidden flex overflow-x-auto space-x-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="min-w-80 max-w-[320px] bg-gray-100 p-6 rounded-2xl h-[260px]"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <div className="flex flex-wrap justify-center gap-8 mt-10 px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-32 h-16 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
}
