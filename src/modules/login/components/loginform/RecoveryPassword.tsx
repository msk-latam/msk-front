'use client'

import { useState } from 'react'

type RecoveryPasswordProps = {
  onBack: () => void
  onSent: () => void
}

export default function RecoveryPassword({ onBack, onSent }: RecoveryPasswordProps) {
  const [email, setEmail] = useState('')
  const isValid = email.trim() !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSent()
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] relative overflow-visible mx-auto h-full min-h-96">

      
      {/* 🔙 Botón de volver (visible en todas las resoluciones) */}
      <div className="absolute md:top-10 md:left-8 top-5 left-5 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
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
      </div>

      <section
        className="w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] pb-28 md:py-16 md:px-9"
        style={{ fontFamily: 'Raleway, sans-serif' }}
      >
        {/* 🧾 Título */}
        <div className="text-center mb-6">
          <h1 className="md:text-3xl text-2xl font-semibold pb-2 md:pb-6 text-gray-900">Cambiar contraseña</h1>
          <p className="text-base md:text-[18] font-inter text-gray-500 mt-1">
            Te enviaremos un correo para que puedas crear una nueva
          </p>
        </div>

        {/* 📧 Formulario */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresar e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full text-base font-dmsans rounded-[20px] border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full text-white py-2 px-4 rounded-[20px] transition ${
              isValid ? 'bg-[#9200ad] hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirmar
          </button>
        </form>

        <p className="text-center text-base font-dmsans text-gray-500 mt-4 mb-24">
          Volver a{' '}
          <button
            type="button"
            onClick={onBack}
            className="text-[#9200ad] underline"
          >
            Iniciar sesión
          </button>
        </p>
      </section>
    </div>
  )
}
