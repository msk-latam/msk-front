// 'use client'

// export default function CourseCertificate() {
//   return (
//     <section className="bg-white rounded-2xl text-center md:text-left">
//       <h2 className="text-2xl md:text-[34px] font-raleway font-medium mb-6">
//         Obtén tu Certificado Médico Profesional
//       </h2>

//       <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-9">
//         {/* Imagen */}
//         <div className="flex justify-center md:justify-start">
//           <img
//             src="/images/productpage/certificado-mockup.svg"
//             alt="Certificado del curso"
//             className="rounded-lg shadow-md w-full max-w-xs md:max-w-sm"
//           />
//         </div>

//         {/* Texto */}
//         <div className="text-gray-700 font-light font-raleway md:text-lg md:leading-loose text-sm md:max-w-xl md:flex-1">
//           <p className="mb-4">
//             Al finalizar este curso, obtendrás un <strong>certificado de validez internacional</strong> sobre los nuevos conocimientos y habilidades clínicas adquiridos, potenciando tu perfil profesional.
//           </p>
//           <p>
//             ¡Podrás compartirlo de forma digital en LinkedIn o imprimirlo para sumarlo a tu consultorio!
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'

import { useCourseCertificate } from '../hooks/useCourseCertificate'

type Props = {
  slug: string
}

export default function CourseCertificate({ slug }: Props) {
  const { data: hasCertificate, loading, error } = useCourseCertificate(slug)

  if (loading || error || !hasCertificate) return null //va !hasCertificate pero harcodeado para que se vea en QA

  return (
    <section className="bg-white text-center md:text-left w-full rounded-[38px] md:py-10 md:px-9 px-6 py-12">
      <h2 className="text-2xl md:text-[34px] font-raleway font-medium mb-6">
        Obtén tu Certificado Médico Profesional
      </h2>

      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-9">
        {/* Imagen */}
        <div className="flex justify-center md:justify-start">
          <img
            src="/images/productpage/certificado-mockup.svg"
            alt="Certificado del curso"
            className="rounded-lg shadow-md w-full max-w-xs md:max-w-sm"
          />
        </div>

        {/* Texto */}
        <div className="text-gray-700 font-light font-raleway md:text-lg md:leading-loose text-sm md:max-w-xl md:flex-1">
          <p className="mb-4">
            Al finalizar este curso, obtendrás un <strong>certificado de validez internacional</strong> sobre los nuevos conocimientos y habilidades clínicas adquiridos, potenciando tu perfil profesional.
          </p>
          <p>
            ¡Podrás compartirlo de forma digital en LinkedIn o imprimirlo para sumarlo a tu consultorio!
          </p>
        </div>
      </div>
    </section>
  )
}
