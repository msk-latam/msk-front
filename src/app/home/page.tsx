'use client';

import '@/app/globals.css';

import Hero from '@/modules/home/components/hero/Hero';
import Oportunidades from '@/modules/home/components/oportunidades/Oportunidades';
import Masterclass from '@/modules/home/components/masterclass/Masterclass';
import TrustSection from '@/modules/home/components/trust-section/TrustSection';
import Ofertas from '@/modules/home/components/ofertas/Ofertas';
import BlogIndex from '@/modules/home/components/blog/BlogIndex';
import PubliNotas from '@/modules/home/components/publi-notas/PubliNotas';
import FAQ from '@/modules/home/components/faq/FAQ';
import NewsLetter from '@/modules/home/components/newsletter/NewsLetter';
import Footer from '@/modules/home/components/footer/footer';
import BotMaker from '@/modules/components/Bot/BotMaker';

export default function Home() {
  return (
    <main className="bg-white text-neutral-900">
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
