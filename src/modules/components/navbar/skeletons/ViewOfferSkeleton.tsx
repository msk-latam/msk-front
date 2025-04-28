import React from "react";

const ViewOfferSkeleton: React.FC = () => {
  return (
    <div className="pt-0 md:space-y-4 md:p-4">
      {/* ViewOfferSkeleton loader para desktop */}
      <div className="animate-pulse hidden md:block md:bg-gray-200  rounded-2xl">
        {/* Header con el botón de retroceso y el título */}
        <div className="flex items-center justify-center px-6 py-8">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 ml-4"></div>
        </div>

        {/* Lista de ofertas */}
        <div className="space-y-4">
          {/* Individual offer skeleton */}
          <div className="w-full flex justify-between items-center p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
            <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
            <div className="h-6 bg-gray-300 w-6 rounded"></div>
          </div>

          <div className="w-full flex justify-between items-center p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
            <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
            <div className="h-6 bg-gray-300 w-6 rounded"></div>
          </div>

          {/* Más ofertas pueden ir aquí */}
        </div>

        {/* Link para ver todos los cursos */}
        <div className="flex justify-between items-center w-full p-4 bg-gray-200 rounded-2xl mt-4">
          <div className="h-4 bg-gray-400 rounded w-1/4"></div>
          <div className="h-4 bg-gray-400 rounded w-8"></div>
        </div>
      </div>

      {/* ViewOfferSkeleton loader para mobile */}
      <div className="fixed inset-x-0 top-0 bottom-5 z-50 mt-16 md:hidden overflow-visible">
      <div className="bg-white rounded-t-3xl mt-4 py-6 space-y-6 flex flex-col h-full md:hidden">
      <div className="animate-pulse flex flex-col space-y-4 px-6 pt-20">
        <div className="h-8 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md"></div>

        {/* ViewOfferSkeleton para las ofertas */}
        <div className="flex justify-between items-center p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
          <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
          <div className="h-6 bg-gray-300 w-6 rounded"></div>
        </div>

        <div className="flex justify-between items-center p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
          <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
          <div className="h-6 bg-gray-300 w-6 rounded"></div>
        </div>
</div>
</div>
        {/* Más ofertas pueden ir aquí */}
      </div>
    </div>
  );
};

export default ViewOfferSkeleton;
