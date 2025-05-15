// src/modules/home/HomeContent.tsx
import BotMaker from '@/modules/components/Bot/BotMaker';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import BlogIndex from './components/blog/BlogIndex';
import FAQ from './components/faq/FAQ';
import Hero from './components/hero/Hero';
import MasterclassLazy from './components/masterclass/MasterclassLazy';
import Ofertas from './components/ofertas/Ofertas';
import OportunidadesLazy from './components/oportunidades/OportunidadesLazy';
import PubliNotas from './components/publi-notas/PubliNotas';
import TrustSectionLazy from './components/trust-section/hooks/TrustSectionLazy';

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
			<Ofertas lang={lang} />
			<BlogIndex />
			<PubliNotas />
			<FAQ />
			<NewsLetter />
			<Footer />
		</>
	);
}
