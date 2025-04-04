'use client';

import { useState } from 'react';
import NewsletterLinks from './NewsletterLinks';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full px-4 md:px-0 flex flex-col items-center justify-center bg-[#1A1A1A] text-white font-raleway">
      {/* Newsletter superior */}
      <div className="bg-[#35383E] w-full max-w-[343px] md:max-w-screen-xl -mt-8 p-6 md:py-6 md:px-10 md:rounded-[38px] rounded-[38px] z-[5] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 mx-auto">
        
        {/* Título */}
        <div className="text-center md:text-left md:w-[200px] shrink-0">
          <p className="text-white text-[22px] font-semibold text-base  ">
            Nuestro <br className="hidden md:block" /> newsletter
          </p>
        </div>

        {/* Separador */}
        <div className="hidden md:block w-[1px] h-[70px] bg-[#5A5F67] -ml-8" />

        {/* Descripción */}
        <div className="text-[16px] text-white text-center md:text-left md:flex-1 font-inter">
          Descuentos exclusivos y becas  <br className="hidden md:block" /> completas solo con tu suscripción
        </div>

        {/* Separador */}
        <div className="hidden md:block w-[1px] h-[70px] bg-[#5A5F67] ml-6" />

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:max-w-[450px] flex flex-col md:flex-row items-center gap-4 md:gap-0 md:bg-white md:rounded-full md:pl-6 md:pr-2 md:h-[64px]"
        >
          {/* INPUT */}
          <input
            type="email"
            name="email"
            placeholder="Ingresar e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[478px] h-[52px] md:h-[64px] px-4 py-2 text-black rounded-full focus:outline-none border md:border-0"
            required
          />

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full md:w-[160px] h-[52px] bg-[#9400D3] hover:bg-[#7A00B6] text-white px-6 py-3.5 rounded-[38px] flex items-center justify-center gap-2 transition-colors md:ml-2"
          >
            <span className="text-sm">Suscribirme</span>
            {!submitted && (
              <img src="/images/icons/plane.svg" alt="Enviar" className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

      {/* Secciones con links */}
      <NewsletterLinks />
    </div>
  );
};

export default Newsletter;
