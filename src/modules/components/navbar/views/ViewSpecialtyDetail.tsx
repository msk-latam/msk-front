// // components/navbar/views/ViewSpecialtyDetail.tsx
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
//   //                 </div>
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
// //               </div>
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

// components/specialty/views/ViewSpecialtyDetail.tsx
import React from "react";
import { ArrowLeft, ChevronRight } from "react-feather";
import { useSpecialtyDetailView } from "../hooks/useSpecialtyDetailView";
import { Course } from "../hooks/types";
import Link from "next/link";

interface Props {
  selectedCategory: string | null;
  navigateTo: (view: string, category?: string | null) => void;
  specialtyId: number;
  isMobile?: boolean;
  onBack?: () => void;
}

const ViewSpecialtyDetail: React.FC<Props> = ({ 
  selectedCategory, 
  navigateTo, 
  specialtyId, 
  isMobile = true, 
  onBack 
}) => {
  // Pass the specialtyId to the hook
  const { selectedSpecialty, loading, error } = useSpecialtyDetailView(specialtyId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedSpecialty) {
    return <div>Specialty not found</div>;
  }

  // Get the courses from the selected specialty
  const courses: Course[] = selectedSpecialty.courses;
  const specialtyName = selectedSpecialty.specialty.name;

  if (!isMobile) {
    return (
      <div className="p-4 h-fit overflow-auto w-full bg-white rounded-b-2xl">
        <div className="flex flex-col gap-4">
          {courses.map((course, index) => (
            <div key={index} className="rounded-[30px] overflow-hidden shadow-md">
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-medium mb-1">{course.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
      href="/tienda" className="mt-4 flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-800">
          <span className="whitespace-nowrap">Ver todos los cursos</span>
          <ChevronRight size={20} />
          </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto">
      <div className="flex flex-row justify-center items-center px-6 py-8">
        <button 
          className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" 
          onClick={() => navigateTo("specialty")}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">{specialtyName}</h2>
      </div>

      <div className="px-6 py-4 bg-white">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="relative rounded-lg overflow-hidden mb-2 h-48 bg-gray-300">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-medium mb-1">{course.name}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">No hay cursos disponibles para esta especialidad</div>
        )}

        <button className="flex justify-between items-center w-full py-4  text-left text-gray-800">
          <span>Ver todos los cursos</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ViewSpecialtyDetail;