'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function NewPasswordForm() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4 min-h-fit h-[550px] flex md:items-center justify-center">
        <section
          className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
          style={{ fontFamily: 'Raleway, sans-serif' }}
        >
          <div className="flex justify-center w-full animate-pulse">
            <div className="w-44 mx-auto h-auto p-6">
              <img src="/images/emails/email-icon.svg" alt="Correo enviado" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">¡Listo!</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
            Ya confirmaste tu e-mail. En breve recibirás un correo con tus credenciales de <strong>Medical & Scientific Knowledge</strong>.
          </p>

          <button className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-[20px]">
            Seguir navegando
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9"
      style={{ fontFamily: 'Raleway, sans-serif' }}>
      <section className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12">
        <button
          className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6e737c] hover:bg-gray-100 transition absolute"
        >
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L1 6L5 11" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Cambiar contraseña</h1>
          <p className="text-sm text-gray-500 mt-1">Elige una nueva clave para iniciar sesión</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="max-w-md mx-auto space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">
              Nueva contraseña
            </label>
            <div className="relative">
              <
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresar nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[20px] border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out"
  aria-label="Mostrar/Ocultar contraseña"
>
  <Image
    key={showPassword ? 'eye-off' : 'eye'} // 🔄 clave importante para forzar transición de React
    src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'}
    alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
    width={20}
    height={14}
    className="transition-opacity duration-200 ease-in-out"
  />
</button>
            </div>
          </div>

          <button
            type="submit"
            disabled={password.trim() === ''}
            className={`w-full text-white py-2 px-4 rounded-[20px] transition font-medium ${
              password.trim() !== '' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Guardar cambios
          </button>
        </form>
      </section>
    </div>
  )
}
