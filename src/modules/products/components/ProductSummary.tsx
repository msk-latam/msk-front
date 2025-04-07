'use client'

interface ProductSummaryProps {
  price?: string
  certification?: boolean
  duration?: string
  modules?: number
  enrolled?: number
}

export default function ProductSummary({
  price = "$146.145 ARS",
  certification = true,
  duration = "600 horas estimadas",
  modules = 16,
  enrolled = 2000,
}: ProductSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 md:p-8 sticky top-10">
      <img
        src="/images/course-placeholder.jpg"
        alt="Curso"
        className="rounded-xl w-full h-48 object-cover mb-6"
      />

      <p className="text-gray-500 line-through text-sm">Total: $878.874 ARS</p>
      <p className="text-2xl font-bold text-purple-700 mb-4">{price}</p>

      <ul className="text-sm text-gray-700 space-y-2 mb-4">
        <li>{modules} módulos actualizados</li>
        <li>{duration}</li>
        <li>{enrolled}+ profesionales inscriptos</li>
        <li>{certification ? 'Incluye material descargable' : 'Sin material adicional'}</li>
      </ul>

      <button className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-full font-medium transition">
        Inscribite ahora
      </button>

      <button className="w-full mt-2 py-2 text-sm text-purple-600 border border-purple-600 rounded-full">
        Contactanos
      </button>
    </div>
  )
}
