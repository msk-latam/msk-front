"use client";

interface CourseSupportFormProps {
  name?: string;
  email?: string;
  phone?: string;
  profession?: string;
  specialty?: string;
  message?: string;
}

export default function CourseSupportForm(props: CourseSupportFormProps) {
  return (
    <div className="bg-white space-y-6">
      <h2 className="text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A]">
        ¿Necesitás ayuda para elegir tu curso?
      </h2>
      <p className="text-base font-raleway font-normal text-[#1A1A1A]">
        Nuestro equipo de especialistas en educación médica está listo para asesorarte. No dudes en escribirnos.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Ingresar nombre"
          className="border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
        />
        <input
          type="text"
          placeholder="Ingresar apellido"
          className="border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
        />

        <div className="flex gap-2 rounded-[16px] border border-[#DBDDE2] focus-within:outline-none focus-within:ring-4 focus-within:border-[#DBDDE2] focus-within:ring-[#F5E6F7]">
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
          className="border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
        />

        <select className="text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2">
          <option value="">Seleccionar profesión</option>
        </select>
        <select className="text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2">
          <option value="">Seleccionar especialidad</option>
        </select>

        <textarea
          placeholder="Mensaje"
          className="border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2 col-span-1 md:col-span-2"
          rows={4}
        ></textarea>

        {/* Checkbox y Botón en la misma línea en desktop */}
        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-4 md:mt-4">
          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="privacy"
              className="accent-[#9200AD] border rounded-[4px] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]"
            />
            <label htmlFor="privacy" className="text-sm font-raleway font-normal text-[#1A1A1A]">
              Acepto las{" "}
              <a href="https://msklatam.tech/politica-de-privacidad/" className="text-[#9200AD] underline">
                condiciones de privacidad
              </a>
            </label>
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            className="bg-[#9200AD] hover:bg-[#6b1679] text-white px-6 py-2 rounded-full flex items-center gap-2 w-full md:w-fit justify-center md:justify-end"
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
