'use client';

import { ChevronRight } from 'react-feather';
import { RiHome6Line } from 'react-icons/ri';
import { useCourseHeader } from '../hooks/useCourseHeader';
import Link from 'next/link';
import SkeletonCourseHeader from '../skeletons/SkeletonCourseHeader'; // Importa el Skeleton

interface CourseHeaderProps {
  slug: string;
}

export default function CourseHeader({ slug }: CourseHeaderProps) {
  const { data, loading, error } = useCourseHeader(slug);

  if (loading) {
    return <SkeletonCourseHeader />; // Usa el Skeleton cuando los datos están cargando
  }

  if (error || !data) {
    return (
      <div className="px-4 md:px-10 lg:px-20 max-w-[1300px] mx-auto h-96 flex justify-center items-center text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Este curso actualmente no tiene información.</h1>
      </div>
    );
  }

  const { title, has_certificate, categories } = data;

  return (
    <div className="px-4 overflow-visible max-w-[1600px] md:px-14 mx-auto h-96 flex md:flex-col md:justify-end md:items-start flex-row flex-wrap justify-center items-center text-white">
      <div className="text-sm text-white md:mb-20 md:mt-0 my-20 w-full">
        {/* Breadcrumbs */}
        <nav className="flex overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-full gap-1 font-raleway font-medium mb-4">
          <Link href="/" className="my-auto shrink-0">
            <RiHome6Line className="text-white my-auto" />
          </Link>
          <span className="shrink-0"><ChevronRight /></span>

          {/* Tienda ahora es Link */}
          <Link href="/tienda" className="truncate my-auto shrink-0 hover:underline">
            <span className="block md:hidden">...</span>
            <span className="hidden md:block">Tienda</span>
          </Link>

          {categories.map((cat) => (
            <span key={cat.term_id} className="flex items-center">
              <span className="shrink-0"><ChevronRight /></span>
              <Link
                href={`/categoria/${cat.slug}`}
                className="truncate my-auto shrink-0 hover:underline"
              >
                {cat.name}
              </Link>
            </span>
          ))}

          {/* Último: el título del curso en bold */}
          <span className="shrink-0"><ChevronRight /></span>
          <span className="truncate font-bold my-auto">{title}</span>
        </nav>

        {/* Título principal */}
        <h1 className="md:text-[51px] text-3xl text-white font-bold text-center md:text-left mt-5 mb-3">
          {title}
        </h1>

        {/* Certificación */}
        {has_certificate && (
          <p className="flex items-center gap-2 text-sm md:text-[16px] md:mt-4 font-raleway font-semibold text-white md:justify-normal justify-center mb-4">
            <img src="/icons/certificado.svg" className="w-4 h-4" alt="certificado" />
            Con certificación
          </p>
        )}

        {/* Etiquetas de categorías */}
        <div className="flex flex-wrap items-center md:items-start justify-center md:justify-normal gap-2">
          {categories.map((cat) => (
            <span
              key={cat.term_id}
              className="bg-black/20 text-white text-xs font-inter font-normal px-5 py-2 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
