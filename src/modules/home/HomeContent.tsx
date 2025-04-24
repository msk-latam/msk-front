// src/modules/home/HomeContent.tsx
import Hero from './components/hero/Hero';
import Oportunidades from './components/oportunidades/Oportunidades';
import Masterclass from './components/masterclass/Masterclass';
import TrustSection from './components/trust-section/TrustSection';
import Ofertas from './components/ofertas/Ofertas';
import BlogIndex from './components/blog/BlogIndex';
import PubliNotas from './components/publi-notas/PubliNotas';
import FAQ from './components/faq/FAQ';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import Footer from '@/modules/components/footer/footer';
import BotMaker from '@/modules/components/Bot/BotMaker';
import Navbar from '@/modules/components/navbar/Navbar';

type Props = {
    lang: string;
  };
  
  export default function HomeContent({ lang }: Props) {
  return (
    <>
      <Navbar />
      <Hero />
      <BotMaker />
      <Oportunidades />
      <Masterclass />
      <TrustSection />
      <Ofertas />
      <BlogIndex />
      <PubliNotas />
      <FAQ />
      <NewsLetter />
      <Footer />
    </>
  );
}
