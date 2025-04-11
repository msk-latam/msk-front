'use client'

type RecoveryPasswordSentProps = {
  onContinue?: () => void
}

export default function RecoveryPasswordSent({ onContinue }: RecoveryPasswordSentProps) {
  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 py-10 z-[10] relative overflow-visible max-w-[1600px] h-screen md:h-full flex md:items-center justify-center">
      <section
        className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
        style={{ fontFamily: 'Raleway, sans-serif' }}
      >
        <div className="flex justify-center">
          <div className="rounded-full w-44 mx-auto h-auto p-6">
            <img src="/images/emails/email-icon.svg" alt="Correo enviado" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 md:mb-2">Correo enviado</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.
        </p>

        {/* {onContinue && (
          <button
            onClick={onContinue}
            className="mt-6 bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-[20px]"
          >
            Volver
          </button>
        )} */}
      </section>
    </div>
  )
}
