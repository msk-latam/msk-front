'use client';

import { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';

interface Step2ProfessionalProps {
  data: any;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onUpdate: (data: Record<string, any>) => void;
}

export default function Step2Professional({
  data,
  onNext,
  onBack,
  onSkip,
  onUpdate,
}: Step2ProfessionalProps) {
  const [workplace, setWorkplace] = useState(data.workplace || '');
  const [workArea, setWorkArea] = useState(data.workArea || '');
  const [medicalAssociation, setMedicalAssociation] = useState(data.medicalAssociation || '');
  const [associationName, setAssociationName] = useState(data.associationName || '');

  const isValid = workplace && workArea && medicalAssociation && (medicalAssociation !== 'sí' || associationName);

  const handleNext = () => {
    onUpdate({
      workplace,
      workArea,
      medicalAssociation,
      associationName,
    });
    onNext();
  };

  return (
    <section className="w-full max-w-[1632px] h-fit relative z-[1] md:mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9 font-inter">
      {/* Botón volver */}
      <button
        onClick={onBack}
        className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6E737C] hover:bg-gray-100 transition absolute"
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
        <h2 className="text-2xl sm:text-3xl font-semibold pb-5 text-[#1A1A1A]">
          Déjanos conocer al profesional que hay en ti
        </h2>
        <ProgressIndicator currentStep={2} />
      </div>

      <form className="max-w-md mx-auto space-y-6">
        {/* Lugar de trabajo */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] text-left">
            Lugar de trabajo
          </label>
          <input
            type="text"
            placeholder="Ingresar lugar de trabajo"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-[#DBDDE2] py-2.5 px-3.5 text-[#6E737C] focus:ring-4 focus:ring-[#F5E6F7] focus:outline-none"
          />
        </div>

        {/* Área de trabajo */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] text-left">
            Área de trabajo
          </label>
          <input
            type="text"
            placeholder="Ingresar área de trabajo"
            value={workArea}
            onChange={(e) => setWorkArea(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-[#DBDDE2] py-2.5 px-3.5 text-[#6E737C] focus:ring-4 focus:ring-[#F5E6F7] focus:outline-none"
          />
        </div>

        {/* ¿Pertenece a colegio médico? */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] text-left">
            ¿Perteneces a un colegio médico, sociedad o similar?
          </label>
          <select
            value={medicalAssociation}
            onChange={(e) => setMedicalAssociation(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-[#DBDDE2] py-2.5 px-3.5 text-[#6E737C] focus:ring-4 focus:ring-[#F5E6F7] focus:outline-none"
          >
            <option value="">Seleccionar</option>
            <option value="sí">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* ¿Cuál? */}
        {medicalAssociation === 'sí' && (
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] text-left">
              ¿Cuál?
            </label>
            <input
              type="text"
              placeholder="Ingresar colegio médico, sociedad o similar"
              value={associationName}
              onChange={(e) => setAssociationName(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-[#DBDDE2] py-2.5 px-3.5 text-[#6E737C] focus:ring-4 focus:ring-[#F5E6F7] focus:outline-none"
            />
          </div>
        )}

        {/* CTA Siguiente */}
        <button
          type="button"
          disabled={!isValid}
          onClick={handleNext}
          className={`w-full text-white py-3 px-4 rounded-[38px] font-inter font-medium transition ${
            isValid
              ? 'bg-[#9200AD] hover:bg-[#700084]'
              : 'bg-[#989CA4] cursor-not-allowed'
          }`}
        >
          Siguiente
        </button>

        {/* CTA Completar más tarde */}
        <button
          type="button"
          onClick={onSkip}
          className="w-full mt-2 border border-gray-300 font-inter font-semibold text-sm text-[#1A1A1A] py-3 px-4 rounded-[38px] hover:bg-[#8387901a]"
        >
          Completar más adelante
        </button>
      </form>
    </section>
  );
}
