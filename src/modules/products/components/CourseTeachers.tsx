// 'use client'

// interface Teacher {
//   name: string
//   title: string
//   image: string
//   bioLink?: string
// }

// interface CourseTeachersProps {
//   teachers?: Teacher[]
// }

// const mockTeachers: Teacher[] = [
//   {
//     name: 'Dr. Sergio Butman',
//     title: 'Director médico de M&S Knowledge. Médico (UBA). Autor del curso de Medicina de urgencia',
//     image: 'https://randomuser.me/api/portraits/men/32.jpg',
//     bioLink: '#',
//   },
//   {
//     name: 'Dr. Maximiliano Roberto Guerrero',
//     title: 'Coordinador del curso',
//     image: 'https://randomuser.me/api/portraits/men/45.jpg',
//     bioLink: '#',
//   },
//   {
//     name: 'Álvarez-Sala Walther, Luis Antonio',
//     title: 'Coordinador del curso',
//     image: 'https://randomuser.me/api/portraits/men/55.jpg',
//     bioLink: '#',
//   },
//   {
//     name: 'Dra. Teresa Aldamiz-Echevarría Lois',
//     title: 'Docente del curso',
//     image: 'https://randomuser.me/api/portraits/women/42.jpg',
//     bioLink: '#',
//   },
// ]

// export default function CourseTeachers({ teachers = mockTeachers }: CourseTeachersProps) {
//   return (
//     <section className="bg-white rounded-2xl p-6 md:p-10">
//       <h2 className="text-2xl font-semibold mb-6">Equipo docente</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {teachers.map((teacher, idx) => (
//           <div key={idx} className="flex items-start gap-4">
//             <img
//               src={teacher.image}
//               alt={teacher.name}
//               className="w-24 h-24 rounded-xl object-cover"
//             />
//             <div className="flex flex-col">
//               <p className="font-medium font-inter text-gray-900">{teacher.name}</p>
//               <p className="text-sm font-inter text-gray-600">{teacher.title}</p>
//               {teacher.bioLink && (
//                 <a
//                   href={teacher.bioLink}
//                   className="text-purple-600 text-sm mt-1 hover:underline"
//                 >
//                   Ver biografía
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Paginación (visual) */}
//       <div className="flex justify-center items-center gap-4 mt-10">
//         <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
//           &lt;
//         </button>
//         <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
//           <span className="text-black font-bold">01</span>
//           <span>02</span>
//           <span>03</span>
//           <span>04</span>
//         </div>
//         <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
//           &gt;
//         </button>
//       </div>
//     </section>
//   )
// }




'use client';

import { useEffect } from 'react';
import { useCourseTeachers } from '../hooks/useCourseTeachers';

interface CourseTeachersProps {
  slug: string;
}

export default function CourseTeachers({ slug }: CourseTeachersProps) {
  const { data, loading, error } = useCourseTeachers(slug);

  useEffect(() => {
    if (!loading && data?.length && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#equipo-docente") {
        const el = document.getElementById('equipo-docente');
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  }, [loading, data]);

  if (loading) {
    return (
      <section className="bg-white rounded-[38px] px-6 md:px-0 max-w-5xl mx-auto py-12 space-y-8">
        <h2 className="text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A] mb-6">
          Equipo docente
        </h2>
        <p>Cargando equipo docente...</p>
      </section>
    );
  }

  if (error || !data || data.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <section
        className="bg-white rounded-[38px] px-6 md:px-0 max-w-5xl  py-12 space-y-8"
        id={slug === 'medicina-intensiva-amir' ? 'equipo-docente' : undefined}
      >
        <h2 className="text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A] mb-6">
          Equipo docente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((teacher, idx) => {
            const name = teacher.name ?? 'Docente sin nombre';
            const title = teacher.description ?? 'Sin descripción disponible';
            const image =
              typeof teacher.image === 'string' && teacher.image !== ''
                ? teacher.image
                : 'https://wp.msklatam.com/wp-content/themes/oceano2/assets/media/user-default.png';
            const bioLink = teacher.link || null;

            return (
              <div key={idx} className="flex items-start gap-4">
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded-[24px] object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-raleway font-semibold text-[#1A1A1A]">{name}</p>
                  <p className="text-sm font-inter font-normal text-[#5A5F67]">{title}</p>
                  {bioLink && (
                    <a
                      href={bioLink}
                      className="text-[#9200AD] text-sm mt-1 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver biografía
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {data.length > 4 && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button className="w-8 h-8 flex items-center justify-center rounded-[20px] border border-gray-300 text-gray-600 hover:bg-gray-100">
              &lt;
            </button>
            <div className="flex items-center gap-6 text-sm text-gray-700 font-medium">
              <span className="text-black font-bold">01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">
              &gt;
            </button>
          </div>
        )}
      </section>
    </>
  );
}

