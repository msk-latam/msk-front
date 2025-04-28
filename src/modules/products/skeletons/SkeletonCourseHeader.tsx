'use client';

export default function SkeletonCourseHeader() {
  return (
    <div className="px-4 md:px-10 lg:px-20 max-w-[1300px] mx-auto h-96 flex justify-center items-center text-white animate-pulse">
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        {/* Skeleton Breadcrumbs */}
        <div className="flex w-full justify-center items-center gap-2">
          <div className="bg-gray-300 h-6 w-10 rounded-sm"></div>
          <div className="bg-gray-300 h-6 w-10 rounded-sm"></div>
          <div className="bg-gray-300 h-6 w-10 rounded-sm"></div>
          <div className="bg-gray-300 h-6 w-10 rounded-sm"></div>
        </div>

        {/* Skeleton Title */}
        <div className="bg-gray-300 h-12 w-3/4 md:w-1/2 rounded-sm"></div>

        {/* Skeleton Certification */}
        <div className="flex items-center gap-2 bg-gray-300 h-6 w-48 rounded-sm"></div>

        {/* Skeleton Categories */}
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
          <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
          <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
