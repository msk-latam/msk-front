// // components/navbar/views/ViewDiscover.tsx
// import React from "react";
// import { ChevronRight, ArrowLeft } from "react-feather";
// import ViewSpecialty from "./ViewSpecialty";

// interface Props {
//   navigateTo: (view: string, category?: string | null) => void;
//   isMobile?: boolean;
// }

// const ViewDiscover: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
//   if (!isMobile) {
//     return (
//       <div className="grid grid-cols-5 max-h-[80vh] overflow-auto">
//         {/* Menú lateral */}
//         <div className="col-span-1 bg-gray-100 p-4">
//           <div className="flex flex-col gap-2">
//             {/* Especialidades como acordeón */}
//             <ViewSpecialty navigateTo={navigateTo} isMobile={false} />

//             {/* Ítems adicionales */}
//             <button 
//               className="flex justify-between items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium"
//             >
//               <span>Qué ofrecemos</span>
//               <ChevronRight size={20} />
//             </button>

//             <button 
//               className="flex justify-between items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium"
//             >
//               <span>Recursos</span>
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Área derecha (vacía o con contenido) */}
//         <div className="col-span-4 p-6">

//         <div className="flex flex-col">
//           <h3 className="font-medium text-gray-800 mb-3">Destacados</h3>
//           <div className="grid md:grid-cols-1 gap-4 max-w-56">
//             {/* Las tarjetas que se muestran en la imagen */}
//             <div className="rounded-lg overflow-hidden shadow-md">
//               <div className="relative h-40 bg-gray-200">
//                 <div className="absolute inset-0 flex items-start p-2">
//                   <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Anestesiología</span>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
//                   <h3 className="font-medium mb-1">Auditoría médica</h3>
//                   <p className="text-xs">Certificación<br/>Colegio de Médicos de la Provincia de Buenos Aires - Distrito III</p>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-lg overflow-hidden shadow-md">
//               <div className="relative h-40 bg-gray-200">
//                 <div className="absolute inset-0 flex items-start p-2">
//                   <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Administración</span>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
//                   <h3 className="font-medium mb-1">Curso superior de administración y gestión hospitalaria</h3>
//                   <p className="text-xs">Certificación<br/>Colegio de Médicos de la Provincia de Buenos Aires - Distrito III</p>
//                 </div>
//               </div>
//             </div>
//         <div className="mt-6 flex">

//         <button className="mt-4 w-full flex items-center justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800">
//             <span>Ver todos los cursos</span>
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//       </div>
//         </div>
//       </div>
//     );
//   }

//   // Móvil sin cambios
//   return (
//     <div className="bg-white rounded-t-3xl mt-4 h-full">
//       <div className="flex items-center px-6 py-4">
//         <button className="mr-4 text-gray-800" onClick={() => navigateTo("main")}>
//           <ArrowLeft size={24} />
//         </button>
//         <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
//       </div>

//       <div className="px-6 pt-4 pb-6 flex flex-col gap-2">
//         <button
//           className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800"
//           onClick={() => navigateTo("specialty", "Especialidades")}
//         >
//           <span>Especialidades</span>
//           <ChevronRight size={20} />
//         </button>

//         <button className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800">
//           <span>Qué ofrecemos</span>
//           <ChevronRight size={20} />
//         </button>

//         <button className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800">
//           <span>Recursos</span>
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewDiscover;


// components/navbar/views/ViewDiscover.tsx
import React, { useState } from "react";
import { ChevronRight, ArrowLeft, ChevronDown, ChevronUp } from "react-feather";
import specialties from "../data/specialties";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
}

const ViewDiscover: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);

  if (!isMobile) {
    return (
      <div className="grid grid-cols-3 max-h-[80vh] overflow-auto mr-10">
        {/* Menú lateral */}
        <div className="col-span-1 bg-gray-100 rounded-2xl">
          <div className="flex flex-col gap-2">
            {/* Especialidades como acordeón integrado */}
            <div className="flex flex-col">
              <button
                className="flex justify-start items-center gap-2 text-gray-800 px-4 py-3 hover:bg-white rounded-lg font-medium"
                onClick={() => setSpecialtiesOpen(!specialtiesOpen)}
              >
                <span>Especialidades</span>
                {specialtiesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {specialtiesOpen && (
                <div className="pl-4 flex flex-col gap-1 transition-all duration-300">
                  {specialties.map((specialty, index) => (
                    <button
                      key={index}
                      className="flex justify-between items-center p-4 text-gray-700 hover:bg-gray-50 rounded-md text-sm"
                      onClick={() => navigateTo("specialtyDetail", specialty)}
                    >
                      <span>{specialty}</span>
                      <ChevronDown size={20} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ítems adicionales */}
            <button 
              className="flex justify-start gap-2 items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium"
            >
              <span>Qué ofrecemos</span>
              <ChevronRight size={20} />
            </button>

            <button 
              className="flex justify-start gap-2 items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium"
            >
              <span>Recursos</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Área derecha (vacía o con contenido) */}
        <div className="col-span-2 px-6">
          <div className="flex flex-col">
            <div className="grid md:grid-cols-1 gap-4 max-w-56">
              {/* Las tarjetas que se muestran en la imagen */}
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-40 bg-gray-200">
                  <div className="absolute inset-0 flex items-start p-2">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Anestesiología</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-medium mb-1">Auditoría médica</h3>
                    <p className="text-xs">Certificación<br/>Colegio de Médicos de la Provincia de Buenos Aires - Distrito III</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-40 bg-gray-200">
                  <div className="absolute inset-0 flex items-start p-2">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Administración</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-medium mb-1">Curso superior de administración y gestión hospitalaria</h3>
                    <p className="text-xs">Certificación<br/>Colegio de Médicos de la Provincia de Buenos Aires - Distrito III</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex">
                <button className="mt-4 w-full flex items-center justify-between py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800">
                  <span>Ver todos los cursos</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Móvil sin cambios
  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full">
      <div className="flex items-center px-6 py-4">
        <button className="mr-4 text-gray-800" onClick={() => navigateTo("main")}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
      </div>

      <div className="px-6 pt-4 pb-6 flex flex-col gap-2">
        <button
          className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800"
          onClick={() => navigateTo("specialty", "Especialidades")}
        >
          <span>Especialidades</span>
          <ChevronRight size={20} />
        </button>

        <button className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800">
          <span>Qué ofrecemos</span>
          <ChevronRight size={20} />
        </button>

        <button className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800">
          <span>Recursos</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ViewDiscover;