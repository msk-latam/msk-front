'use client'

import Image from 'next/image'
import { useCourseInstitutions } from '../hooks/useCourseInstitutions'

interface CourseInstitutionProps {
  slug: string | number
}

export default function CourseInstitution({ slug }: CourseInstitutionProps) {
  const { data: institutions, loading, error } = useCourseInstitutions(slug)

  return (
    <section className="md:py-3 text-left h-fit">
      <h2 className="text-xl md:text-2xl font-medium mb-6 w-fit">
        Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
      </h2>

      {/* Scroll horizontal en mobile */}
      <div className="overflow-x-auto md:overflow-visible scrollbar-none ">
        <div className="flex gap-4 md:flex-row md:justify-left flex-nowrap overflow-x-scroll scrollbar-none px-2 md:pr-6 md:pl-0 h-40">
          {loading && <p>Cargando instituciones...</p>}
          {error && <p>{error}</p>}
          {institutions?.map((inst) => (
            <div
              key={inst.id}
                className="bg-[#f7f9ff] rounded-xl shadow-sm p-6 h-32 flex items-center justify-center shrink-0 md:w-1/4"
              >
              <Image
                src={inst.image}
                alt={inst.title}
                width={160}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
