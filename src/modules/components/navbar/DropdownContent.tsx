import React, { useState, useRef, useEffect } from "react";
import ViewMain from "./views/ViewMain";
import ViewDiscover from "./views/ViewDiscover";
import ViewSpecialty from "./views/ViewSpecialty";
import ViewSpecialtyDetail from "./views/ViewSpecialtyDetail";
import ViewInstitutions from "./views/ViewInstitutions";
import ViewOffer from "./views/ViewOffer"; 
import ViewResources from "./views/ViewResources"; 

interface Props {
  currentView: string;
  selectedCategory: string | null;
  setCurrentView: (view: string) => void;
  setSelectedCategory: (category: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const DropdownContent: React.FC<Props> = ({
  currentView,
  selectedCategory,
  setCurrentView,
  setSelectedCategory,
  isMobile = true,
  onClose,
}) => {
  const [discoverChildView, setDiscoverChildView] = useState<string | null>(null);
  const [discoverSelectedCategory, setDiscoverSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigateTo = (view: string, category: string | null = null) => {
    if (currentView === "discover" && !isMobile) {
      // Handle discover sub-navigation in desktop mode
      setDiscoverChildView(view);
      setDiscoverSelectedCategory(category);
    } else {
      // Regular navigation
      setCurrentView(view);
      setSelectedCategory(category);
    }
  };

  // Function to get the specialty ID as a number
  const getSpecialtyId = (category: string | null): number => {
    if (!category) return 0;
    return parseInt(category, 10) || 0;
  };

  // Add click outside handler for desktop view
  useEffect(() => {
    if (isMobile) return; // Only apply this for desktop view
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Click was outside dropdown - close it
        if (typeof onClose === 'function') {
          // Call the onClose function from parent to properly close the entire dropdown
          onClose();
        }
        // Don't navigate to any view - just let onClose handle it
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, onClose]);

  const renderChildView = () => {
    if (!discoverChildView) return null;

    switch (discoverChildView) {
      case "specialty":
        // Return ViewSpecialty directly - it now handles its own child view
        return <ViewSpecialty navigateTo={navigateTo} isMobile={false} />;
      case "offer":
        return <ViewOffer navigateTo={navigateTo} isMobile={false} />;
      case "resources":
        return <ViewResources navigateTo={navigateTo} isMobile={false} />;
      case "specialtyDetail":
        return (
          <ViewSpecialtyDetail
            selectedCategory={discoverSelectedCategory}
            navigateTo={navigateTo}
            specialtyId={getSpecialtyId(discoverSelectedCategory)}
            isMobile={false}
          />
        );
      default:
        return null;
    }
  };

  // Desktop layout
  if (!isMobile) {
    const bgClass = currentView === "institutions" ? "bg-[#1a1a1a] shadow-lg" : "bg-transparent";

    if (currentView === "discover") {
      return (
        <div ref={dropdownRef} className={`grid grid-cols-3 gap-4 ${bgClass} overflow-hidden`}>
          {/* Left column (ViewDiscover) */}
          <div className="col-span-1 bg-white rounded-b-2xl">
            <ViewDiscover 
              navigateTo={navigateTo} 
              isMobile={false} 
              onClose={onClose}
            />
          </div>

          {/* Right column (Child view if exists) */}
          <div className="col-span-2 bg-white rounded-b-2xl">
            {renderChildView() || (
              <div className="flex items-center justify-center h-full text-gray-400">
                Selecciona una opción
              </div>
            )}
          </div>
        </div>
      );
    } else if (currentView === "specialty") {
      // Return ViewSpecialty directly - it now handles its own child view
      return (
        <div ref={dropdownRef} className={`${bgClass} overflow-hidden w-full`}>
          <ViewSpecialty 
            navigateTo={navigateTo} 
            isMobile={false} 
            onClose={onClose}
          />
        </div>
      );
    }

    // Other views
    return (
      <div ref={dropdownRef} className={`${bgClass} overflow-hidden`}>
        {(() => {
          switch (currentView) {
            case "main":
              return <ViewMain navigateTo={navigateTo} isMobile={false} onClose={onClose} />;
            case "specialtyDetail":
              return (
                <ViewSpecialtyDetail
                  selectedCategory={selectedCategory}
                  navigateTo={navigateTo}
                  specialtyId={getSpecialtyId(selectedCategory)}
                  isMobile={false}
                  onClose={onClose}
                />
              );
            case "institutions":
              return <ViewInstitutions navigateTo={navigateTo} isMobile={false} onClose={onClose} />;
            case "offer":
              return <ViewOffer navigateTo={navigateTo} isMobile={false} onClose={onClose} />;
            case "resources":
              return <ViewResources navigateTo={navigateTo} isMobile={false} onClose={onClose} />;
            default:
              return null;
          }
        })()}
      </div>
    );
  }

  // Mobile layout
  const getContentMobile = () => {
    switch (currentView) {
      case "main":
        return <ViewMain navigateTo={navigateTo} isMobile onClose={onClose} />;
      case "discover":
        return <ViewDiscover navigateTo={navigateTo} isMobile onClose={onClose} />;
      case "specialty":
        return <ViewSpecialty navigateTo={navigateTo} isMobile onClose={onClose} />;
      case "specialtyDetail":
        return (
          <ViewSpecialtyDetail
            selectedCategory={selectedCategory}
            navigateTo={navigateTo}
            specialtyId={getSpecialtyId(selectedCategory)}
            isMobile
            onClose={onClose}
          />
        );
      case "institutions":
        return <ViewInstitutions navigateTo={navigateTo} isMobile onClose={onClose} />;
      case "offer":
        return <ViewOffer navigateTo={navigateTo} isMobile onClose={onClose} />;
      case "resources":
        return <ViewResources navigateTo={navigateTo} isMobile onClose={onClose} />;
      default:
        return null;
    }
  };

  // For mobile, we don't need the ref as we're handling the back button manually
  return getContentMobile();
};

export default DropdownContent;