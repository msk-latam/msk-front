'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineTableRows } from 'react-icons/md';
import { PiHourglassLowBold } from 'react-icons/pi';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Download } from 'lucide-react';

import { useCourseSyllabus } from '../hooks/useCourseSyllabus';

interface CourseSyllabusProps {
  slug: string;
}

export default function CourseSyllabus({ slug }: CourseSyllabusProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data, loading, error } = useCourseSyllabus(slug);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return null;
  if (error || !data || data.modules.length === 0) return null;

  function fixBrokenHtml(html: string) {
    return html
      .replace(/<\/ul><\/li>/g, '</li></ul>')
      .replace(/<\/li><\/li>/g, '</li>')
      .replace(/<li><\/ul>/g, '</li></ul>')
      .replace(/<ul>\s*<\/ul>/g, '')
      .trim();
  }

  return (
    <section className="w-full bg-white rounded-[38px] md:py-16 md:px-9 px-6 py-9 space-y-6">
      {/* Título */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black">Qué temas verás</h2>
      </div>

      {/* Datos y Botón */}
      <div className="flex justify-between items-center md:flex-row flex-col gap-6">
        <div className="flex gap-3 text-sm text-[#6474A6] flex-row">
          <MdOutlineTableRows className="text-[#6474A6] my-auto" />
          <p className="my-auto">{data.modules.length} módulos</p>
          <PiHourglassLowBold className="text-[#6474A6] my-auto" />
          <p className="my-auto">{data.hours} horas estimadas</p>
        </div>

        {data.study_plan_file && (
          <div className="text-right w-full md:w-auto">
            <a
              href={data.study_plan_file}
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-[289px] w-full h-[52px] mt-2 md:py-[14px] md:px-[24px] px-5 text-sm text-black-600 border border-black-600 rounded-[38px] flex items-center justify-center gap-2 hover:bg-[#F5F5F5]"
            >
              Descargar plan de estudios
              <Download className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Módulos */}
      <div className="space-y-3 bg-[#F7F9FF] rounded-[30px]">
        {data.modules.map((module, index) => (
          <div
            key={index}
            className={`w-full h-auto px-6 py-4 flex flex-col justify-start items-start ${index !== data.modules.length - 1 ? 'border-b' : ''}`}
          >
            <button
              className="w-full text-left font-raleway font-medium text-[#1A1A1A] flex justify-between items-center"
              onClick={() => toggle(index)}
            >
              <span>Módulo {index + 1} • {module.title}</span>
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
                  className="overflow-hidden pb-6 pr-2 mt-2 text-[#6474A6]"
                >
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
