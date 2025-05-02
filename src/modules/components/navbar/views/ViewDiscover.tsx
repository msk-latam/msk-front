import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft } from "react-feather";
import { useDiscoverView } from "../hooks/useDiscoverView";
import ViewDiscoverSkeleton from '../skeletons/ViewDiscoverSkeleton';
import DiscoverMenu from "./DiscoverMenu";
import DiscoverContent from "./DiscoverContent";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const ViewDiscover: React.FC<Props> = ({ navigateTo, isMobile = true, onClose }) => {
  const { data, loading, error } = useDiscoverView();
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // The key is to ensure that we're only listening at the TOP level
  // and not re-creating new listeners in nested components
  const isTopLevelComponent = !onClose; // If no onClose is provided, we're at the top level
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectView = (view: string) => {
    if (currentView === view) {
      setCurrentView(null);
      setSelectedCategory(null);
    } else {
      setCurrentView(view);
      setSelectedCategory(null);
    }
  };

  // Only the top level component handles outside clicks
  useEffect(() => {
    // Skip this effect for nested components
    if (!isTopLevelComponent) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // For top level component, go back to main
        navigateTo("main");
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTopLevelComponent, navigateTo]);

  if (loading) return <ViewDiscoverSkeleton />;
  if (error) return <div className="p-4 text-center text-[#f5006d]">Error: {error}</div>;
  if (!data) return <div className="p-4 text-center">No data available</div>;

  if (!isMobile) {
    return (
<div
  ref={dropdownRef}
  className="flex flex-row rounded-b-2xl items-start h-fit"
>
  <div className="flex-1">
    <DiscoverMenu onSelectView={handleSelectView} currentView={currentView} />
  </div>
  <div className="flex-[2]">
    <DiscoverContent
      currentView={currentView}
      selectedCategory={selectedCategory}
      setCurrentView={setCurrentView}
      setSelectedCategory={setSelectedCategory}
    />
  </div>
</div>

    );
  }

  // Mobile view
  return (
    <div ref={dropdownRef} className="bg-white rounded-t-3xl mt-4 px-6 py-6 flex flex-col h-full">
      <div className="flex flex-row justify-center items-center px-6 pt-1 pb-8">
        <button 
          className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" 
          onClick={() => navigateTo("main")}
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-col bg-gray-200 rounded-2xl">
          <button
            className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
            onClick={() => navigateTo("specialty", "Especialidades")}
          >
            <span>Especialidades</span>
            <ChevronLeft size={20} />
          </button>
          <button
            className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
            onClick={() => navigateTo("offer", "Qué ofrecemos")}
          >
            <span>Qué ofrecemos</span>
            <ChevronLeft size={20} />
          </button>
          <button
            className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
            onClick={() => navigateTo("resources", "Recursos")}
          >
            <span>Recursos</span>
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDiscover;