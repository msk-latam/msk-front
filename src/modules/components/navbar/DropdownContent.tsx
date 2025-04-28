import React, { useState } from "react";
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

  const renderChildView = () => {
    if (!discoverChildView) return null;

    switch (discoverChildView) {
      case "specialty":
        // Return ViewSpecialty directly - it now handles its own child view
        return <ViewSpecialty navigateTo={navigateTo} isMobile={false} />;
      case "offer":
        return <ViewOffer isMobile={false} />;
      case "resources":
        return <ViewResources isMobile={false} />;
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
        <div className={`grid grid-cols-3 gap-4 ${bgClass} overflow-hidden`}>
          {/* Left column (ViewDiscover) */}
          <div className="col-span-1 bg-white rounded-b-2xl">
            <ViewDiscover navigateTo={navigateTo} isMobile={false} />
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
        <div className={`${bgClass} overflow-hidden w-full`}>
          <ViewSpecialty navigateTo={navigateTo} isMobile={false} />
        </div>
      );
    }

    // Other views
    return (
      <div className={`${bgClass} overflow-hidden`}>
        {(() => {
          switch (currentView) {
            case "main":
              return <ViewMain navigateTo={navigateTo} isMobile={false} />;
            case "specialtyDetail":
              return (
                <ViewSpecialtyDetail
                  selectedCategory={selectedCategory}
                  navigateTo={navigateTo}
                  specialtyId={getSpecialtyId(selectedCategory)}
                  isMobile={false}
                />
              );
            case "institutions":
              return <ViewInstitutions navigateTo={navigateTo} isMobile={false} />;
            case "offer":
              return <ViewOffer isMobile={false} />;
            case "resources":
              return <ViewResources isMobile={false} />;
            default:
              return null;
          }
        })()}
      </div>
    );
  }

  // Mobile layout (unchanged)
  const getContentMobile = () => {
    switch (currentView) {
      case "main":
        return <ViewMain navigateTo={navigateTo} isMobile onClose={onClose} />;
      case "discover":
        return <ViewDiscover navigateTo={navigateTo} isMobile />;
      case "specialty":
        return <ViewSpecialty navigateTo={navigateTo} isMobile />;
      case "specialtyDetail":
        return (
          <ViewSpecialtyDetail
            selectedCategory={selectedCategory}
            navigateTo={navigateTo}
            specialtyId={getSpecialtyId(selectedCategory)}
            isMobile
          />
        );
      case "institutions":
        return <ViewInstitutions navigateTo={navigateTo} isMobile />;
      case "offer":
        return <ViewOffer isMobile />;
      case "resources":
        return <ViewResources isMobile />;
      default:
        return null;
    }
  };

  return getContentMobile();
};

export default DropdownContent;