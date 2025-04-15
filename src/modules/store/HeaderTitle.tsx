'use client'

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
    <div className="px-4 md:px-10 lg:px-20 py-10 max-w-screen-xl mx-auto text-white">
      <nav className="text-sm text-white/80 mb-4">
        <span className="mr-2">Tienda</span>
      
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>

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
            className="bg-white/20 text-white text-xs px-3 py-1 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  )
}
