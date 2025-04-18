'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type LoginFormProps = {
  onCreateAccount: () => void
  onBack: () => void
  onForgotPassword: () => void
}

export default function LoginForm({ onBack, onCreateAccount, onForgotPassword }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [shouldAskToCompleteProfile, setShouldAskToCompleteProfile] = useState(false)

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  useEffect(() => {
    // 🔁 Lógica escalable para cuando se integre Auth0 o localStorage
    // Por ahora siempre true para mostrar el modal
    const userShouldCompleteProfile = true // cambiar luego por localStorage / auth0 check
    setShouldAskToCompleteProfile(userShouldCompleteProfile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isFormValid) {
      if (shouldAskToCompleteProfile) {
        setShowModal(true)
      } else {
        router.push('/dashboard')
      }
    }
  }

  const handleRedirect = (path: string) => {
    setShowModal(false)
    router.push(path)
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] relative overflow-visible max-w-[1300px] mx-auto">
      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-lg text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">¿Querés completar tu perfil ahora?</h2>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => handleRedirect('/profile-completion')}
                className="flex-1 bg-[#9200AD] hover:bg-[#700084] text-white font-medium py-2 rounded-full transition"
              >
                Sí
              </button>
              <button
                onClick={() => handleRedirect('/dashboard')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-full transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resto del login (sin cambios) */}
      <div className="absolute md:top-10 md:left-8 top-5 left-5 flex z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L1 6L5 11" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <section className="w-full h-fit relative z-8 mx-auto px-6 pt-[84px] pb-28 md:py-16 md:px-9">
        <div className="text-center mb-6">
          <h1 className="md:text-[34px] text-[#1A1A1A] text-[24px] md:mb-6 mb-2 font-raleway font-medium">Iniciar sesión</h1>
          <p className="text-[16px] md:text-[18px] font-inter text-[#6E737C] mt-1">Accede a tu perfil personal</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 font-inter">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#1A1A1A] font-medium text-left">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresar e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-gray-300 p-3 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5"
            />
          </div>

          {/* Contraseña */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-[#1A1A1A] font-medium text-left">Contraseña</label>
              <button type="button" onClick={onForgotPassword} className="text-[#9200AD]">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresar contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200"
                aria-label="Mostrar/Ocultar contraseña"
              >
                <Image
                  src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'}
                  alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  width={20}
                  height={14}
                />
              </button>
            </div>
          </div>

          {/* Acceder */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-4 rounded-[38px] font-medium text-white transition font-inter ${
              isFormValid ? 'bg-[#9200AD] hover:bg-[#700084]' : 'bg-[#989CA4] cursor-not-allowed'
            }`}
          >
            Acceder
          </button>

           {/* Divider */}
           <div className="flex items-center gap-2 mt-4">
            <hr className="w-full border-[#6E737C]" />
            <span className="px-2 py-0.5 bg-white text-[#6E737C]" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', lineHeight: '22px' }}>
              O
            </span>
            <hr className="w-full border-[#6E737C]" />
          </div>

          {/* Redes sociales */}
          <div className="space-y-4 mt-2">
            {[{ name: 'Google', icon: '/icons/google.svg' }, { name: 'Facebook', icon: '/icons/facebook.svg' }, { name: 'Apple', icon: '/icons/apple.svg' }].map((provider) => (
              <button
                key={provider.name}
                type="button"
                className="w-full border text-sm font-medium border-gray-300 rounded-[38px] py-[14px] flex items-center justify-center gap-2 font-inter transition hover:bg-[#6E737C]"
              >
                Continuar con {provider.name}
                <img src={provider.icon} alt={provider.name} className="h-5 w-5" />
              </button>
            ))}
          </div>

          {/* Crear cuenta */}
          <p className="text-center text-base text-[#6E737C] mt-4 font-inter">
            ¿No tienes una cuenta?{' '}
            <button type="button" onClick={onCreateAccount} className="text-[#9200AD] underline">
              Créala aquí
            </button>
          </p>
        </form>
      </section>
    </div>
  )
}
