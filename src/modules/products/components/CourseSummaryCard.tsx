'use client'

import Image from 'next/image'

interface CourseSummaryProps {
  price: string
  totalPrice: string
  modules: number
  hours: number
  enrolled: number
  image: string
  certificationEntity: string
  onEnroll: () => void
}

export default function CourseSummaryCard({
  price,
  totalPrice,
  modules,
  hours,
  enrolled,
  image,
  certificationEntity,
  onEnroll
}: CourseSummaryProps) {
  return (
    <aside className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-sm space-y-4">
      <Image
        src={image}
        alt="Imagen del curso"
        width={400}
        height={250}
        className="rounded-2xl object-cover w-full h-auto"
      />

      <div className="text-sm text-gray-600">
        <p className="line-through">Total: {totalPrice}</p>
        <p className="text-2xl font-semibold text-gray-900">${price} ARS</p>
      </div>

      <ul className="text-sm text-gray-700 space-y-1">
        <li>{modules} módulos actualizados</li>
        <li>{hours} horas estimadas</li>
        <li>{enrolled.toLocaleString()} profesionales inscriptos</li>
        <li>Incluye material descargable</li>
      </ul>

      <p className="text-xs text-gray-500">
        Certifica: <span className="font-medium text-gray-900">{certificationEntity}</span>
      </p>

      <button
        onClick={onEnroll}
        className="w-full py-3 rounded-full text-white font-medium bg-[#9200AD] hover:bg-[#730184] transition"
      >
        Inscribite ahora
      </button>

      <div className="text-center">
        <button className="text-sm text-gray-500 hover:underline">Contáctanos 📞</button>
      </div>
    </aside>
  )
}
