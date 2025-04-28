import React from "react";

const ViewMainSkeleton: React.FC = () => {
  return (
    <div className="pt-0 md:space-y-4 md:p-4">
      {/* ViewMainSkeleton loader para desktop */}
      <div className="animate-pulse hidden md:flex flex-col gap-4">
        <div className="flex justify-between items-center h-12 bg-gray-200 rounded-md"></div>
        <div className="flex justify-between items-center h-12 bg-gray-200 rounded-md"></div>
        <div className="flex justify-between items-center h-12 bg-gray-200 rounded-md"></div>
      </div>

      {/* ViewMainSkeleton loader para la vista mobile */}
      <div className="fixed inset-x-0 top-0 bottom-5 z-50 mt-16 md:hidden overflow-visible">
      <div className="bg-white rounded-t-3xl mt-4 py-6 space-y-6 flex flex-col h-full md:hidden">
      <div className="animate-pulse flex flex-col space-y-4 px-6">
        <div className="h-14 bg-gray-200 rounded-md"></div>
        <div className="h-14 bg-gray-200 rounded-md"></div>
        <div className="h-14 bg-gray-200 rounded-md"></div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ViewMainSkeleton;
