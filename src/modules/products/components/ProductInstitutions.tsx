// components/InstitutionSupport.tsx

import Image from 'next/image'

const institutions = [
  {
    name: 'ACCSAP',
    img: '/images/partners/acc.svg',
    alt: 'ACCSAP - American College of Cardiology',
  },
  {
    name: 'Colegio de Médicos',
    img: '/images/partners/andaluza.svg',
    alt: 'Colegio de Médicos de la Provincia de Buenos Aires Distrito III',
  },
  {
    name: 'ESEM',
    img: '/images/partners/esem.svg',
    alt: 'ESEM III - Escuela Superior de Enseñanza Médica',
  },
  {
    name: 'AFEME',
    img: '/images/partners/afeme.svg',
    alt: 'AFEME - Asociación de Facultades Ecuatorianas de Ciencias Médicas y de la Salud',
  },
]

export default function InstitutionSupport() {
    return (
      <section className="md:py-3 text-left">
        <h2 className="text-xl md:text-2xl font-medium mb-6 w-fit">
          Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
        </h2>
  
        {/* Scroll horizontal en mobile */}
        <div className="overflow-x-auto md:overflow-visible scrollbar-none">
          <div className="flex gap-4 md:flex-row md:justify-center flex-nowrap px-2 md:px-6">
            {institutions.map((inst) => (
              <div
                key={inst.name}
                className="bg-[#f7f9ff] rounded-xl shadow-sm p-6 h-32 flex items-center justify-center shrink-0 md:w-1/4"
              >
                <Image
                  src={inst.img}
                  alt={inst.alt}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }