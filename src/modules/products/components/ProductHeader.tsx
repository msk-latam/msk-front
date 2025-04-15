'use client'
import { ChevronRight } from "react-feather";
import { RiHome6Line } from "react-icons/ri";


interface ProductHeaderProps {
  title?: string
  categories?: string[]
  certification?: boolean
}

export default function ProductHeader({
  title = "Curso superior de emergentología",
  categories = ["Emergentología", "Medicina familiar", "Medicina general"],
  certification = true,
}: ProductHeaderProps) {
  return (
    <div className="px-4 md:px-10 lg:px-20 overflow-visible max-w-[1400px] mx-auto h-96 flex flex-col justify-end text-white">
      <div className="text-sm text-white/80 mb-20">
      <nav className="flex flex-row">
      <span className="my-auto"><RiHome6Line className="text-white my-auto"/></span>
      <span className=""><ChevronRight/></span>
        <span className="my-auto">Tienda</span>
        <span className=""><ChevronRight/></span>
        <span className="my-auto">Medicina general</span>
        <span className=""><ChevronRight/></span>
        <span className="text-white font-medium my-auto">{title}</span>
        </nav>
      <h1 className="text-3xl sm:text-4xl font-bold mt-5 mb-3">{title}</h1>

      {certification && (
        <p className="flex items-center gap-2 text-sm text-white/90 mb-4">
          <img src="/icons/certificado.svg" className="w-4 h-4" alt="certificado" />
          Con certificación
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="bg-black/20 text-white text-xs px-4 py-2 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
            </div>
    </div>
  )
}
