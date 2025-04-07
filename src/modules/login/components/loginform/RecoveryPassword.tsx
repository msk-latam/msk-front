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
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] min-h-fit h-[550px]  flex md:items-center justify-center">
      
      {/* 🔙 Botón de volver (visible en todas las resoluciones) */}
      <div className="absolute top-4 left-4 flex z-10">
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
        className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12"
        style={{ fontFamily: 'Raleway, sans-serif' }}
      >
        {/* 🧾 Título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Cambiar contraseña</h1>
          <p className="text-sm text-gray-500 mt-1">
            Te enviaremos un correo para que puedas crear una nueva
          </p>
        </div>

        {/* 📧 Formulario */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
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
              className="mt-1 w-full rounded-[20px] border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full text-white py-2 px-4 rounded-[20px] transition ${
              isValid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirmar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Recordaste tu contraseña?{' '}
          <button
            type="button"
            onClick={onBack}
            className="text-purple-600 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </p>
      </section>
    </div>
  )
}
