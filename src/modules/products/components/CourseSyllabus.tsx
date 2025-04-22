// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MdOutlineTableRows } from "react-icons/md";
// import { PiHourglassLowBold } from "react-icons/pi";
// import { FaPlus,FaMinus } from "react-icons/fa6";

// interface Module {
//   title: string;
//   lessons: string[];
// }

// interface CourseSyllabusProps {
//   modules?: Module[];
// }

// export default function CourseSyllabus({
//   modules = [],
// }: CourseSyllabusProps) {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggle = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   // Si no se pasa un módulo en el prop, usar uno de ejemplo
//   const defaultModules: Module[] = [
//     {
//       title: "Módulo 1 • Atención inicial y vía aérea",
//       lessons: [
//         "Lorem ipsum dolor sit amet.",
//         "Curabitur sit amet lorem.",
//         "Fusce euismod neque ut dui cursus.",
//       ],
//     },
//     {
//       title: "Módulo 2 • Resucitación en emergencias",
//       lessons: [
//         "Nulla facilisi.",
//         "Morbi a felis a arcu maximus.",
//         "Vivamus ut leo nec risus vehicula.",
//       ],
//     },
//     {
//       title: "Módulo 3 • Emergencias cardiovasculares",
//       lessons: [
//         "Pellentesque habitant morbi tristique.",
//         "Suspendisse potenti.",
//         "Mauris non mi dictum.",
//       ],
//     },
//     {
//       title: "Módulo 4 • Emergencias respiratorias",
//       lessons: [
//         "Aliquam in lectus et dolor convallis.",
//         "Nullam euismod eros vitae dolor bibendum.",
//         "Donec imperdiet orci at metus efficitur.",
//       ],
//     },
//     {
//       title: "Módulo 5 • Trauma en la emergencia",
//       lessons: [
//         "Praesent malesuada velit sed lacus.",
//         "Curabitur ut nisl non arcu auctor cursus.",
//         "Sed et ante nisi.",
//       ],
//     },
//     {
//       title: "Módulo 6 • Emergencias neurológicas",
//       lessons: [
//         "Quisque tempus lectus quis arcu tincidunt.",
//         "Vestibulum ante ipsum primis.",
//         "Mauris luctus dui vel elit tempus.",
//       ],
//     },
//     {
//       title: "Módulo 7 • Emergencias renales e hidroelectrolíticas",
//       lessons: [
//         "Cras eget felis nec ligula vehicula.",
//         "Aliquam erat volutpat.",
//         "Fusce aliquam orci a elit laoreet.",
//       ],
//     },
//     {
//       title: "Módulo 8 • Sepsis y emergencias infecciosas",
//       lessons: [
//         "Sed scelerisque magna eget urna vulputate.",
//         "Mauris sollicitudin nisi eget dolor.",
//       ],
//     },
//     {
//       title: "Módulo 9 • Emergencias abdominales y pélvicas",
//       lessons: [
//         "Aliquam venenatis ligula eget turpis dapibus.",
//         "Curabitur consectetur mi a magna tincidunt.",
//       ],
//     },
//     {
//       title: "Módulo 10 • Emergencias oncohematológicas y alérgicas",
//       lessons: [
//         "Phasellus tristique metus at quam tincidunt.",
//         "Etiam pharetra dui sit amet turpis tincidunt.",
//       ],
//     },
//     {
//       title: "Módulo 11 • Emergencias endocrinometabólicas",
//       lessons: [
//         "In hac habitasse platea dictumst.",
//         "Fusce consectetur lorem vel ipsum pharetra.",
//       ],
//     },
//     {
//       title: "Módulo 12 • Emergencias toxicologías y psiquiátricas",
//       lessons: [
//         "Duis condimentum justo id odio vestibulum.",
//         "Nullam scelerisque risus ac magna viverra.",
//       ],
//     },
//     {
//       title: "Módulo 13 • Módulo adicional. COVID-19: abordaje integral",
//       lessons: ["Nulla facilisi.", "Donec sollicitudin dui a neque fermentum."],
//     },
//     {
//       title: "Módulo 14 • Módulo adicional. Desastres",
//       lessons: [
//         "Cras aliquet dui vitae nulla pretium.",
//         "Suspendisse mollis elit id arcu lacinia.",
//       ],
//     },
//     {
//       title: "Módulo 15 • Podcast EmergenCast",
//       lessons: [
//         "Etiam eget libero at velit varius viverra.",
//         "Donec in tempus ipsum.",
//       ],
//     },
//     {
//       title: "Módulo 16 • Infografías: protocolos de actuación",
//       lessons: [
//         "Sed gravida mauris eget augue laoreet.",
//         "Pellentesque ut ipsum ac lorem venenatis.",
//       ],
//     },
//   ];

