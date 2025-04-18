'use client';

import { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import Step4Recommendations from './Step4Recommendations';
import { useRouter } from 'next/navigation';

interface Step3InterestsProps {
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: any) => void;
  data: any;
}

const specialities = [
  "Administración y gestión", "Anestesiología y dolor", "Cardiología", "Cirugía",
  "Dermatología", "Diabetes", "Emergentología", "Endocrinología", "Gastroenterología",
  "Geriatría", "Ginecología", "Hematología", "Infectología", "Medicina familiar",
  "Medicina general", "Medicina intensiva", "Nefrología", "Nutrición", "Obstetricia",
  "Oftalmología", "Oncología", "Pediatría", "Psiquiatría", "Radiología e imagenología",
  "Traumatología", "Urología"
];

const contentOptions = [
  "Cursos", "Guías profesionales", "Artículos de blog", "Infografías",
  "Videografías", "Tutoriales", "Webinars"
];

const reasons = [
  "Especializarme en un área médica específica",
  "Obtener certificaciones o puntaje de recertificación",
  "Actualizarme con las últimas tendencias en salud",
  "Aprender sobre innovación y tecnología en el sector salud",
  "Mejorar mis habilidades prácticas en atención",
  "Otro motivo",
  "Prepararme para exámenes de residencia u otros"
];

export default function Step3Interests({ onNext, onBack, onUpdate, data }: Step3InterestsProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>(data.reasons || []);
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(data.specialities || []);
  const [selectedContents, setSelectedContents] = useState<string[]>(data.contents || []);
  const [showStep4, setShowStep4] = useState(false);

  const router = useRouter();

  const toggleTag = (
    tag: string,
    current: string[],
    setter: (val: string[]) => void
  ) => {
    setter(
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleNext = () => {
    onUpdate({
      reasons: selectedReasons,
      specialities: selectedSpecialities,
      contents: selectedContents,
    });
    setShowStep4(true);
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <section className="w-full flex justify-center flex-col max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] md:pb-0 mb-16 md:py-16 md:px-9">
      <button
        onClick={onBack}
        className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6E737C] hover:bg-gray-100 transition absolute"
      >
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1L1 6L5 11" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-raleway font-bold pb-5 text-[#1A1A1A]">
          Cuéntanos tus intereses
        </h2>
        <ProgressIndicator currentStep={3} />
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold font-raleway text-[#1A1A1A] mb-4">Especialidades</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {specialities.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag, selectedSpecialities, setSelectedSpecialities)}
              className={`px-4 py-2 rounded-full text-sm font-inter border transition cursor-pointer text-[#29324F] ${selectedSpecialities.includes(tag) ? "bg-[#DFE6FF] font-bold border-[#DFE6FF]" : "bg-[#F5F5FA] border-transparent hover:bg-[#DFE6FF]"}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold font-raleway text-[#1A1A1A] mb-4">Contenido</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {contentOptions.map((content) => (
            <button
              key={content}
              type="button"
              onClick={() => toggleTag(content, selectedContents, setSelectedContents)}
              className={`px-4 py-2 rounded-full text-sm font-inter border transition cursor-pointer text-[#29324F] ${selectedContents.includes(content) ? "bg-[#DFE6FF] font-bold border-[#DFE6FF]" : "bg-[#F5F5FA] border-transparent hover:bg-[#DFE6FF]"}`}
            >
              {content}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">¿Qué te trae a MSK hoy?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1000px] mx-auto">
          {reasons.map((reason) => (
            <label
              key={reason}
              className={`flex items-center border rounded-xl px-4 py-3 text-sm sm:text-base cursor-pointer transition text-left ${selectedReasons.includes(reason) ? "border-[#9200ad] text-[#6B21A8]" : "border-gray-300 text-gray-800 hover:bg-gray-100"}`}
            >
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason)}
                onChange={() => toggleReason(reason)}
                className="mr-3 w-5 h-5 text-[#9200ad] focus:ring-[#9200ad] border-gray-300 rounded-[4px]"
              />
              {reason}
            </label>
          ))}
        </div>
      </div>

      {!showStep4 && (
        <button
          onClick={handleNext}
          disabled={selectedReasons.length === 0}
          className={`mt-6 w-full sm:w-1/2 self-center mx-auto text-white py-3 px-4 rounded-full transition text-sm sm:text-base font-inter font-medium ${selectedReasons.length > 0 ? "bg-[#9200AD] hover:bg-[#700084]" : "bg-[#989CA4] cursor-not-allowed"}`}
        >
          Guardar
        </button>
      )}

      {showStep4 && <Step4Recommendations onBack={handleGoToDashboard} />}
    </section>
  );
}