'use client'

type RecoveryPasswordSentProps = {
  onContinue?: () => void
}

export default function RecoveryPasswordSent({ onContinue }: RecoveryPasswordSentProps) {
  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] min-h-fit h-[550px] flex md:items-center justify-center">
      <section
        className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
        style={{ fontFamily: 'Raleway, sans-serif' }}
      >
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-[#F7D6FF] p-6">
            <img src="/images/emails/email-icon.png" alt="Correo enviado" className="w-[70px] h-[56px]" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">Correo enviado</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.
        </p>

        {onContinue && (
          <button
            onClick={onContinue}
            className="mt-6 bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-[20px]"
          >
            Volver
          </button>
        )}
      </section>
    </div>
  )
}
