'use client'

import { useState } from 'react'
import ProgressIndicator from './ProgressIndicator'

interface Step2ProfessionalProps {
  data: any
  onNext: () => void
  onBack: () => void
  onSkip: () => void
  onUpdate: (data: Record<string, any>) => void
}

export default function Step2Professional({ data, onNext, onBack, onSkip, onUpdate }: Step2ProfessionalProps) {
  const [experience, setExperience] = useState(data.experience || '')
  const [institution, setInstitution] = useState(data.institution || '')
  const isValid = experience && institution

  const handleNext = () => {
    onUpdate({ experience, institution })
    onNext()
  }

  return (
    
      <section className="w-full max-w-[1632px] h-fit relative z-8 md:mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9" style={{ fontFamily: 'Raleway, sans-serif' }}>
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
  Déjanos conocer al profesional que hay en ti 
  </h2>
  <ProgressIndicator currentStep={2} />
</div>

        <form className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">Años de experiencia</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1 text-[#6e737c] py-2.5 px-3.5"
            >
              <option value="">Seleccionar</option>
              <option value="0-2">0-2</option>
              <option value="3-5">3-5</option>
              <option value="6-10">6-10</option>
              <option value="10+">10+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">Institución donde trabajas</label>
            <input
              type="text"
              placeholder="Nombre de la institución"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-2xl text-[#6e737c] border border-gray-300 py-2.5 px-3.5 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
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
    
  )
}
