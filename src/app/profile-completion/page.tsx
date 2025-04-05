'use client'

import { useState } from 'react'
import '@/app/globals.css'
import Navbar from '@/modules/home/components/navbar/Navbar'
import Newsletter from '@/modules/home/components/newsletter/NewsLetter'
import Footer from '@/modules/home/components/footer/footer'
import ProfileCompletionWrapper from '@/modules/profile-completion/ProfileCompletionWrapper'

export default function LoginPage() {
    const [showRegister, setShowRegister] = useState(false)
  
  return (
    <>
      {/* HEADER CON GRADIENTE */}
      <div
        className="w-full h-[180px] sm:h-[290px] "
        style={{
          background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%), 
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
        }}
      >
        <Navbar />
      </div>

      {/* FORMULARIO */}
      
      {/* ======================= */}
      {/* CONTENEDOR DE FORMULARIO */}
      {/* ======================= */}
      <div className="bg-gray-50 flex justify-center px-0 sm:px-4 relative pt-0 pb-20">
       
          
            {/* Mostrar Login o Registro según el estado */}
            <ProfileCompletionWrapper/>
            {/* Newsletter incluido dentro del bloque para que se vea parte del fondo */}
            
          </div>
        
      

      {/* NEWSLETTER SOBRE EL FORMULARIO */}
      <div className="relative z-[20] -mt-28 md:-mt-[4rem] -mt-[40px]">
        <Newsletter />
      </div>

      <Footer />
    </>
  )
}
