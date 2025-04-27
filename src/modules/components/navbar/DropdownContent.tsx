

// //dropdown
// // components/navbar/DropdownContent.tsx
// import React from "react";
// import ViewMain from "./views/ViewMain";
// import ViewDiscover from "./views/ViewDiscover";
// import ViewSpecialty from "./views/ViewSpecialty";
// import ViewSpecialtyDetail from "./views/ViewSpecialtyDetail";
// import ViewInstitutions from "./views/ViewInstitutions";

// interface Props {
//   currentView: string;
//   selectedCategory: string | null;
//   setCurrentView: (view: string) => void;
//   setSelectedCategory: (category: string | null) => void;
//   isMobile?: boolean;
//   onClose?: () => void;
// }

// const DropdownContent: React.FC<Props> = ({
//   currentView,
//   selectedCategory,
//   setCurrentView,
//   setSelectedCategory,
//   isMobile = true,
//   onClose,
// }) => {
//   const navigateTo = (view: string, category: string | null = null) => {
//     setCurrentView(view);
//     setSelectedCategory(category);
//   };

//   // Contenido que se renderiza según la vista y la versión (móvil o desktop)
//   const getContent = () => {
//     switch (currentView) {
//       case "main":
//       return <ViewMain navigateTo={navigateTo} isMobile={isMobile} onClose={onClose} />;
//       case "discover":
//         return <ViewDiscover navigateTo={navigateTo} isMobile={isMobile} />;
//       case "specialty":
//         return <ViewSpecialty navigateTo={navigateTo} isMobile={isMobile} />;
//       case "specialtyDetail":
//         return (
//           <ViewSpecialtyDetail
//             selectedCategory={selectedCategory}
//             navigateTo={navigateTo}
//             isMobile={isMobile}
//           />
//         );
//       case "institutions":
//         return <ViewInstitutions navigateTo={navigateTo} isMobile={isMobile} />;
//       default:
//         return null;
//     }
//   };

//   // En desktop, usamos un contenedor con estilo diferente
//   if (!isMobile) {
//     const bgClass = currentView === "institutions" ? "bg-[#1a1a1a] shadow-lg" : "bg-transparent";
  
//     return (
//       <div className={`relative ${bgClass} z-50 mx-auto pl-5 rounded-b-2xl max-w-4xl`}>
//         {getContent()}
//       </div>
//     );
//   }
  

//   // Versión móvil (contenedor original)
//   return getContent();
// };

// export default DropdownContent;

// //// components/navbar/DropdownContent.tsx
// components/navbar/DropdownContent.tsx
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
      setDiscoverChildView(view);
      setDiscoverSelectedCategory(category);
    } else {
      setCurrentView(view);
      setSelectedCategory(category);
    }
  };

  // Función para obtener el ID de especialidad como número
  const getSpecialtyId = (category: string | null): number => {
    if (!category) return 0;
    return parseInt(category, 10) || 0;
  };

  const renderChildView = () => {
    if (!discoverChildView) return null;

    switch (discoverChildView) {
      case "specialty":
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
        <div className={`grid grid-cols-3 gap-4 ${bgClass} rounded-3xl overflow-hidden`}>
          {/* Columna izquierda (ViewDiscover) */}
          <div className="col-span-1 bg-white rounded-b-2xl">
            <ViewDiscover navigateTo={navigateTo} isMobile={false} />
          </div>

          {/* Columna derecha (Vista hija si existe) */}
          <div className="col-span-2 bg-white rounded-b-2xl">
            {renderChildView() || (
              <div className="flex items-center justify-center h-full text-gray-400">
                Selecciona una opción
              </div>
            )}
          </div>
        </div>
      );
    }

    // Otras vistas que no son discover
    return (
      <div className={`${bgClass} rounded-3xl overflow-hidden`}>
        {(() => {
          switch (currentView) {
            case "main":
              return <ViewMain navigateTo={navigateTo} isMobile={false} />;
            case "specialty":
              return <ViewSpecialty navigateTo={navigateTo} isMobile={false} />;
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
              return <ViewOffer navigateTo={navigateTo} isMobile={false} />;
            case "resources":
              return <ViewResources navigateTo={navigateTo} isMobile={false} />;
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
        return <ViewMain navigateTo={navigateTo} isMobile />;
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
        return <ViewOffer navigateTo={navigateTo} isMobile />;
      case "resources":
        return <ViewResources navigateTo={navigateTo} isMobile />;
      default:
        return null;
    }
  };

  return getContentMobile();
};

export default DropdownContent;