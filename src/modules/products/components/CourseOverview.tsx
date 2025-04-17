// import React from 'react';

// const tags = [
//   'Estabilización crítica',
//   'Diagnóstico rápido',
//   'Control de complicaciones',
//   'Seguridad del paciente',
//   'Tecnología emergencias',
//   'Planificación trauma',
//   'Gestión de riesgos',
//   'Comunicación efectiva',
// ];

// const ProductTags: React.FC = () => {
//   return (
//     <div className="py-3">
//       <h2 className="text-2xl font-medium font-raleway mb-4">Desarróllate en lo importante</h2>
//       <div className="flex flex-wrap gap-4 justify-center items-center">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="bg-[#f7f9ff] text-[#29324f] text-sm font-medium px-4 py-2 rounded-full shadow-sm shrink"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductTags;


import React from 'react';
import { CheckCircle, Star, Smile } from 'lucide-react';

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
  'Inscribete',
  'Aprende con material actualizado por expertos',
  'Obtén tu certificado',
  'Aplica lo aprendido a tu práctica y mejora tu futuro profesional',
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
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold font-raleway mb-4 text-center">Desarróllate en lo importante</h2>
      
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
      <p className="text-center text-lg font-medium mb-6">
        Con este curso, mejorarás tu criterio clínico y te convertirás en referente en <strong>Emergentología</strong>
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-sm text-center text-[#29324f]">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span>{step}</span>
            {idx < steps.length - 1 && <span className="text-gray-400">➔</span>}
          </div>
        ))}
      </div>

      {/* Paso a paso */}
        <div className="bg-[#f9f9fb] rounded-[38px] p-6 mb-10">
          <h3 className='pb-6 font-raleway text-[18px] font-medium'>Tu cursada paso a paso</h3>
      <div className=" grid gap-4 text-sm text-[#29324f] md:grid-cols-2 text-left font-inter">
        <p>📖 Lectura de módulos teóricos</p>
        <p>🧠 Autoevaluación al finalizar cada módulo</p>
        <p>🩺 Clases interactivas con mirada práctica aplicada a casos clínicos</p>
        <p>📝 Examen final</p>
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
