'use client'

import { useState } from 'react'

type LoginFormProps = {
  onCreateAccount: () => void
  onBack: () => void
  onForgotPassword: () => void
}

export default function LoginForm({ onBack, onCreateAccount, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isFormValid = email.trim() !== '' && password.trim() !== ''

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] relative overflow-visible mx-auto">

      {/* 🔙 Botón de volver */}
      <div className="absolute md:top-10 md:left-8 top-5 left-5 flex z-10">
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
          <h1 className="md:text-[34px] text-2xl md:mb-6 mb-2 font-semibold text-gray-900">Iniciar sesión</h1>
          <p className="text-base md:text-[18px] text-gray-500 mt-1">Accede a tu perfil personal</p>
        </div>

        {/* 📝 Formulario */}
        <form className="max-w-md mx-auto space-y-6">
          {/* Email */}
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
              className="mt-1 w-full text-base rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
          </div>

          {/* Contraseña */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                Contraseña
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm font-medium"
                style={{ color: '#9200AD' }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Ingresar contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full text-base rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
          </div>

          {/* Acceder */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full text-white py-2 px-4 rounded-[38px] transition ${
              isFormValid
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-[#989CA4] cursor-not-allowed'
            }`}
          >
            Acceder
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 mt-4">
            <hr className="w-full border-[#6E737C]" />
            <span
              className="px-2 py-0.5 bg-white border-[#6E737C] text-[#6E737C]"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '22px',
                letterSpacing: '0.5%',
              }}
            >
              O
            </span>
            <hr className="w-full border-[#6E737C]" />
          </div>

          {/* Redes sociales */}
          <div className="space-y-4 mt-2">
            {[
              { name: 'Google', icon: '/icons/google.svg' },
              { name: 'Facebook', icon: '/icons/facebook.svg' },
              { name: 'Apple', icon: '/icons/apple.svg' },
            ].map((provider) => (
              <button
                key={provider.name}
                type="button"
                className="w-full border text-sm font-inter border-gray-300 rounded-[38px] py-[14px] flex items-center justify-center gap-2"
              >
                Continuar con {provider.name}
                <img src={provider.icon} alt={provider.name} className="h-5 w-5" />
              </button>
            ))}
          </div>
{/*error:border-[#F5006D] */}
          {/* Crear cuenta */}
          <p className="text-center text-base font-dmsans text-gray-500 mt-4">
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              onClick={onCreateAccount}
              className="text-purple-600 font-inter underline"
            >
              Créala aquí
            </button>
          </p>
        </form>
      </section>
    </div>
  )
}
