"use client";

interface ProductSupportFormProps {
  name?: string;
  email?: string;
  phone?: string;
  profession?: string;
  specialty?: string;
  message?: string;
}

export default function ProductSupportForm(props: ProductSupportFormProps) {
  return (
    <div className="bg-white space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        ¿Necesitás ayuda para elegir tu curso?
      </h3>
      <p className="text-sm text-gray-600">
        Nuestro equipo de especialistas en educación médica está listo para
        asesorarte. No dudes en escribirnos.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD] px-3 py-2"
        />
        <input
          type="text"
          placeholder="Ingresar apellido"
          className="border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD]  px-3 py-2"
        />

        <div className="flex gap-2 rounded-[16px] border border-gray-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#9200AD] focus-within:border-[#9200AD] ">
          <select className="text-gray-600 rounded-[16px] border-0 focus:outline-none focus:ring-0 px-3 py-2 w-20 gap-1">
            <option value="+54">+54</option>
            <option value="+52">+52</option>
          </select>
          <input
            type="tel"
            placeholder="Ingresar teléfono"
            className="rounded-[16px] border-0 focus:outline-none focus:ring-0 px-3 py-2 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Ingresar email"
          className="border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD]  px-3 py-2"
        />

        <select className="text-gray-600 border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD]  px-3 py-2">
          <option value="">Seleccionar profesión</option>
        </select>
        <select className="text-gray-600 border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD]  px-3 py-2">
          <option value="">Seleccionar especialidad</option>
        </select>

        <textarea
          placeholder="Mensaje"
          className="border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD]  px-3 py-2 col-span-1 md:col-span-2"
          rows={4}
        ></textarea>

        <div className="col-span-1 md:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="privacy"
            className="accent-[#9200AD] border rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD] "
          />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            Acepto los{" "}
            <a href="#" className="text-[#9200AD] underline">
              términos y condiciones
            </a>
          </label>
        </div>

        <div className="col-span-1 md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-[#9200AD] hover:bg-[#6b1679] text-white px-6 py-2 rounded-full flex md:flex-row md:place-self-end md:gap-1 w-full md:w-fit justify-center gap-2"
          >
            Enviar
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4995 14.0016L20.9995 3.50164M10.6271 14.3297L13.2552 21.0877C13.4867 21.6831 13.6025 21.9807 13.7693 22.0676C13.9139 22.143 14.0862 22.1431 14.2308 22.0679C14.3977 21.9812 14.5139 21.6837 14.7461 21.0886L21.3364 4.20083C21.5461 3.66366 21.6509 3.39507 21.5935 3.22344C21.5437 3.07439 21.4268 2.95742 21.2777 2.90763C21.1061 2.85029 20.8375 2.95511 20.3003 3.16474L3.41258 9.75508C2.8175 9.9873 2.51997 10.1034 2.43326 10.2703C2.35809 10.415 2.35819 10.5873 2.43353 10.7319C2.52043 10.8987 2.81811 11.0144 3.41345 11.2459L10.1715 13.8741C10.2923 13.9211 10.3527 13.9446 10.4036 13.9808C10.4487 14.013 10.4881 14.0525 10.5203 14.0975C10.5566 14.1484 10.5801 14.2089 10.6271 14.3297Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
