import React from "react";

const ViewSpecialtySkeleton: React.FC = () => {
  return (
    <div className="pt-0 md:space-y-4 md:p-4">
      {/* ViewSpecialtySkeleton loader para desktop */}
      <div className="animate-pulse hidden md:grid grid-cols-4 gap-4">
        {/* Left column - Specialty list */}
        <div className="col-span-2 divide-y bg-gray-200 h-[80vh] rounded-b-2xl">
          <div className="flex justify-between items-center py-3 px-4 bg-gray-300 mb-3">
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded w-8"></div>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-gray-300 mb-3">
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded w-8"></div>
          </div>
          {/* Add more skeletons here as needed */}
        </div>

      </div>

      {/* ViewSpecialtySkeleton loader para mobile */}
      <div className="fixed inset-x-0 top-0 bottom-5 z-50 mt-16 md:hidden overflow-visible">
      <div className="bg-white rounded-t-3xl mt-4 py-6 space-y-6 flex flex-col h-full md:hidden">
      <div className="animate-pulse flex flex-col space-y-4 px-6 pt-20">
        <div className="h-8 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md"></div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="h-8 bg-gray-200 rounded-md w-2/3"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
        </div>

        <div className="h-12 bg-gray-200 rounded-md mt-6"></div>
        <div className="h-12 bg-gray-200 rounded-md mt-4"></div>

        <div className="flex justify-between items-center mt-6">
          <div className="h-8 bg-gray-200 rounded-md w-2/3"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
        </div>

        <div className="h-12 bg-gray-200 rounded-md mt-6"></div>
        <div className="h-12 bg-gray-200 rounded-md mt-4"></div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ViewSpecialtySkeleton;
