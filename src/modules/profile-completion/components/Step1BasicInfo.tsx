"use client";

import { useState, useEffect } from "react";
import ProgressIndicator from "./ProgressIndicator";

interface Step1BasicInfoProps {
  data: {
    profession?: string;
    specialty?: string;
    country?: string;
    phone?: string;
  };
  onNext: () => void;
  onSkip: () => void;
  onBack?: () => void;
  onUpdate: (data: Partial<Step1BasicInfoProps["data"]>) => void;
}

export default function Step1BasicInfo({
  data,
  onNext,
  onSkip,
  onBack,
  onUpdate,
}: Step1BasicInfoProps) {
  const [profession, setProfession] = useState(data.profession || "");
  const [specialty, setSpecialty] = useState(data.specialty || "");
  const [country, setCountry] = useState(data.country || "");
  const [phone, setPhone] = useState(data.phone || "");

  const isValid = profession && specialty && country && phone;

  useEffect(() => {
    onUpdate({ profession, specialty, country, phone });
  }, [profession, specialty, country, phone]);

  return (
    <section
      className="w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <button
        onClick={onBack}
        className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6e737c] hover:bg-gray-100 transition absolute"
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 1L1 6L5 11"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold pb-5 text-gray-900">
          Completa tu perfil y personaliza tu experiencia en MSK
        </h2>
        <ProgressIndicator currentStep={1} />
      </div>

      <form className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Profesión
          </label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1 text-[#6e737c] py-2.5 px-3.5"
          >
            <option value="">Seleccionar profesión</option>
            <option value="medico">Médico</option>
            <option value="enfermero">Enfermero</option>
            <option value="administrativo">Administrativo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Especialidad
          </label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="mt-1 w-full rounded-2xl text-[#6e737c] border border-gray-300 py-2.5 px-3.5 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
          >
            <option value="">Seleccionar especialidad</option>
            <option value="medicina-general">Medicina General</option>
            <option value="cardiologia">Cardiología</option>
            <option value="neurologia">Neurología</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            País
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-gray-300 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1 text-[#6e737c] py-2.5 px-3.5"
          >
            <option value="">Seleccionar país</option>
            <option value="ar">Argentina</option>
            <option value="mx">México</option>
            <option value="co">Colombia</option>
          </select>
        </div>

        <div className="block text-sm font-medium text-gray-700 text-left">
          <label className="block text-sm font-medium text-gray-700 text-left">
            Teléfono
          </label>
          <div className="flex gap-2 border rounded-2xl border-gray-300 focus-within:ring-4 focus-within:border-[#DBDDE2] focus-within:ring-[#F5E6F7] focus-within:border-1 px-1.5 py-0.5">
            <select
              className="border-0 focus:ring-transparent focus:border-0 focus:ring-0 text-[#1a1a1a] w-24"
              defaultValue="+54"
            >
              <option value="+54">+54</option>
              <option value="+52">+52</option>
              <option value="+57">+57</option>
            </select>
            <input
              type="tel"
              placeholder="Ingresar teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 focus:ring-transparent border-0 focus:border-0 focus:ring-0 text-[#6e737c]"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className={`w-full text-white py-3 px-4 rounded-[38px] transition ${
            isValid
              ? "bg-[#9200ad] hover:bg-purple-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="w-full mt-2 border border-gray-300 font-semibold text-sm text-[#1a1a1a] py-3 px-4 rounded-[38px] hover:bg-gray-100"
        >
          Completar más adelante
        </button>
      </form>
    </section>
  );
}
