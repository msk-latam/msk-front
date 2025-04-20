
'use client'

interface Learning {
  text: string
}

interface ProductLearningProps {
  learning?: Learning[]
}

export default function ProductLearning({
  learning = [
    { text: 'Manejar técnicas avanzadas en emergencias críticas' },
    { text: 'Optimizar la toma de decisiones en situaciones de alta complejidad' },
    { text: 'Aplicar protocolos internacionales para la seguridad del paciente en urgencias' },
    { text: 'Interpretar estudios diagnósticos para intervenciones precisas en emergencias' },
  ],
}: ProductLearningProps) {
  // Divide los ítems en dos columnas de forma balanceada
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

