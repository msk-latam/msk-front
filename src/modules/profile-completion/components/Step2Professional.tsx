'use client'

import { useState } from 'react'
import ProgressIndicator from './ProgressIndicator'

interface Step2ProfessionalProps {
  data: any
  onNext: () => void
  onBack: () => void
  onUpdate: (data: Record<string, any>) => void
}

export default function Step2Professional({ data, onNext, onBack, onUpdate }: Step2ProfessionalProps) {
  const [experience, setExperience] = useState(data.experience || '')
  const [institution, setInstitution] = useState(data.institution || '')
  const isValid = experience && institution

  const handleNext = () => {
    onUpdate({ experience, institution })
    onNext()
  }

  return (
    
      <section className="w-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
        <button
          onClick={onBack}
          className="hidden sm:flex absolute top-6 left-6 items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L1 6L5 11" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-center mb-6">
  <h2 className="text-2xl sm:text-3xl font-semibold pb-5 text-gray-900">
    Cuéntanos sobre tu experiencia profesional
  </h2>
  <ProgressIndicator currentStep={2} />
</div>

        <form className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">Años de experiencia</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
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
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={handleNext}
            className={`w-full text-white py-2 px-4 rounded-full transition ${
              isValid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Siguiente
          </button>
        </form>
      </section>
    
  )
}
