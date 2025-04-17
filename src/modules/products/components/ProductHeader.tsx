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
    <div className="px-4 md:px-10 lg:px-20 overflow-visible max-w-[1400px] mx-auto h-96 flex md:flex-col md:justify-end md:items-start flex-row flex-wrap justify-center items-center text-white">

      <div className="text-sm text-white/80 md:mb-20 md:mt-0 my-20 w-full">
      <nav className="flex overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-full">
  <span className="my-auto shrink-0"><RiHome6Line className="text-white my-auto"/></span>
  <span className="shrink-0"><ChevronRight/></span>
  <span className="truncate  my-auto shrink-0">Tienda</span>
  <span className="shrink-0"><ChevronRight/></span>
  <span className="truncate  my-auto shrink-0">Medicina general</span>
  <span className="shrink-0"><ChevronRight/></span>
  <span className="truncate text-white font-medium my-auto">{title}</span>
</nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-center md:text-left mt-5 mb-3">{title}</h1>

      {certification && (
        <p className="flex items-center gap-2 text-sm text-white/90 md:justify-normal justify-center mb-4">
          <img src="/icons/certificado.svg" className="w-4 h-4" alt="certificado" />
          Con certificación
        </p>
      )}

      <div className="flex flex-wrap items-center md:items-start justify-center md:justify-normal gap-2">
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
