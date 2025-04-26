'use client';

import { useEffect, useState } from 'react';
import { useCourseTeachers } from '../hooks/useCourseTeachers';

interface CourseTeachersProps {
  slug: string;
}

const ITEMS_PER_PAGE = 4;

export default function CourseTeachers({ slug }: CourseTeachersProps) {
  const { data, loading, error } = useCourseTeachers(slug);
  const [page, setPage] = useState(0);

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

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentData = data.slice(start, end);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <section
        className="bg-white rounded-[38px] px-6 md:px-0 max-w-5xl py-12 space-y-8"
        id={slug === 'medicina-intensiva-amir' ? 'equipo-docente' : undefined}
      >
        <h2 className="text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A] mb-6">
          Equipo docente
        </h2>

        {/* Mobile - SOLO aplicar paginación */}
        <div className="block md:hidden space-y-6">
          {currentData.map((teacher, idx) => {
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

        {/* Desktop - NORMAL grid de 2 columnas sin paginacion */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
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

        {/* Solo mostrar paginación en MOBILE */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-10 md:hidden">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="w-8 h-8 flex items-center justify-center rounded-[20px] border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
            >
              &lt;
            </button>

            <div className="flex items-center gap-6 text-sm text-gray-700 font-medium">
              {Array.from({ length: totalPages }).map((_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer ${i === page ? 'text-black font-bold' : ''}`}
                  onClick={() => setPage(i)}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </>
  );
}
