'use client'

interface Teacher {
  name: string
  title: string
  image: string
  bioLink?: string
}

interface ProductTeachersProps {
  teachers?: Teacher[]
}

export default function ProductTeachers({ teachers = [] }: ProductTeachersProps) {
  return (
    <section className="bg-white rounded-2xl shadow p-6 md:p-10">
      <h2 className="text-2xl font-semibold mb-6">Equipo docente</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="font-medium text-gray-900 text-sm">{teacher.name}</p>
              <p className="text-sm text-gray-600">{teacher.title}</p>
              {teacher.bioLink && (
                <a href={teacher.bioLink} className="text-purple-600 text-xs hover:underline">
                  Ver biografía
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
