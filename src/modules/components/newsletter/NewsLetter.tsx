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
    <div className="w-full px-4 md:px-20 flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
      {/* Newsletter superior */}
      <div className="bg-[#35383E] w-full max-w-[343px] md:max-w-screen-xl md:-mt-14 -mt-8 p-6 md:py-6 md:px-10 md:rounded-[38px] rounded-[38px] z-5 flex flex-col md:flex-row  justify-between gap-4 md:gap-8 mx-auto">
        
        {/* Título */}
        <div className="md:w-[200px] shrink-0">
          <p className="text-white text-left md:text-[18px] text-[22px] font-raleway font-semibold text-base  ">
            Nuestro <br className="hidden md:block" /> newsletter
          </p>
        </div>

        {/* Separador */}
        <div className="hidden md:block w-[1px] h-[70px] bg-[#5A5F67] -ml-8" />

        {/* Descripción */}
        <div className="text-[16px] md:text-[18px] text-white text-left md:flex-1 font-inter">
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
            className="w-full md:w-[478px] h-[52px] md:h-[64px] px-4 py-2 text-black rounded-full focus:outline-none border md:border-0 font-inter md:text-sm text-[16px]"
            required
          />

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full md:w-[160px] h-[52px] bg-[#9400D3] hover:bg-[#7A00B6] text-white px-7 py-3.5 rounded-[38px] flex items-center justify-center gap-2 transition-colors md:ml-2"
          >
            <span className="text-sm font-inter">Suscribirme</span>
            {!submitted && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              
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
