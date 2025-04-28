import React from "react";

const ViewSpecialtyDetailSkeleton: React.FC = () => {
  return (
    <div className="pt-0 md:space-y-4 md:p-4 md:bg-gray-200 ">
      {/* ViewSpecialtyDetailSkeleton loader para desktop */}
      <div className="animate-pulse hidden md:block">
        {/* Header with back button and specialty name */}
        <div className="flex items-center justify-center px-6 py-8 ">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 ml-4"></div>
        </div>

        {/* Courses list */}
        <div className="space-y-6">
          {/* Individual course skeleton */}
          <div className="relative rounded-[30px] overflow-hidden h-48 bg-gray-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
            <div className="h-full w-full bg-gray-200"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="h-6 bg-gray-400 rounded w-3/4"></div>
              <div className="h-4 bg-gray-400 rounded mt-1 w-1/2"></div>
            </div>
          </div>

          <div className="relative rounded-[30px] overflow-hidden h-48 bg-gray-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
            <div className="h-full w-full bg-gray-200"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="h-6 bg-gray-400 rounded w-3/4"></div>
              <div className="h-4 bg-gray-400 rounded mt-1 w-1/2"></div>
            </div>
          </div>

          {/* Add more skeletons here as needed */}
        </div>

        {/* Link to view all courses */}
        <div className="flex justify-between items-center w-full p-4 bg-gray-200 rounded-2xl mt-4">
          <div className="h-4 bg-gray-400 rounded w-1/4"></div>
          <div className="h-4 bg-gray-400 rounded w-8"></div>
        </div>
      </div>

      {/* ViewSpecialtyDetailSkeleton loader para mobile */}      
      <div className="fixed inset-x-0 top-0 bottom-5 z-50 mt-16 md:hidden overflow-visible">
      <div className="bg-white rounded-t-3xl mt-4 py-6 space-y-6 flex flex-col h-full md:hidden">
      <div className="animate-pulse flex flex-col space-y-4 px-6 pt-20">
        <div className="h-8 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md"></div>

        {/* Course ViewSpecialtyDetailSkeleton for Mobile */}
        <div className="relative rounded-[30px] overflow-hidden h-48 bg-gray-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
          <div className="h-full w-full bg-gray-200"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="h-6 bg-gray-400 rounded w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded mt-1 w-1/2"></div>
          </div>
        </div>

        <div className="relative rounded-[30px] overflow-hidden h-48 bg-gray-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
          <div className="h-full w-full bg-gray-200"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="h-6 bg-gray-400 rounded w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded mt-1 w-1/2"></div>
          </div>
        </div>

        {/* Add more skeletons for mobile */}
        <div className="h-12 bg-gray-200 rounded-md mt-6"></div>
        <div className="h-12 bg-gray-200 rounded-md mt-4"></div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default ViewSpecialtyDetailSkeleton;
