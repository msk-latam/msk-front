'use client'

import { useState } from 'react'

type RegisterFormProps = {
  onBack: () => void
}

export default function RegisterForm({ onBack }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isValid =
    email.trim() !== '' &&
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    password.trim() !== ''

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="flex justify-center mb-6 animate-pulse">
          <div className="rounded-full bg-[#F7D6FF] p-6">
            <img src="/icons/email-purple.svg" alt="Correo enviado" className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">¡Listo!</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Recibirás en tu casilla de e-mail un correo de verificación. <br />
          Revisa tu bandeja de entrada, spam o correos no deseados.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 p-4 sm:p-20 z-[10] relative overflow-visible max-w-[1600px]">
    <section className="w-full" style={{ fontFamily: 'Raleway, sans-serif' }}>
      {/* Botón de volver */}
      <button
        onClick={onBack}
        className="hidden sm:flex absolute top-6 left-6 items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
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

      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Crear cuenta</h2>
        <p className="text-sm text-gray-500 mt-1">
          Registrate y disfruta al máximo de nuestra propuesta académica
        </p>
      </div>

      <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">E-mail</label>
          <input
            type="email"
            placeholder="Ingresar e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">Nombre/s</label>
          <input
            type="text"
            placeholder="Ingresar nombre/s"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">Apellido/s</label>
          <input
            type="text"
            placeholder="Ingresar apellido/s"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">Contraseña</label>
          <input
            type="password"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full text-white py-2 px-4 rounded-md transition ${
            isValid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Crear
        </button>

        <p className="text-xs text-center text-gray-500">
          Al registrarte, aceptás las{' '}
          <a href="#" className="text-purple-600 hover:underline">condiciones de privacidad</a> y los{' '}
          <a href="#" className="text-purple-600 hover:underline">términos y condiciones</a>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="w-full border-[#6E737C]" />
          <span
            className="rounded-full px-3 py-0.5 bg-white border border-[#6E737C] text-[#6E737C]"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              letterSpacing: '0.5%',
            }}
          >
            o
          </span>
          <hr className="w-full border-[#6E737C]" />
        </div>

        {/* Botones sociales */}
        <div className="space-y-2">
          <button className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2">
            <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
            Crear con Google
          </button>
          <button className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2">
            <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
            Crear con Facebook
          </button>
          <button className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2">
            <img src="/icons/apple.svg" alt="Apple" className="h-5 w-5" />
            Crear con Apple
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <button type="button" onClick={onBack} className="text-purple-600 hover:underline">
            Inicia sesión aquí
          </button>
        </p>
      </form>
    </section>
    </div>
  )
}
