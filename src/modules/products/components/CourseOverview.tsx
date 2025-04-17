import React from 'react';
import { CheckCircle, Star, Smile } from 'lucide-react';
import Image from 'next/image';

const tags = [
  'Estabilización crítica',
  'Diagnóstico rápido',
  'Control de complicaciones',
  'Seguridad del paciente',
  'Tecnología emergencias',
  'Planificación trauma',
  'Gestión de riesgos',
  'Comunicación efectiva',
];

const steps = [
  {
    step: 'Inscribite',
    icon: '/icons/course/overview/step1.svg',
  },
  {
    step: 'Aprende con material actualizado por expertos',
    icon: '/icons/course/overview/step2.svg',
  },
  {
    step: 'Obtén tu certificado',
    icon: '/icons/course/overview/step3.svg',
  },
  {
    step: 'Aplica lo aprendido a tu práctica y mejora tu futuro profesional',
    icon: '/icons/course/overview/step4.svg',
  },
];

const courseSteps = [
  'Lectura de módulos teóricos',
  'Autoevaluación al finalizar cada módulo',
  'Clases interactivas con mirada práctica aplicada a casos clínicos',
  'Examen final',
];

const features = [
  {
    icon: <CheckCircle className="text-pink-600 w-5 h-5" />,
    title: '¡Obtén tu certificado digital!',
    description: 'Al finalizar y aprobar, descarga tu certificado y compártelo con colegas en LinkedIn.',
  },
  {
    icon: <Star className="text-purple-600 w-5 h-5" />,
    title: 'El 97% recomienda este curso',
    description: 'Este curso ha sido altamente valorado por profesionales de la salud por su calidad y aplicabilidad práctica.',
  },
  {
    icon: <Smile className="text-pink-600 w-5 h-5" />,
    title: 'Compromiso de satisfacción',
    description: 'Si no deseas continuar con tu cursada dentro de los primeros 30 días, te devolvemos el 100% de tu inversión.',
  },
];

const CourseOverview: React.FC = () => {
  return (
    <section className="py-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-medium font-raleway mb-4 text-center md:text-left">Desarróllate en lo importante</h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#f7f9ff] text-[#29324f] text-sm font-medium px-4 py-2 rounded-full shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Step by step */}
      <p className="text-center md:whitespace-nowrap md:text-left text-lg font-medium mb-6">
        Con este curso, mejorarás tu criterio clínico y te convertirás en referente en <strong>Emergentología</strong>
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-sm text-center text-[#29324f]">
        {steps.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className='bg-[#f7f9ff] rounded-full'>
            <Image src={item.icon} alt="" width={30} height={30} />
            </div>
            <span>{item.step}</span>
            {/* {idx < steps.length -1 && <span className="text-gray-400">➔</span>} */}
          </div>
        ))}
      </div>

      {/* Paso a paso */}
      <div className="bg-[#f7f9ff] rounded-[38px] p-6 mb-10">
        <h3 className='pb-6 font-raleway text-[18px] font-medium text-center'>Tu cursada paso a paso</h3>
        <div className="grid gap-6 md:grid-cols-2 text-sm text-[#29324f] text-left font-inter">
          {courseSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Image src="/icons/msk.svg" alt="" width={20} height={20} />
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards informativas */}
      <div className="grid gap-6 md:grid-cols-3 text-center">
        {features.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-6 shadow-sm bg-white"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="font-semibold text-md mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseOverview;
