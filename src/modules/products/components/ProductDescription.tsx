'use client'

interface ProductDescriptionProps {
  description?: string
}

export default function ProductDescription({ description = '' }: ProductDescriptionProps) {
  return (
    <section className="bg-white rounded-2xl shadow p-6 md:p-10">
      <h2 className="text-2xl font-semibold mb-4">Qué es la medicina de urgencias</h2>
      <p className="text-gray-700 text-sm leading-relaxed">
        {description ||
          'La medicina de urgencias o emergentología se centra en la detección, el diagnóstico, la atención inicial, la prevención de complicaciones y la ubicación de los pacientes que presentan enfermedades agudas y requieren atención médica inmediata. Este curso te preparará para abordar los diferentes escenarios que se presentan en los servicios de urgencias.'}
      </p>
    </section>
  )
}
