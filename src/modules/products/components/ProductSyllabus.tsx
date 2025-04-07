'use client'

import { useState } from 'react'

interface Module {
  title: string
  lessons: string[]
}

interface ProductSyllabusProps {
  modules?: Module[]
}

export default function ProductSyllabus({ modules = [] }: ProductSyllabusProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white rounded-2xl shadow p-6 md:p-10 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Qué temas verás</h2>

      <div className="space-y-3">
        {modules.map((module, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="w-full text-left px-4 py-3 font-medium text-purple-800 flex justify-between items-center"
              onClick={() => toggle(index)}
            >
              <span>{module.title}</span>
              <span>{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <ul className="bg-gray-50 px-6 pb-4 text-sm text-gray-700 space-y-1">
                {module.lessons.map((lesson, idx) => (
                  <li key={idx}>• {lesson}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button className="text-purple-600 text-sm hover:underline flex items-center gap-1">
          Descargar plan de estudios
          <img src="/icons/download.svg" alt="Descargar" className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
