'use client'

interface ProductSupportFormProps {
  name?: string
  email?: string
  phone?: string
  profession?: string
  specialty?: string
  message?: string
}

export default function ProductSupportForm(props: ProductSupportFormProps) {
  return (
    <div className="bg-white rounded-2xl p-6  space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        ¿Necesitás ayuda para elegir tu curso?
      </h3>
      <p className="text-sm text-gray-600">
        Nuestro equipo de especialistas en educación médica está listo para asesorarte. No dudes en escribirnos.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Ingresar nombre" className="border rounded-md px-3 py-2" />
        <input type="text" placeholder="Ingresar apellido" className="border rounded-md px-3 py-2" />

        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2 w-20">
            <option value="+54">+54</option>
            <option value="+52">+52</option>
          </select>
          <input type="tel" placeholder="Ingresar teléfono" className="border rounded-md px-3 py-2 w-full" />
        </div>
        <input type="email" placeholder="Ingresar email" className="border rounded-md px-3 py-2" />

        <select className="border rounded-md px-3 py-2">
          <option value="">Seleccionar profesión</option>
        </select>
        <select className="border rounded-md px-3 py-2">
          <option value="">Seleccionar especialidad</option>
        </select>

        <textarea
          placeholder="Mensaje"
          className="border rounded-md px-3 py-2 col-span-1 md:col-span-2"
          rows={4}
        ></textarea>

        <div className="col-span-1 md:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="privacy" />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            Acepto los <a href="#" className="text-purple-600 underline">términos y condiciones</a>
          </label>
        </div>

        <div className="col-span-1 md:col-span-2 text-right">
          <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full">
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
