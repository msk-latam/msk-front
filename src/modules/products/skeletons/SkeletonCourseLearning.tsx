'use client'

export default function SkeletonCourseLearning() {
  return (
    <section className="bg-white p-5 md:px-0 md:py-3">
      {/* Título */}
      <div className="bg-gray-300 h-8 w-1/2 mx-auto mb-6 animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="bg-gray-300 w-5 h-5 rounded-full animate-pulse mt-1"></div>
              <div className="bg-gray-300 h-4 w-3/4 animate-pulse mt-2"></div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="bg-gray-300 w-5 h-5 rounded-full animate-pulse mt-1"></div>
              <div className="bg-gray-300 h-4 w-3/4 animate-pulse mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
