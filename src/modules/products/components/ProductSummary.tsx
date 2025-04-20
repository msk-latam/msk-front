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
    <div className="bg-white rounded-[38px] shadow p-6 md:p-8 sticky top-10 w-full max-w-sm">
      <img
        src="/images/productpage/course.svg"
        alt="Curso"
        className="rounded-xl w-full object-cover mb-6"
      />

      <p className="text-[#3b476c] text-[20px] font-inter font-bold">Total: $878.874 ARS</p>
      <p className="font-inter text-base">6 pagos de:</p>
      <p className="text-2xl font-bold text-[#1a1a1a] mb-4">{price}</p>

      <ul className="text-sm text-[#3b476c] space-y-3 mb-4">
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
          {duration}
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/person.svg" alt="" className="w-4 h-4" />
          {enrolled.toLocaleString()} profesionales inscriptos
        </li>
        <li className="flex items-center gap-2">
          <img src="/icons/course/summary/download.svg" alt="" className="w-4 h-4" />
          {certification ? 'Incluye material descargable' : 'Sin material adicional'}
        </li>
      </ul>

      <p className="text-xs text-gray-500 mb-2">
        Cedente<br />
        <strong className="text-[#3b476c] ">Colegio de Médicos de la Prov. de Bs. As. Distrito III</strong>
      </p>

      <div className="flex items-center justify-center mb-4">
        <img src="/images/partners/andaluza.svg" alt="Certifica" className="h-20" />
      </div>

      <button className="bg-[#9200AD] hover:bg-[#6b1679] text-white w-full py-3 rounded-full font-medium transition">
        Inscribite ahora
      </button>

      <button className="w-full mt-2 py-3 text-sm text-[#9200AD] border hover:border-bg-[#6b1679] rounded-full">
        Contáctanos
      </button>
    </div>
  )
}
