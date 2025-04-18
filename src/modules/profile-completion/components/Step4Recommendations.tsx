'use client';

import React, { useEffect } from 'react';

interface Step4RecommendationsProps {
  onBack: () => void;
  
}

export default function Step4Recommendations({ onBack}: Step4RecommendationsProps) {
  useEffect(() => {
    document.body.classList.add('step4-active');
    return () => {
      document.body.classList.remove('step4-active');
    };
  }, []);

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
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br backdrop-blur-md min-h-[100vh]  p-4 pt-[120px] sm:max-h-[80vh]  md:pt-[200px]">

      <div className="bg-white z-[9999] rounded-[30px] shadow-2xl w-full max-w-6xl relative flex flex-col md:max-h-[95vh] max-h-[95vh]  overflow-hidden">
        <button
          onClick={onBack}
          className="absolute md:top-4 top-8  right-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
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

        <div className="flex items-center md:text-center justify-between px-4 pt-6 pb-4 md:block">
        <h2
  className="text-[18px] md:text-[24px] font-[500] leading-[1.8] text-gray-900"
  style={{ fontFamily: 'Raleway, sans-serif' }}
>
  Ya puedes acceder a estos<br className="sm:hidden" /> recursos recomendados para ti
</h2>

  {/* Mover el botón de cierre aquí en mobile, pero seguir usando el absoluto para desktop */}
  <button
     onClick={onBack}
     className="absolute md:hidden md:block hidden md:top-4 top-8 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
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
</div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex bg-white border border-[#DBDDE2] rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
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
                    <h3 className="text-lg font-bold text-[#1A1A1A] font-raleway mb-1">{card.title}</h3>
                    <p className="text-sm text-[#4F5D89] font-medium font-inter">{card.source}</p>
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
        </div>

        <div className="p-4 sm:py-10 text-center">
          <button
            onClick={onBack}
            className="bg-[#9200AD] hover:scale-105 text-white font-semibold transition w-full sm:w-[522px] h-[52px] px-6 py-2 md:mb-18   mb-9 rounded-[38px]"
          >
            Ir a mi perfil
          </button>
        </div>
      </div>
    </div>
  );
}
