'use client'

export default function ProductCertificate() {
  return (
    <section className="bg-white rounded-2xl  md:p-10 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Certificación</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-gray-700 text-sm md:max-w-xl">
          Al finalizar el curso recibirás un certificado digital avalado por MSK, que podrás descargar e imprimir. Este certificado incluye el nombre del curso, tu nombre completo y la duración total del curso.
        </div>

        <div className="mt-6 md:mt-0 md:ml-10">
          <img
            src="/images/certificado-mockup.png"
            alt="Certificado del curso"
            className="rounded-lg shadow-md w-full max-w-xs mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  )
}