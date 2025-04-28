// src/modules/home/HomeContent.tsx
import Hero from './components/hero/Hero';
import OportunidadesLazy from './components/oportunidades/OportunidadesLazy';
import MasterclassLazy from './components/masterclass/MasterclassLazy';
import TrustSectionLazy from './components/trust-section/hooks/TrustSectionLazy';
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
      <OportunidadesLazy />
      <MasterclassLazy />
      <TrustSectionLazy />
      <Ofertas />
      <BlogIndex />
      <PubliNotas />
      <FAQ />
      <NewsLetter />
      <Footer />
    </>
  );
}
