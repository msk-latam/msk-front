'use client';

import { useState } from 'react';
import '@/app/globals.css';
import Hero from '@/modules/home/components/hero/Hero';
import Oportunidades from '@/modules/home/components/oportunidades/Oportunidades';
import Masterclass from '@/modules/home/components/masterclass/Masterclass';
import TrustSection from '@/modules/home/components/trust-section/TrustSection';
import Ofertas from '@/modules/home/components/ofertas/Ofertas';
import BlogIndex from '@/modules/home/components/blog/BlogIndex';
import PubliNotas from '@/modules/home/components/publi-notas/PubliNotas';
import FAQ from '@/modules/home/components/faq/FAQ';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import Footer from '@/modules/components/footer/footer';
import BotMaker from '@/modules/components/Bot/BotMaker';
import Navbar from '@/modules/components/navbar/Navbar';
import PopUp from '@/modules/components/PopUp';

export default function Home() {
  const [showPopUp, setShowPopUp] = useState(true);


  return (
    <main className={`bg-white text-neutral-900 transition-all duration-500 ease-in-out ${showPopUp ? 'md:pt-12' : 'md:pt-0'}`}>
      {showPopUp && <PopUp onClose={() => setShowPopUp(false)} />}
      <Navbar />
      <Hero />
      <BotMaker/>
      <Oportunidades />
      <Masterclass />
      <TrustSection />
      <Ofertas />
      <BlogIndex />
      <PubliNotas />
      <FAQ />
      <NewsLetter />
      <Footer />
    </main>
  );
}
