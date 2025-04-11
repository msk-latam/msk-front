'use client'

import React from 'react'

interface Step4RecommendationsProps {
  onBack: () => void
}

export default function Step4Recommendations({ onBack }: Step4RecommendationsProps) {
  const cards = [
    {
      title: 'Nutrición en oncología',
      type: ['Nutrición', 'Curso'],
      source: 'Medical & Scientific Knowledge',
      button: 'Descubrir',
      image: '/images/recomendations/nutricion-oncologia.png'
    },
    {
      title: 'Planes de nutrición para deportistas profesionales',
      type: ['Nutrición', 'Infografía'],
      source: 'Colegio de Médicos de la Prov. de Bs. As. Distrito III',
      button: 'Descargar gratis',
      image: '/images/recomendations/nutricion-deportistas.png'
    },
    {
      title: 'Cómo afecta el deporte en la nutrición',
      type: ['Nutrición', 'Blog'],
      source: 'Colegio de Médicos de la Prov. de Bs. As. Distrito III',
      button: 'Leer',
      image: '/images/recomendations/deporte-nutricion.png'
    },
    {
      title: 'Nuevas herramientas para detectar problemas de tiroides',
      type: ['Endocrinología', 'Guía profesional'],
      source: 'Colegio de Médicos de la Prov. de Bs. As. Distrito III',
      button: 'Descargar gratis',
      image: '/images/recomendations/tiroides.png'
    }
  ]

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-gradient-to-br backdrop-blur-lg">
      <div className="bg-white z-[100] rounded-3xl shadow-xl w-full max-w-6xl p-6 sm:p-10 relative mx-4 sm:mx-auto">
        <button
          onClick={onBack}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2
            className="text-[24px] font-[500] leading-[100%] text-gray-900 mb-2"
            style={{ fontFamily: 'Raleway, sans-serif', letterSpacing: '0%' }}
          >
            Ya puedes acceder a estos recursos recomendados para ti
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <div className="mb-1">
                    {card.type.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-xs inline-block mr-2 mb-1 px-2 py-1 rounded-full whitespace-nowrap ${
                          tag === 'Curso' || tag === 'Guía profesional'
                            ? 'bg-orange-100 text-orange-700'
                            : tag === 'Infografía'
                            ? 'bg-yellow-100 text-yellow-700'
                            : tag === 'Blog'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.source}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-white text-sm font-medium bg-black hover:bg-[#7A0095] whitespace-nowrap transition"
                    style={{
                      width: '180px',
                      height: '52px',
                      padding: '14px 24px',
                      borderRadius: '38px',
                      gap: '8px'
                    }}
                  >
                    {card.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
            style={{
              width: '522px',
              height: '52px',
              padding: '14px 24px',
              borderRadius: '38px',
              gap: '8px'
            }}
          >
            Ir a mi perfil
          </button>
        </div>
      </div>
    </div>
  )
}
