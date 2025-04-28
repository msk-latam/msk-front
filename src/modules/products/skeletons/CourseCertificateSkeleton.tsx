'use client'

const SkeletonCourseCertificate = () => (
  <section className="bg-white text-center md:text-left w-full rounded-[38px] md:py-10 md:px-9 px-6 py-12 animate-pulse">
    <div className="mb-6">
      <div className="h-8 w-1/2 bg-gray-300 rounded-md mb-4"></div>
    </div>

    <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-9">
      {/* Imagen Placeholder */}
      <div className="flex justify-center md:justify-start">
        <div className="bg-gray-300 w-full max-w-xs md:max-w-sm h-48 rounded-lg"></div>
      </div>

      {/* Texto Placeholder */}
      <div className="font-raleway font-normal text-[#1A1A1A] md:text-lg md:leading-loose text-sm md:max-w-xl md:flex-1">
        <div className="h-6 bg-gray-300 w-3/4 mb-4 rounded-md"></div>
        <div className="h-6 bg-gray-300 w-2/3 mb-2 rounded-md"></div>
      </div>
    </div>
  </section>
)

export default SkeletonCourseCertificate;
