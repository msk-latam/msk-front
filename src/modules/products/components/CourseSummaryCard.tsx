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
    <aside className="bg-white rounded-[38px] shadow p-6 w-full space-y-4">
      <Image
        src={image}
        alt="Imagen del curso"
        width={400}
        height={250}
        className="rounded-2xl object-cover w-full h-auto"
      />

      <div className="text-sm text-gray-600">
        <p className="line-through">Total: {totalPrice}</p>
        <p className="text-2xl font-bold text-purple-700">${price} ARS</p>
      </div>

      <ul className="text-sm text-gray-700 space-y-3">
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/world.svg" alt="" className="w-4 h-4" />
          Modalidad 100% a distancia
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/modules.svg" alt="" className="w-4 h-4" />
          {modules} módulos actualizados
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/hourglass.svg" alt="" className="w-4 h-4" />
          {hours} horas estimadas
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/person.svg" alt="" className="w-4 h-4" />
          {enrolled.toLocaleString()} profesionales inscriptos
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/download.svg" alt="" className="w-4 h-4" />
          Incluye material descargable
        </li>
      </ul>

      <p className="text-xs text-gray-500">
        Certifica:<br />
        <span className="font-medium text-gray-900">{certificationEntity}</span>
      </p>

      <div className="flex items-center justify-center mb-2">
        <img src="/images/productpage/certificate.svg" alt="Certifica" className="w-20" />
      </div>

      <button
        onClick={onEnroll}
        className="w-full py-3 rounded-full text-white font-medium bg-[#9200AD] hover:bg-[#730184] transition"
      >
        Inscribite ahora
      </button>

      <div className="text-center">
        <button className="text-sm text-purple-600 border border-purple-600 w-full py-3 rounded-full hover:bg-purple-50">
          Contáctanos
        </button>
      </div>
    </aside>
  )
}
