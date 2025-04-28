'use client';

export default function SkeletonCourseOverview() {
  return (
    <section className="py-6 max-w-5xl mx-auto">
      {/* Título principal */}
      <div className="bg-gray-300 h-8 w-1/2 mx-auto mb-6 animate-pulse"></div>

      {/* Habilidades (tags dinámicos) */}
      <div className="flex flex-wrap gap-3 justify-center items-center mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 h-8 w-24 rounded-full animate-pulse"
          ></div>
        ))}
      </div>

      {/* Texto "Con este curso..." */}
      <div className="bg-gray-300 h-6 w-1/2 mx-auto mb-6 animate-pulse"></div>

      {/* Paso a paso */}
      <div className="flex flex-col md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-4 mb-10 w-full">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex items-start md:items-center gap-3 text-left">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-16 h-16 animate-pulse"></div>
              {idx < 3 && (
                <span className="bg-gray-300 block md:hidden mt-1 w-4 h-4 animate-pulse"></span>
              )}
            </div>
            <span className="bg-gray-300 h-6 w-32 mt-4 animate-pulse"></span>
            {idx < 3 && (
              <span className="bg-gray-300 hidden md:block w-4 h-4 animate-pulse"></span>
            )}
          </div>
        ))}
      </div>

      {/* Sección "Tu cursada paso a paso" */}
      <div className="bg-gray-300 rounded-[38px] p-6 mb-10 animate-pulse">
        <div className="bg-gray-300 h-6 w-1/2 mb-6 animate-pulse"></div>
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="bg-gray-300 w-5 h-5 rounded-full animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-32 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards informativas */}
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 h-48 w-full rounded-[38px] border border-gray-200 py-6 px-6 shadow-sm animate-pulse"
          ></div>
        ))}
      </div>
    </section>
  );
}
