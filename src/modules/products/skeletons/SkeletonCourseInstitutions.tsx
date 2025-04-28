'use client';

export default function SkeletonCourseInstitutions() {
  return (
    <section className="md:py-3 text-left h-fit">


      <div className="overflow-x-auto md:overflow-visible scrollbar-none">
        <div className="flex gap-4 md:flex-row flex-wrap items-center justify-center px-2">
          {/* Skeleton Cards */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-[#f7f9ff] rounded-[30px] p-7 h-32 flex items-center justify-center md:w-1/4 relative animate-pulse"
            >
              <div className="bg-gray-300 w-1/2 h-16 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
