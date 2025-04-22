'use client'

import Image from 'next/image'
import { useCourseInstitutions } from '../hooks/useCourseInstitutions'

interface CourseInstitutionProps {
  courseId: string | number
}

export default function CourseInstitution({ courseId }: CourseInstitutionProps) {
  const { data: institutions, loading, error } = useCourseInstitutions(courseId)

  return (
    <section className="md:py-3 text-left">
      <h2 className="text-xl md:text-2xl font-medium mb-6 w-fit">
        Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
      </h2>

      {/* Scroll horizontal en mobile */}
      <div className="overflow-x-auto md:overflow-visible scrollbar-none">
        <div className="flex gap-4 md:flex-row md:justify-center flex-nowrap px-2 md:px-6">
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
