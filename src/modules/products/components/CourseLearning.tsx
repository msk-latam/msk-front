'use client'

import { useCourseLearning } from '../hooks/useCourseLearning'

interface CourseLearningProps {
  slug: string
}

export default function CourseLearning({ slug }: CourseLearningProps) {
  const { data, loading, error } = useCourseLearning(slug)

  // En caso de error o loading, mostramos un fallback
  if (loading) return <p className="p-5">Cargando contenido...</p>
  if (error || !data) return <p className="p-5">No se pudo cargar el contenido.</p>

  const learning = data.map((item) => ({ text: item.msk_learning_content }))

  const leftColumn = learning.filter((_, idx) => idx % 2 === 0)
  const rightColumn = learning.filter((_, idx) => idx % 2 !== 0)

  return (
    <section className="bg-white p-5 md:px-0 md:py-3">
      <h2 className="text-3xl font-medium md:text-[34px] mb-6 font-raleway text-gray-900">Qué aprenderás</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {leftColumn.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1">
                <svg
                  className="w-5 h-5 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-gray-900 text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {rightColumn.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1">
                <svg
                  className="w-5 h-5 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-gray-900 text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
