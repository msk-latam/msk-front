
// import React, { useState } from "react";
// import { ChevronRight, ChevronLeft } from "react-feather";
// import ViewSpecialty from "./ViewSpecialty";
// import { useCourseHeader } from '../hooks/useDiscoverView';
// import ViewSpecialtyDetail from "./ViewSpecialtyDetail";

// interface Props {
//   navigateTo: (view: string, category?: string | null) => void;
//   isMobile?: boolean;
// }

// const ViewDiscover: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
//   const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
//   const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

//   const handleSpecialtySelect = (specialty: string) => {
//     setSelectedSpecialty(specialty);
//   };

//   const handleBackFromDetail = () => {
//     setSelectedSpecialty(null);
//   };

//   if (!isMobile) {
//     return (
//       <div className="grid grid-cols-3">
//         {/* Menú lateral */}
//         <div className="col-span-1 relative">
//           <div className="flex flex-col gap-2 bg-white rounded-b-2xl divide-y">
//             {/* Botón para abrir vista de especialidades */}
//             <button
//               className="flex justify-between items-center gap-2 text-gray-800 px-4 py-3 hover:bg-white rounded-lg font-medium"
//               onClick={() => {
//                 setSpecialtiesOpen(!specialtiesOpen);
//                 setSelectedSpecialty(null); // Reset selected specialty when toggling menu
//               }}
//             >
//               <span>Especialidades</span>
//               {specialtiesOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//             </button>

//             <button className="flex justify-between gap-2 items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium">
//               <span>Qué ofrecemos</span>
//               <ChevronRight size={20} />
//             </button>

//             <button className="flex justify-between gap-2 items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium">
//               <span>Recursos</span>
//               <ChevronRight size={20} />
//             </button>
//           </div>

//           {/* Vista de especialidades, como panel flotante a la derecha */}
//           {specialtiesOpen && (
//   <div className="absolute left-full top-0 h-full flex">
//     {/* Panel de especialidades */}
//     <div className="w-full rounded-b-2xl bg-white">
//       <ViewSpecialty 
//         navigateTo={navigateTo} 
//         isMobile={false} 
//         onSelectSpecialty={handleSpecialtySelect}
//       />
//     </div>

//     {/* Panel de detalle de especialidad */}
//     {selectedSpecialty && (
//       <div className="w-full rounded-b-2xl bg-white">
//         <ViewSpecialtyDetail 
//           selectedCategory={selectedSpecialty} 
//           navigateTo={navigateTo} 
//           isMobile={false}
//           onBack={handleBackFromDetail}
//         />
//       </div>
//     )}
//   </div>
// )}


//         </div>

//         {/* Área derecha vacía */}
//       </div>
//     );
//   }

//   // Versión móvil sin cambios
//   return (
//     <div className="bg-white rounded-t-3xl mt-4 h-full">
//       <div className="flex flex-row justify-center items-center px-6 py-8">
//         <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={() => navigateTo("main")}>
//           <ChevronLeft size={24} />
//         </button>
//         <h2 className="text-xl text-center font-medium text-gray-800">Descubre</h2>
//       </div>

//       <div className="px-6 pt-4 pb-6 flex flex-col">
//         <button
//           className="flex justify-between items-center rounded-t-2xl bg-gray-200 p-4 text-gray-800"
//           onClick={() => navigateTo("specialty", "Especialidades")}
//         >
//           <span>Especialidades</span>
//           <ChevronRight size={20} />
//         </button>

//         <button className="flex justify-between items-center bg-gray-200 p-4 text-gray-800">
//           <span>Qué ofrecemos</span>
//           <ChevronRight size={20} />
//         </button>

//         <button className="flex justify-between items-center rounded-b-2xl bg-gray-200 p-4 text-gray-800">
//           <span>Recursos</span>
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewDiscover;
import React, { useState } from "react";
import { ChevronRight,X } from "react-feather";
import { useDiscoverView } from "../hooks/useDiscoverView";
import DropdownContent from "../DropdownContent";

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
    setCurrentView(view);
    setSelectedCategory(null);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-4 text-center">No data available</div>;
  }

  if (!isMobile) {
    return (
      <div className="grid grid-cols-3 h-[80vh] overflow-hidden rounded-b-2xl bg-white">
        {/* Menú lateral izquierdo */}
        <div className="col-span-1 border-r divide-y overflow-auto">
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
              Selecciona una opción
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
        <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={onClose}>
          <X size={24} />
        </button>

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
