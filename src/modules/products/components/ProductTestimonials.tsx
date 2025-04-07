'use client'

interface Testimonial {
  name: string
  comment: string
  image: string
}

interface ProductTestimonialsProps {
  testimonials?: Testimonial[]
}

export default function ProductTestimonials({ testimonials = [] }: ProductTestimonialsProps) {
  return (
    <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-12 px-4 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Sé parte de nuestra comunidad de profesionales</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white text-gray-900 rounded-xl p-4 shadow">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-medium text-sm">{t.name}</p>
              </div>
              <p className="text-sm text-gray-600">{t.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
