import React, { useState } from "react";
import { ChevronRight,ChevronLeft } from "react-feather";
import { useDiscoverView } from "../hooks/useDiscoverView";
import DropdownContent from "../DropdownContent";
import ViewDiscoverSkeleton from '../skeletons/ViewDiscoverSkeleton'

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const ViewDiscover: React.FC<Props> = ({ navigateTo, isMobile = true, onClose }) => {
  const { data, loading, error } = useDiscoverView();
  
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleSelectView = (view: string) => {
    if (currentView === view) {
      setCurrentView(null);
      setSelectedCategory(null);
    } else {
      setCurrentView(view);
      setSelectedCategory(null);
    }
  };

  if (loading) {
    return <ViewDiscoverSkeleton/>;
  }

  if (error) {
    return <div className="p-4 text-center text-[#f5006d]">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-4 text-center">No data available</div>;
  }

  if (!isMobile) {
    return (
      <div className="grid grid-cols-3  overflow-hidden rounded-b-2xl ">
        {/* Menú lateral izquierdo */}
        <div className="col-span-1 border-r divide-y overflow-auto bg-white h-fit rounded-b-2xl">
          <button
            className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-gray-100 font-medium w-full"
            onClick={() => handleSelectView("specialty")}
          >
            <span>Especialidades</span>
            <ChevronRight size={20} />
          </button>

          <button
            className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-gray-100 font-medium w-full"
            onClick={() => handleSelectView("offer")}
          >
            <span>Qué ofrecemos</span>
            <ChevronRight size={20} />
          </button>

          <button
            className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-gray-100 font-medium w-full"
            onClick={() => handleSelectView("resources")}
          >
            <span>Recursos</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Contenido derecho: solo si hay una vista seleccionada */}
        <div className="col-span-2 overflow-auto">
          {currentView ? (
            <DropdownContent
              currentView={currentView}
              selectedCategory={selectedCategory}
              setCurrentView={setCurrentView}
              setSelectedCategory={setSelectedCategory}
              isMobile={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile (sin cambios)
  return (
    <div className="bg-white rounded-t-3xl mt-4 px-6 py-6 flex flex-col h-full">
            <div className="flex flex-row justify-center items-center px-6 pt-1 pb-8">
        <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={() => navigateTo("main")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
      </div>



      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-col bg-gray-200 rounded-2xl">    <button
        className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
        onClick={() => navigateTo("specialty", "Especialidades")}
      >
        <span>Especialidades</span>
        <ChevronRight size={20} />
      </button>

      <button
        className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
        onClick={() => navigateTo("offer", "Qué ofrecemos")}
      >
        <span>Qué ofrecemos</span>
        <ChevronRight size={20} />
      </button>

      <button
        className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
        onClick={() => navigateTo("resources", "Recursos")}
      >
        <span>Recursos</span>
        <ChevronRight size={20} />
      </button>
      </div>
      </div>
    </div>
  );
};

export default ViewDiscover;