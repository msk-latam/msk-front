"use client";
import { useState } from "react";
import CountrySelect from "@/modules/login/components/hooks/CountrySelect";

interface CourseSupportFormProps {
  name?: string;
  email?: string;
  phone?: string;
  profession?: string;
  specialty?: string;
  message?: string;
}

export default function CourseSupportForm(props: CourseSupportFormProps) {
  const [phone, setPhone] = useState("");
  const [areaCode, setAreaCode] = useState("+54");

  return (
    <div id="course-support-form" className="bg-white space-y-6">
      <h2 className="text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A]">
        ¿Necesitás ayuda para elegir tu curso?
      </h2>
      <p className="text-base font-raleway font-normal text-[#1A1A1A]">
        Nuestro equipo de especialistas en educación médica está listo para
        asesorarte. No dudes en escribirnos.
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

        <div className="flex gap-2 rounded-[16px] border border-[#DBDDE2] focus-within:outline-none focus-within:ring-4 focus-within:border-[#DBDDE2] focus-within:ring-[#F5E6F7] px-3 py-0 items-center">
          <div className="w-[40px] flex items-center">
            <CountrySelect onChange={(code) => setAreaCode(code)} />
          </div>
          <input
            type="tel"
            placeholder="Ingresar teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="rounded-[16px] border-0 focus:outline-none focus:ring-0 w-full text-[#6E737C]"
          />
        </div>

        <input
          type="email"
          placeholder="Ingresar email"
          className="border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
        />

        <select className="text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2">
          <option value="">Seleccionar profesión</option>
          <option value="Personal médico/1">Personal médico</option>
          <option value="Residente/2">Residente</option>
          <option value="Licenciado de la salud/3">
            Licenciado de la salud
          </option>
          <option value="Personal de enfermería/4">
            Personal de enfermería
          </option>
          <option value="Auxiliar de enfermería/5">
            Auxiliar de enfermería
          </option>
          <option value="Fuerza pública/6">Fuerza pública</option>
          <option value="Técnico universitario/7">Técnico universitario</option>
          <option value="Estudiante/8">Estudiante</option>
          <option value="Tecnología Médica/9">Tecnología Médica</option>
          <option value="Otra profesión/10">Otra profesión</option>
        </select>
        <select className="text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2">
          <option value="">Seleccionar especialidad</option>
          <option>Alergia e inmunología</option>
          <option>Anatomía patológica</option>
          <option>Coloproctología</option>
          <option>Flebología y linfología</option>
          <option>Hepatología</option>
          <option>Mastología</option>
          <option>Medicina de la industria farmaceútica</option>
          <option>Medicina del trabajo / ocupacional</option>
          <option>Medicina estética</option>
          <option>Medicina física y rehabilitación</option>
          <option>Medicina legal</option>
          <option>Medicina paliativa y dolor</option>
          <option>Medicina reproductiva y fertilidad</option>
          <option>Neumonología</option>
          <option>Reumatología</option>
          <option>Toxicología</option>
          <option>Trasplante</option>
          <option>Urología</option>
          <option>Enfermería familiar y comunitaria</option>
          <option>Enfermería en administración y gestión sanitaria</option>
          <option>Enfermería en análisis clínicos</option>
          <option>Enfermería en cardiología y UCO</option>
          <option>Enfermería en cuidados intensivos de adultos</option>
          <option>
            Enfermería en cuidados intensivos pediátricos y neonatales
          </option>
          <option>Enfermería en cuidados paliativos y dolor</option>
          <option>Enfermería en emergencias y atención primaria</option>
          <option>Enfermería en internación domiciliaria</option>
          <option>Enfermería en internación general</option>
          <option>Enfermería en investigación</option>
          <option>Enfermería en lactancia y puerperio</option>
          <option>Enfermería en reproducción asistida</option>
          <option>Enfermería en salud mental</option>
          <option>Enfermería en unidades de trasplantes</option>
          <option>Enfermería escolar</option>
          <option>Enfermería geriátrica y gerontológica</option>
          <option>Enfermería hematológica</option>
          <option>Enfermería nefrológica y diálisis</option>
          <option>Enfermería neonatal</option>
          <option>Enfermería obstétrica y ginecológica</option>
          <option>Enfermería oncológica</option>
          <option>Enfermería pediátrica</option>
          <option>Enfermería quirúrgica</option>
          <option>Enfermería radiológica</option>
          <option>Otras especialidades</option>
          <option>Producción de bioimágenes</option>
          <option>Bioquímica</option>
          <option>Psicología</option>
          <option>Farmacia</option>
          <option>Instrumentación quirúrgica</option>
          <option>Kinesiología y fisiatría</option>
          <option>Óptica</option>
          <option>Osteopatía</option>
          <option>Podología</option>
          <option>Terapia ocupacional</option>
          <option>Otra carrera o licenciatura</option>
          <option>Tecnicatura en laboratorio clínico</option>
          <option>Tecnicatura en radiología e imágenes diagnósticas</option>
          <option>Tecnicatura en atención de adicciones</option>
          <option>Tecnicatura en optometría</option>
          <option>Tecnicatura en hemoterapia e inmunohematología</option>
          <option>
            Tecnicatura en partería profesional con enfoque intercultural
          </option>
          <option>Tecnicatura en visita médica</option>
          <option>Tecnicatura en cuidados geriátricos</option>
          <option>Tecnicatura en tecnología en ciencias del esteticismo</option>
          <option>Tecnicatura en ciencia y tecnología de alimentos</option>
          <option>Tecnicatura en prácticas cardiológicas</option>
          <option>Tecnicatura en esterilización</option>
          <option>Tecnicatura en asistencia dental</option>
          <option>Tecnicatura en cosmetología</option>
          <option>Policía</option>
          <option>Bombero</option>
          <option>Guardavidas / Rescatista</option>
          <option>Auditoría y administración sanitaria</option>
          <option>Diabetes</option>
          <option>Generalista</option>
          <option>Medicina del deporte</option>
          <option>Medicina familiar y comunitaria</option>
          <option>Medicina intensiva</option>
          <option>Medicina interna / clínica</option>
          <option>Nutrición</option>
          <option>Traumatología y ortopedia</option>
          <option>Anestesiología</option>
          <option>Diagnóstico por Imágenes</option>
          <option>Cardiología</option>
          <option>Cirugía</option>
          <option>Cuidados críticos e intensivos</option>
          <option>Dermatología</option>
          <option>Emergentología</option>
          <option>Endocrinología</option>
          <option>Gastroenterología</option>
          <option>Generalista - Clínica - Medicina interna</option>
          <option>Geriatría y Gerontología</option>
          <option>Ginecología</option>
          <option>Hematología</option>
          <option>Infectología</option>
          <option>Internación domiciliaria y cuidados paliativos</option>
          <option>Nefrología</option>
          <option>Neonatología</option>
          <option>Neurología</option>
          <option>Nutrición y alimentación</option>
          <option>Obstetricia</option>
          <option>Obstetricia y Ginecología</option>
          <option>Odontología</option>
          <option>Oftalmología</option>
          <option>Oncología</option>
          <option>Ortopedia y Traumatología</option>
          <option>Otorrinolaringología</option>
          <option>Pediatría</option>
          <option>Psiquiatría</option>
          <option>Radiología</option>
          <option>Bioanálisis Clínico-molecular</option>
          <option>Medicina Transfusional</option>
          <option>Imagenología</option>
          <option>Radioterapia</option>
          <option>Física Médica</option>
          <option>Morfofisiopatología y Citodiagnóstico</option>
          <option>Otra Especialidad</option>
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
            <label
              htmlFor="privacy"
              className="text-sm font-raleway font-normal text-[#1A1A1A]"
            >
              Acepto las{" "}
              <a
                href="https://msklatam.tech/politica-de-privacidad/"
                className="text-[#9200AD] underline"
              >
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
