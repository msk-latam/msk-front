'use client'

import { useCourseLearning } from '../hooks/useCourseLearning'

interface CourseLearningProps {
  slug: string
}

export default function CourseLearning({ slug }: CourseLearningProps) {
  const { data, loading, error } = useCourseLearning(slug)

  if (loading) return <p className="p-5">Cargando contenido...</p>
  if (error || !data) return null

  const learning = data.map((item) => ({ text: item.msk_learning_content }))

  const leftColumn = learning.filter((_, idx) => idx % 2 === 0)
  const rightColumn = learning.filter((_, idx) => idx % 2 !== 0)

  return (
    <section className="bg-white p-5 md:px-0 md:py-3">
      {/* Título corregido */}
      <h2 className="text-3xl font-medium md:text-[34px] mb-6 font-raleway text-[#1A1A1A]">
        Qué aprenderás
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {leftColumn.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1">
                {/* Nuevo icono de check violeta */}
                <svg
                  className="w-5 h-5 text-[#9200AD]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Texto corregido */}
              <p className="text-[#1A1A1A] font-raleway font-medium text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {rightColumn.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1">
                {/* Nuevo icono de check violeta */}
                <svg
                  className="w-5 h-5 text-[#9200AD]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Texto corregido */}
              <p className="text-[#1A1A1A] font-raleway font-medium text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
