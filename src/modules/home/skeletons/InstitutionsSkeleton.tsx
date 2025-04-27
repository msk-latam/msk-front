'use client';

export default function InstitutionsSkeleton() {
  return (
    <section className="relative bg-white rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-4 -mt-24 translate-y-[70px] z-10 py-10 px-5 md:px-10 md:gap-4 shadow-lg animate-pulse">
      <div className="text-center mb-7">
        <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto md:ml-24 md:mx-0"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 items-center justify-center w-full md:mx-auto md:max-w-7xl md:flex md:flex-row md:flex-wrap md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-[30px] md:px-10 md:p-6 p-6 flex justify-center items-center"
          >
            <div className="w-[100px] h-[100px] bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
