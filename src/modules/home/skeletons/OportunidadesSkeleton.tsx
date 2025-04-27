export default function OportunidadesSkeleton() {
  return (
    <section className="relative w-full max-w-[1600px] mx-auto md:px-4 md:pt-24 pb-[240px] z-[1] pt-32 animate-pulse">
      <div className="relative bg-white rounded-[38px] -mt-32 -mb-64 pt-6 md:pt-[72px] md:pb-16 shadow-lg">
        <div className="px-5 md:px-16">
          {/* Header Skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex space-x-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="hidden md:grid gap-5 auto-rows-[399px]" style={{ gridTemplateColumns: "1fr 1fr 84px 1fr 1fr" }}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`bg-gray-200 rounded-[20px] ${idx === 0 || idx === 5 ? 'col-span-3 h-[399px]' : 'h-[399px]'}`}
              ></div>
            ))}
          </div>

          <div className="grid gap-6 md:hidden">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-60 bg-gray-200 rounded-[20px]"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
