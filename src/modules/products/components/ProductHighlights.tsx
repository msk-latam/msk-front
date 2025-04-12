'use client'

interface Highlight {
  title: string
  description: string
}

interface ProductHighlightsProps {
  highlights?: Highlight[]
}

export default function ProductHighlights({ highlights = [] }: ProductHighlightsProps) {
  return (
    <section className="bg-white rounded-2xl  md:p-10">
      <h2 className="text-2xl font-semibold mb-6">Qué aprenderás</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <img src="/icons/check-circle.svg" alt="check" className="w-5 h-5 mt-1" />
            <div>
              <p className="text-gray-900 font-medium text-sm mb-1">{item.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
