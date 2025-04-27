'use client';

export default function MskNewsSectionSkeleton() {
  return (
    <section className="w-full bg-gray-100 py-10 z-[1] font-raleway md:px-4 animate-pulse">
      <div className="relative bg-white rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-4 pl-6 py-6 md:p-10 shadow-lg z-[1]">
        <div className="h-8 w-2/3 bg-gray-300 rounded mb-8"></div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[300px]"></div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex gap-4 overflow-x-auto mt-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="min-w-[85%] bg-gray-100 rounded-3xl p-6 shadow-sm h-[300px]"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
