

//dropdown
// components/navbar/DropdownContent.tsx
import React from "react";
import ViewMain from "./views/ViewMain";
import ViewDiscover from "./views/ViewDiscover";
import ViewSpecialty from "./views/ViewSpecialty";
import ViewSpecialtyDetail from "./views/ViewSpecialtyDetail";
import ViewInstitutions from "./views/ViewInstitutions";

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
  const navigateTo = (view: string, category: string | null = null) => {
    setCurrentView(view);
    setSelectedCategory(category);
  };

  // Contenido que se renderiza según la vista y la versión (móvil o desktop)
  const getContent = () => {
    switch (currentView) {
      case "main":
      return <ViewMain navigateTo={navigateTo} isMobile={isMobile} onClose={onClose} />;
      case "discover":
        return <ViewDiscover navigateTo={navigateTo} isMobile={isMobile} />;
      case "specialty":
        return <ViewSpecialty navigateTo={navigateTo} isMobile={isMobile} />;
      case "specialtyDetail":
        return (
          <ViewSpecialtyDetail
            selectedCategory={selectedCategory}
            navigateTo={navigateTo}
            isMobile={isMobile}
          />
        );
      case "institutions":
        return <ViewInstitutions navigateTo={navigateTo} isMobile={isMobile} />;
      default:
        return null;
    }
  };

  // En desktop, usamos un contenedor con estilo diferente
  if (!isMobile) {
    const bgClass = currentView === "institutions" ? "bg-[#1a1a1a] shadow-lg" : "bg-transparent";
  
    return (
      <div className={`relative ${bgClass} z-50 mx-auto pl-5 rounded-b-2xl max-w-4xl`}>
        {getContent()}
      </div>
    );
  }
  

  // Versión móvil (contenedor original)
  return getContent();
};

export default DropdownContent;

//