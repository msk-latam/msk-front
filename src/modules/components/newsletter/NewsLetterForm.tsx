"use client";

import CountrySelect from "@/modules/login/components/hooks/CountrySelect";
import { useState, useEffect, useRef } from "react";
import { getCountryCallingCode, getCountries } from "react-phone-number-input";
import { getName } from "country-list";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface NewsLetterFormProps {
  onClose: () => void;
}

export default function NewsLetterForm({
  onClose,
}: NewsLetterFormProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false); // ya existente
  const [profession, setProfession] = useState("");
  const [specialty, setSpecialty] = useState("");
  const getCountryNameByCode = (dialCode: string): string => {
    const countryCode = getCountries().find(
      (code) => `+${getCountryCallingCode(code)}` === dialCode
    );
    return countryCode ? getName(countryCode) ?? "" : "";
  };
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    areaCode: "+54",
    profession: "",
    speciality: "",
    message: "",
    acceptTerms: false,
  });

  const countryName = getCountryNameByCode(formData.areaCode);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      window.innerWidth <= 768 &&
      !modalRef.current?.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  
    const { name, lastName, email, phone, areaCode, message, acceptTerms } = formData;
  
    if (!name.trim() || !email.trim()) {
      setSubmitted(false);
      return alert("Por favor, completá tu nombre y correo electrónico.");
    }
  
    if (!acceptTerms) {
      setSubmitted(false);
      return alert("Debes aceptar las condiciones de privacidad.");
    }
  
    if (!executeRecaptcha) {
      setSubmitted(false);
      return alert("La verificación de seguridad aún no está lista. Intenta nuevamente.");
    }
  
    try {
      const recaptcha_token = await executeRecaptcha("newsletter");
      const body = {
        First_Name: name,
        Last_Name: lastName,
        Email: email,
        Phone: `${areaCode}${phone}`,
        Description: message,
        Profesion: profession,
        Especialidad: specialty,
        Otra_profesion: profession === "Otra Profesión" ? formData.profession : "",
        Otra_especialidad: specialty === "Otra Especialidad" ? formData.speciality : "",
        Pais: countryName,
        Terms_And_Conditions: true,
        URL_ORIGEN: window.location.href,
        leadSource: "Formulario de contacto",
        recaptcha_token,
        Cursos_consultados: [], // <-- campo obligatorio para evitar el 400
      };
      
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_PUBLIC_URL}/api/crm/CreateLeadHomeContactUs`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      const result = await response.json();
  
      if (!response.ok || !Array.isArray(result.data) || result.data[0]?.code !== "SUCCESS") {
        console.warn("Error en respuesta del CRM:", result);
        alert("No se pudo completar el registro. Intenta nuevamente.");
      } else {
        alert("Formulario enviado correctamente");
        onClose();
      }
    } catch (error) {
      console.error("Error general:", error);
      alert("Hubo un problema al procesar tu solicitud. Intenta nuevamente.");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] px-4 py-20 !mt-0"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node))
          onClose();
        else e.stopPropagation();
      }}
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg"
      >
        <button
          onClick={() => onClose()}
          type="button"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-[#1A1A1A] text-2xl font-semibold mb-6 text-center">
          Formulario de contacto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 text-[#1A1A1A] ">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresar nombre"
              className="w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ingresar apellido"
              className="w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 text-[#1A1A1A] ">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresar e-mail"
              type="email"
              className="w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]"
            />
            <div className="w-full">
              <div className="flex gap-2 border rounded-2xl border-[#DBDDE2] px-[2.7px] py-1 focus-within:ring-4 focus-within:ring-[#F5E6F7]">
                <div className="w-18">
                  <CountrySelect
                    onChange={(code) =>
                      setFormData((prev) => ({ ...prev, areaCode: code }))
                    }
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  placeholder="Ingresar número telefónico"
                  className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-[#6E737C]"
                />
              </div>
            </div>
          </div>

          {/* Profession and Speciality */}
          <div className="col-span-1 md:col-span-1 space-y-3 text-[#1A1A1A] ">
            {/* Profesión */}
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
            >
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
              <option value="Técnico universitario/7">
                Técnico universitario
              </option>
              <option value="Estudiante/8">Estudiante</option>
              <option value="Tecnología Médica/9">Tecnología Médica</option>
              <option value="Otra Profesión">Otra Profesión</option>
            </select>
            {profession === "Otra Profesión" && (
              <input
                type="text"
                placeholder="Ingresar otra profesión"
                className="w-full border border-[#DBDDE2] rounded-[16px] px-3 py-2 focus:outline-none focus:ring-4 focus:ring-[#F5E6F7]"
              />
            )}
          </div>
          <div className="col-span-1 md:col-span-1 space-y-3 text-[#1A1A1A] ">
            {/* Especialidad */}
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
            >
              <option value="">Seleccionar especialidad</option>
              <option value="Especialista en salud/1">
                Especialista en salud
              </option>
              <option value="Médico general/2">Médico general</option>
              <option value="Cirujano/3">Cirujano</option>
              <option value="Enfermería/4">Enfermería</option>
              <option value="Medicina/5">Medicina</option>
              <option value="Terapia/6">Terapia</option>
              <option value="Otra Especialidad">Otra Especialidad</option>
            </select>
            {specialty === "Otra Especialidad" && (
              <input
                type="text"
                placeholder="Ingresar otra especialidad"
                className="w-full border border-[#DBDDE2] rounded-[16px] px-3 py-2 focus:outline-none focus:ring-4 focus:ring-[#F5E6F7]"
              />
            )}
          </div>
          <div className="col-span-1 space-y-3 text-[#1A1A1A] ">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensaje (opcional)"
              rows={4}
              className="w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              id="terms"
              className="h-4 w-4 text-[#F5E6F7] border-[#DBDDE2] rounded"
            />
						<label htmlFor='acceptTerms' className='text-xs text-[#8A8A8A] leading-5'>
							Acepto los{' '}
							<a href='#' className='underline'>
								términos y condiciones
							</a>
						</label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mt-4 py-2 text-white bg-[#9] bg-[#9200ad] rounded-3xl hover:bg-[#a84db4]"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
