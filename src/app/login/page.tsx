'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import '@/app/globals.css'
import { Suspense } from 'react';

import Navbar from '@/modules/home/components/navbar/Navbar'
import Newsletter from '@/modules/home/components/newsletter/NewsLetter'
import Footer from '@/modules/home/components/footer/footer'
import LoginForm from '@/modules/login/components/loginform/LoginForm'
import RegisterForm from '@/modules/login/components/loginform/RegisterForm'
import RecoveryPassword from '@/modules/login/components/loginform/RecoveryPassword'
import RecoveryPasswordSent from '@/modules/login/components/loginform/RecoveryPasswordSent'
import NewPasswordForm from '@/modules/login/components/loginform/NewPasswordForm'

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false)
  const [showRecovery, setShowRecovery] = useState(false)
  const [showRecoverySent, setShowRecoverySent] = useState(false)

  // Move this to a client-only component to ensure it's only used on the client
  const ClientSearchParams = () => {
    const searchParams = useSearchParams()
    const form = searchParams.get('form')
    return form
  }

  return (
    <>
      {/* 🌈 Header con fondo de gradiente */}
      <header
        className="w-full h-[180px] sm:h-[290px] overflow-hidden m-0 p-0"
        style={{
          background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
        }}
      >
        <Navbar />
      </header>

      {/* 🧾 Contenido principal con formularios */}
      <main className="bg-gray-50 flex justify-center px-0 sm:px-4 relative pt-0 pb-20 -mb-[100px] md:mb-0">
        <section aria-label="Formulario de autenticación" className="w-full max-w-[1600px]">
          {/* Wrap the entire section inside Suspense */}
          <Suspense fallback={<div>Loading...</div>}>
            <ClientSearchParams /> {/* Use the client-side only component here */}

            {/* Handle different forms based on searchParams */}
            {showRegister ? (
              <RegisterForm onBack={() => setShowRegister(false)} />
            ) : showRecovery ? (
              showRecoverySent ? (
                <RecoveryPasswordSent
                  onContinue={() => {
                    setShowRecovery(false)
                    setShowRecoverySent(false)
                  }}
                />
              ) : (
                <RecoveryPassword
                  onBack={() => setShowRecovery(false)}
                  onSent={() => setShowRecoverySent(true)}
                />
              )
            ) : (
              <LoginForm
                onCreateAccount={() => setShowRegister(true)}
                onForgotPassword={() => setShowRecovery(true)}
                onBack={() => setShowRegister(false)}
              />
            )}
          </Suspense>
        </section>
      </main>

      {/* ✉️ Newsletter encimado */}
      <section className="relative z-[20] -mt-28 md:-mt-[4rem] -mt-[40px]">
        <Newsletter />
      </section>

      {/* 👣 Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  )
}
