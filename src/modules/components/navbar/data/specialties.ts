// data/specialties.ts
const specialties = [
    "Administración y gestión",
    "Anestesiología y dolor",
    "Cardiología",
    "Cirugía",
    "Dermatología",
    "Diabetes",
    "Emergentología",
    "Endocrinología",
    "Gastroenterología",
    "Geriatría",
    "Ginecología",
    "Hematología",
    "Infectología",
    "Medicina familiar",
    "Medicina general",
    "Medicina intensiva",
    "Nefrología",
    "Necrología",
    "Nutrición",
    "Obstetricia",
    "Oncología",
    "Pediatría",
    "Psiquiatría",
    "Radiología e imagenología",
    "Traumatología",
    "Urología",
  ];
  
  export default specialties;
  


//   // components/navbar/views/ViewSpecialtyDetail.tsx
// import React from "react";
// import { ArrowLeft, ChevronRight } from "react-feather";
// import courses from "../../data/courses";

// interface Props {
//   selectedCategory: string | null;
//   navigateTo: (view: string, category?: string | null) => void;
//   isMobile?: boolean;
// }

// const ViewSpecialtyDetail: React.FC<Props> = ({ selectedCategory, navigateTo, isMobile = true }) => {
//   if (!isMobile) {
//     // Versión desktop
//     return (
//       <div className="p-6 max-h-[80vh] overflow-auto">
//         <div className="flex items-center mb-4">
//           <button className="mr-3 text-gray-800" onClick={() => navigateTo("specialty")}>
//             <ArrowLeft size={20} />
//           </button>
//           <h2 className="text-xl font-medium text-gray-800">{selectedCategory}</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {courses.map((course, index) => (
//             <div key={index} className="rounded-lg overflow-hidden shadow-md">
//               <div className="relative h-48 bg-gray-200">
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-3 left-3 right-3 text-white">
//                   <h3 className="text-lg font-medium mb-1">{course.title}</h3>
//                   <p className="text-sm">{course.certification}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="mt-4 flex justify-between items-center w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800">
//           <span>Ver todos los cursos</span>
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     );
//   }
  
//   // Versión móvil
//   return (
//     <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto">
//       <div className="flex items-center px-6 py-4 sticky top-0 bg-white">
//         <button className="mr-4 text-gray-800" onClick={() => navigateTo("specialty")}>
//           <ArrowLeft size={24} />
//         </button>
//         <h2 className="text-xl font-medium text-gray-800">{selectedCategory}</h2>
//       </div>

//       <div className="px-6 py-4">
//         {courses.map((course, index) => (
//           <div key={index} className="mb-6 last:mb-0">
//             <div className="relative rounded-lg overflow-hidden mb-2 h-48 bg-gray-300">
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 right-4 text-white">
//                 <h3 className="text-xl font-medium mb-1">{course.title}</h3>
//                 <p className="text-sm">{course.certification}</p>
//               </div>
//             </div>
//           </div>
//         ))}

//         <button className="flex justify-between items-center w-full py-4 text-left text-gray-800">
//           <span>Ver todos los cursos</span>
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewSpecialtyDetail;


// // data/specialties.ts
// const specialties = [
//     "Administración y gestión",
//     "Anestesiología y dolor",
//     "Cardiología",
//     "Cirugía",
//     "Dermatología",
//     "Diabetes",
//     "Emergentología",
//     "Endocrinología",
//     "Gastroenterología",
//     "Geriatría",
//     "Ginecología",
//     "Hematología",
//     "Infectología",
//     "Medicina familiar",
//     "Medicina general",
//     "Medicina intensiva",
//     "Nefrología",
//     "Necrología",
//     "Nutrición",
//     "Obstetricia",
//     "Oncología",
//     "Pediatría",
//     "Psiquiatría",
//     "Radiología e imagenología",
//     "Traumatología",
//     "Urología",
//   ];
  
//   export default specialties;
  

// utiliza specialties detail y data/specialties.ts para optimizar el codigo