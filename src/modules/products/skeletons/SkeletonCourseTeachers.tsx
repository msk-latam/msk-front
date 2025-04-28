'use client'

const ITEMS_PER_PAGE = 4;

export default function SkeletonCourseTeachers() {
  return (
    <section className="bg-white rounded-[38px] px-6 md:px-0 max-w-5xl mx-auto py-12 space-y-8">
      <h2 className="text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A] mb-6 bg-gray-300 h-8 w-1/2 animate-pulse"></h2>
      {/* Mobile - Paginación y listado de docentes */}
      <div className="block md:hidden space-y-6">
        {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
          <div key={idx} className="flex items-start gap-4 animate-pulse">
            <div className="bg-gray-300 w-24 h-24 rounded-[24px]"></div>
            <div className="flex flex-col space-y-4">
              <div className="bg-gray-300 h-4 w-2/3"></div>
              <div className="bg-gray-300 h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop - Grid de 2 columnas */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
          <div key={idx} className="flex items-start gap-4 animate-pulse">
            <div className="bg-gray-300 w-24 h-24 rounded-[24px]"></div>
            <div className="flex flex-col space-y-4">
              <div className="bg-gray-300 h-4 w-2/3"></div>
              <div className="bg-gray-300 h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Paginación */}
      <div className="flex justify-center items-center gap-6 mt-10 md:hidden">
        <button className="w-8 h-8 flex items-center justify-center rounded-[20px] border border-gray-300 text-gray-600 disabled:opacity-30">
          &lt;
        </button>

        <div className="flex items-center gap-6 text-sm text-gray-700 font-medium">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="bg-gray-300 h-4 w-8 animate-pulse"></span>
          ))}
        </div>

        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30">
          &gt;
        </button>
      </div>
    </section>
  );
}
