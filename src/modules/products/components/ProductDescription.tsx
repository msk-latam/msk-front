'use client'

import React from 'react'

interface CourseDescriptionProps {
  description: string
  institutions: string[] // logos
  objectives: string[]
  highlights: string[]
}

export default function CourseDescription({
  description,
  institutions,
  objectives,
  highlights
}: CourseDescriptionProps) {
  return (
    <section className="w-full bg-white rounded-3xl shadow-md p-6 sm:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Qué es la medicina de urgencias?</h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          {institutions.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Institución ${idx + 1}`}
              className="h-12 object-contain"
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Qué aprenderás</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
          {objectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-purple-600">✓</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Desarróllate en lo importante</h3>
        <div className="flex flex-wrap gap-2">
          {highlights.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#F1F3F9] text-sm text-gray-800 rounded-full px-4 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