//   // Si no se pasó `modules`, usamos los valores por defecto
//   const modulesToDisplay = modules.length ? modules : defaultModules;

//   return (
//     <section className="bg-white rounded-2xl space-y-6">
//       {/* Título y duración */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-black">Qué temas verás</h2>
//       </div>

//       {/* Botón para descargar plan de estudios */}
//       <div className="flex justify-between items-center md:flex-row flex-col gap-6">
//         <div className="flex gap-3 text-sm text-[#6474A6] flex-row">
//             <MdOutlineTableRows className="text-[#6474A6] my-auto" />
//           <p className="my-auto">
//             16 módulos
//           </p>
//             <PiHourglassLowBold  className="text-[#6474A6] my-auto" />
//           <p className="my-auto">
//             600 horas estimadas
//           </p>
//         </div>

//         <div className="text-right w-full md:w-auto">
//           <button className="md:w-[289px] w-full h-[52px] mt-2 md:py-[14px] md:px-[24px] px-5 text-sm text-black-600 border border-black-600 rounded-[38px] flex items-center justify-center gap-2">
//             Descargar plan de estudios
//             <img
//               src="/images/productpage/download.png"
//               alt="Descargar"
//               className="w-4 h-4"
//             />
//           </button>
//         </div>
//       </div>

//       {/* Módulos */}
//       <div className="space-y-3 bg-[#F7F9FF] rounded-[30px]">
//         {modulesToDisplay.map((module, index) => (
//           <div
//             key={index}
//             className="w-full h-auto border-b px-6 py-4 flex flex-col justify-start items-start"
//           >
//             <button
//               className="w-full text-left font-medium text-[#29324f] flex justify-between items-center"
//               onClick={() => toggle(index)}
//             >
//               <span>{module.title}</span>
//               <span>{openIndex === index ? <FaMinus className="text-[#29324f]"/> : <FaPlus className="text-[#29324f]"/>}</span>
//             </button>

//             {/* Animación de expansión usando framer-motion */}
//             <AnimatePresence initial={false}>
//               {openIndex === index && (
//                 <motion.div
//                   key="content"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.5, ease: "easeInOut" }}
//                   className="overflow-hidden pb-6 pr-2 mt-2"
//                 >
//                   <ul className="bg-gray-50 px-6 py-2 text-sm text-[#6474A6] space-y-1">
//                     {module.lessons.map((lesson, idx) => (
//                       <li key={idx}>• {lesson}</li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// 'use client';

// import { useCourseSyllabus } from '../hooks/useCourseSyllabus';
// // import { Loader } from '@/components/ui/loader'; // si tenés un loader custom
// import { Download } from 'lucide-react';

// interface CourseSyllabusProps {
//   slug: string;
// }
// function fixBrokenHtml(html: string) {
//   // Corrección mínima de etiquetas comunes mal cerradas
//   return html
//     .replace(/<\/ul><\/li>/g, '</li></ul>')
//     .replace(/<\/li><\/li>/g, '</li>')
//     .replace(/<li><\/ul>/g, '</li></ul>')
//     .replace(/<ul>\s*<\/ul>/g, '') // elimina listas vacías
//     .trim();
// }

// export function CourseSyllabus({ slug }: CourseSyllabusProps) {
//   const { loading, error, syllabus } = useCourseSyllabus(slug);

