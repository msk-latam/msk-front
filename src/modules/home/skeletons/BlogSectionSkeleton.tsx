'use client';

export default function BlogSectionSkeleton() {
  return (
    <section className="w-full font-raleway md:px-16 md:py-5 p-5 animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-1/2 bg-gray-300 rounded mx-auto md:mx-0 mb-4"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mx-auto md:mx-0"></div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Blog Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className={`${
              idx === 0 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'
            } bg-gray-100 rounded-[20px] h-[250px]`}
          ></div>
        ))}
      </div>

      {/* Botón mobile */}
      <div className="flex justify-center mt-8 md:hidden">
        <div className="h-12 w-40 bg-gray-300 rounded-full"></div>
      </div>
    </section>
  );
}
