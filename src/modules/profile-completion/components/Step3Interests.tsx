'use client'

import { useState } from 'react'

interface Step3InterestsProps {
  onNext: () => void
  onBack: () => void
  onUpdate: (data: any) => void
  data: any
}

const specialities = [
  'Administración y gestión', 'Anestesiología y dolor', 'Cardiología', 'Cirugía', 'Dermatología',
  'Diabetes', 'Emergentología', 'Endocrinología', 'Gastroenterología', 'Geriatría', 'Ginecología',
  'Hematología', 'Infectología', 'Medicina familiar', 'Medicina general', 'Medicina intensiva',
  'Nefrología', 'Nutrición', 'Obstetricia', 'Oftalmología', 'Oncología', 'Pediatría', 'Psiquiatría',
  'Radiología e imagenología', 'Traumatología', 'Urología'
]

const contentOptions = [
  'Cursos', 'Guías profesionales', 'Artículos de blog', 'Infografías', 'Videografías', 'Tutoriales', 'Webinars'
]

const reasons = [
  'Especializarme en un área médica específica', 'Obtener certificaciones o puntaje de recertificación',
  'Actualizarme con las últimas tendencias en salud', 'Aprender sobre innovación y tecnología en el sector salud',
  'Mejorar mis habilidades prácticas en atención', 'Prepararme para exámenes de residencia u otros', 'Otro motivo'
]

export default function Step3Interests({ onNext, onBack, onUpdate, data }: Step3InterestsProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>(data.reasons || [])
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(data.specialities || [])
  const [selectedContents, setSelectedContents] = useState<string[]>(data.contents || [])

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev => prev.includes(reason)
      ? prev.filter(r => r !== reason)
      : [...prev, reason])
  }

  const toggleTag = (tag: string, current: string[], setter: (val: string[]) => void) => {
    setter(current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag])
  }

  const handleNext = () => {
    onUpdate({
      reasons: selectedReasons,
      specialities: selectedSpecialities,
      contents: selectedContents
    })
    onNext()
  }

  return (
    <section className="w-full max-w-[1400px] mx-auto text-center space-y-10 px-4">
      <button
        onClick={onBack}
        className="hidden sm:flex absolute top-6 left-6 items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
      >
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1L1 6L5 11" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Especialidades</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {specialities.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag, selectedSpecialities, setSelectedSpecialities)}
              className={`px-4 py-2 rounded-full text-sm transition border cursor-pointer
                ${selectedSpecialities.includes(tag)
                  ? 'bg-[#DFE6FF] font-bold border-[#DFE6FF]'
                  : 'bg-[#F5F5FA] text-[#212529] border-transparent hover:bg-[#DFE6FF] hover:text-black'}
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contenido</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {contentOptions.map((content) => (
            <button
              key={content}
              type="button"
              onClick={() => toggleTag(content, selectedContents, setSelectedContents)}
              className={`px-4 py-2 rounded-full text-sm transition border cursor-pointer
                ${selectedContents.includes(content)
                    ? 'bg-[#DFE6FF] font-bold border-[#DFE6FF]'
                    : 'bg-[#F5F5FA] text-[#212529] border-transparent hover:bg-[#DFE6FF] hover:text-black'}
              `}
            >
              {content}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué te trae a MSK hoy?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1000px] mx-auto">
          {reasons.map((reason) => (
            <label
              key={reason}
              className={`flex items-center border rounded-xl px-4 py-3 text-sm sm:text-base cursor-pointer transition text-left
                ${selectedReasons.includes(reason)
                  ? 'bg-[#F7EBFF] border-[#A855F7] text-[#6B21A8]'
                  : 'border-gray-300 text-gray-800 hover:bg-gray-100'}
              `}
            >
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason)}
                onChange={() => toggleReason(reason)}
                className="mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              {reason}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={selectedReasons.length === 0}
        className={`mt-6 w-full sm:w-1/2 mx-auto text-white py-3 px-4 rounded-full transition text-sm sm:text-base
          ${selectedReasons.length > 0
            ? 'bg-[#8000B2] hover:bg-[#6b0094]'
            : 'bg-gray-300 cursor-not-allowed'}
        `}
      >
        Guardar
      </button>
    </section>
  )
}