//   // if (loading) return <Loader />;
//   if (loading) return 'Loading..'
//   if (error || !syllabus) return <p className="text-red-500">{error}</p>;

//   return (
//     <section className="py-12 md:py-24">
//       <div className="container max-w-4xl space-y-8">
//         <h2 className="text-3xl font-bold tracking-tight">Plan de estudio</h2>

//         <div className="text-lg text-muted-foreground">
//           <p>Este curso tiene una carga horaria de {syllabus.hours} horas.</p>
//           {syllabus.fileUrl && (
//             <a
//               href={syllabus.fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-2 inline-flex items-center gap-2 text-primary underline hover:opacity-80"
//             >
//               <Download className="w-4 h-4" />
//               Descargar plan de estudio ({syllabus.fileTitle})
//             </a>
//           )}
//         </div>

//         <div className="space-y-6">
//           {syllabus.modules.map((mod, idx) => (
//             <div key={idx} className="border rounded-xl p-4">
//               <h3 className="text-xl font-semibold mb-2">{mod.title}</h3>
//               <div
//                 className="text-muted-foreground prose max-w-none"
//                 dangerouslySetInnerHTML={{
//                   __html: fixBrokenHtml(mod.content),
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineTableRows } from 'react-icons/md';
import { PiHourglassLowBold } from 'react-icons/pi';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Download } from 'lucide-react';

import { useCourseSyllabus } from '../hooks/useCourseSyllabus';
// import { Loader } from '@/components/ui/loader';

interface CourseSyllabusProps {
  slug: string;
}

export default function CourseSyllabus({ slug }: CourseSyllabusProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { syllabus, loading, error } = useCourseSyllabus(slug);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // if (loading) return <Loader />;
  if (loading) return 'Loading';

  if (error || !syllabus) return <p className="text-red-500">{error}</p>;
  function fixBrokenHtml(html: string) {
    // Corrección mínima de etiquetas comunes mal cerradas
    return html
      .replace(/<\/ul><\/li>/g, '</li></ul>')
      .replace(/<\/li><\/li>/g, '</li>')
      .replace(/<li><\/ul>/g, '</li></ul>')
      .replace(/<ul>\s*<\/ul>/g, '') // elimina listas vacías
      .trim();
  }
  return (
    <section className="bg-white rounded-2xl space-y-6">
      {/* Título y duración */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black">Qué temas verás</h2>
      </div>

      {/* Botón para descargar plan de estudios */}
      <div className="flex justify-between items-center md:flex-row flex-col gap-6">
        <div className="flex gap-3 text-sm text-[#6474A6] flex-row">
          <MdOutlineTableRows className="text-[#6474A6] my-auto" />
          <p className="my-auto">{syllabus.modules.length} módulos</p>
          <PiHourglassLowBold className="text-[#6474A6] my-auto" />
          <p className="my-auto">{syllabus.hours} horas estimadas</p>
        </div>

        {syllabus.fileUrl && (
          <div className="text-right w-full md:w-auto">
            <a
              href={syllabus.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-[289px] w-full h-[52px] mt-2 md:py-[14px] md:px-[24px] px-5 text-sm text-black-600 border border-black-600 rounded-[38px] flex items-center justify-center gap-2"
            >
              Descargar plan de estudios
              <Download className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Módulos */}
      <div className="space-y-3 bg-[#F7F9FF] rounded-[30px]">
        {syllabus.modules.map((module, index) => (
          <div
            key={index}
            className="w-full h-auto border-b px-6 py-4 flex flex-col justify-start items-start"
          >
            <button
              className="w-full text-left font-medium text-[#29324f] flex justify-between items-center"
              onClick={() => toggle(index)}
            >
              <span>{module.title}</span>
              <span>
                {openIndex === index ? (
                  <FaMinus className="text-[#29324f]" />
                ) : (
                  <FaPlus className="text-[#29324f]" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden pb-6 pr-2 mt-2"
                >

                  {/* Renderizado del contenido HTML corregido */}
                  <div
                    className="text-muted-foreground prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: fixBrokenHtml(module.content),
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
