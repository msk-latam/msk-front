// 'use client'

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface CourseDescriptionProps {
//   description?: string;
// }

// export default function CourseDescription({ description = '' }: CourseDescriptionProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Establecer una longitud máxima para la descripción antes de mostrar "Leer más"
//   const MAX_LENGTH = 600;

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Si la descripción es más larga que MAX_LENGTH, agregar el "Leer más"
//   const displayDescription = isExpanded
//     ? description
//     : description.length > MAX_LENGTH
//     ? description.slice(0, MAX_LENGTH) + '...'
//     : description;

//   return (
//     <section className="bg-white rounded-[38px] md:pt-7 md:pb-3">
//       <h1 className="text-2xl md:text-[34px] font-raleway font-medium mb-6 text-[#1A1A1A]">Qué es la medicina de urgencias</h1>

//       {/* Texto con gradiente solo en el final truncado */}
//       <article className="text-[#1A1A1A] text-sm font-inter font-light text-[16px] leading-[161%] relative">
//         <p className="m-0">
//           {displayDescription}
//         </p>

//         {/* Gradiente aplicado solo al final truncado */}
//         {description.length > MAX_LENGTH && !isExpanded && (
//           <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
//         )}
//       </article>

//       {/* Mostrar el botón "Leer más" si la descripción es larga */}
//       {description.length > MAX_LENGTH && (
//         <motion.div
//           className="flex justify-center mt-2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//         >
//           <motion.button
//             onClick={handleToggle}
//             className="text-[#9200AD] text-sm flex items-center gap-2"
//             whileHover={{ scale: 1.1 }}
//             transition={{ duration: 1, ease: 'easeOut' }}
//           >
//             {isExpanded ? 'Leer menos' : 'Leer más'}
//             <motion.svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="bi bi-chevron-down"
//               viewBox="0 0 16 16"
//               animate={{ rotate: isExpanded ? 180 : 0 }}
//               transition={{ duration: 0.4, ease: 'easeOut' }}
//             >
//               <path d="M1 4.5a.5.5 0 0 1 .708-.708L8 9.293l6.292-5.5A.5.5 0 0 1 15 4.5l-7 6a.5.5 0 0 1-.708 0l-7-6z" />
//             </motion.svg>
//           </motion.button>
//         </motion.div>
//       )}
//     </section>
//   );
// }

// // Puedes usar esta descripción larga para probar
// CourseDescription.defaultProps = {
//   description:
//     'La medicina de urgencias o emergentología se centra en la detección, el diagnóstico, la atención inicial, la prevención de complicaciones y la ubicación de los pacientes que presentan enfermedades agudas y requieren atención médica inmediata. Este curso te preparará para abordar los diferentes escenarios que se presentan en los servicios de urgencias, incluyendo situaciones críticas como traumas, enfermedades cardiovasculares, respiratorias y neurológicas, entre otras. Aprenderás a gestionar los primeros momentos en que un paciente llega al servicio de urgencias, asegurando que reciban la atención adecuada de manera oportuna. Además, se enseñarán protocolos de actuación para optimizar la respuesta ante emergencias médicas, mejorando la calidad del servicio y reduciendo los riesgos de complicaciones graves. Este curso es ideal para profesionales de la salud que deseen especializarse en la atención de urgencias y emergencias.'
// }


'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import{ useCourseDescription } from '../hooks/useCourseDescription';

interface CourseDescriptionProps {
  courseId: string | number;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export default function CourseDescription({ courseId }: CourseDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, loading, error } = useCourseDescription(courseId);

  const MAX_LENGTH = 600;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const rawDescription = data?.content ?? '';
  const description = stripHtmlTags(rawDescription);
  const title = data?.title ?? 'Descripción del curso';

  const displayDescription = isExpanded
    ? description
    : description.length > MAX_LENGTH
    ? description.slice(0, MAX_LENGTH) + '...'
    : description;

  return (
    <section className="bg-white rounded-[38px] md:pt-7 md:pb-3">
      <h1 className="text-2xl md:text-[34px] font-raleway font-medium mb-6 text-[#1A1A1A]">
        {loading ? 'Cargando...' : error ? 'Error al cargar' : title}
      </h1>

      <article className="text-[#1A1A1A] text-sm font-inter font-light text-[16px] leading-[161%] relative">
        {loading ? (
          "Cargando descripción...") : error ? (
          <p>{error}</p>
        ) : (
          <>
            <p className="m-0">
              {displayDescription}
            </p>

            {description.length > MAX_LENGTH && !isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
          </>
        )}
      </article>

      {!loading && !error && description.length > MAX_LENGTH && (
        <motion.div
          className="flex justify-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.button
            onClick={handleToggle}
            className="text-[#9200AD] text-sm flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {isExpanded ? 'Leer menos' : 'Leer más'}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <path d="M1 4.5a.5.5 0 0 1 .708-.708L8 9.293l6.292-5.5A.5.5 0 0 1 15 4.5l-7 6a.5.5 0 0 1-.708 0l-7-6z" />
            </motion.svg>
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
