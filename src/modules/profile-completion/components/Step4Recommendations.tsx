'use client'

import React from 'react'
import ProgressIndicator from './ProgressIndicator'

interface Step4RecommendationsProps {
  data: Record<string, any>
  onBack: () => void
}

export default function Step4Recommendations({ data, onBack }: Step4RecommendationsProps) {
  const { profession, specialty, country, interests } = data

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 p-4 sm:p-20 z-[10] relative overflow-visible max-w-[1600px]">
      <section className="w-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
        <button
          onClick={onBack}
          className="hidden sm:flex absolute top-6 left-6 items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <svg
            width="6"
            height="12"
            viewBox="0 0 6 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1L1 6L5 11"
              stroke="#1F2937"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold pb-5 text-gray-900">Recomendaciones personalizadas</h2>
          <ProgressIndicator currentStep={4} />
          <p className="text-sm text-gray-500 mt-1">Basado en tus respuestas, te sugerimos estos cursos</p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Ejemplo de cursos recomendados (esto luego se puede conectar con backend) */}
          {interests?.map((interest: string, index: number) => (
            <div key={index} className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Curso relacionado a {interest}</h3>
              <p className="text-sm text-gray-600">Un curso especialmente diseñado para {profession} con interés en {interest}.</p>
              <button className="mt-4 w-full py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition">
                Ver curso
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
