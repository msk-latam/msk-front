import React from 'react';
import Hero from './Hero';
import Oportunidades from './Oportunidades';
import Masterclass from './Masterclass';
import TrustSection from './TrustSection';
import Ofertas from './Ofertas';
import BlogIndex from './BlogIndex';
import PubliNotas from './PubliNotas';
import FAQ from './FAQ';
import NewsLetter from './NewsLetter';

const HomePage = () => {
	return (
		<div className=''>
			<Hero />
			<Oportunidades />
			<Masterclass />
			<TrustSection />
			<Ofertas />
			<BlogIndex />
			<PubliNotas />
			<FAQ />
			<NewsLetter />
		</div>
	);
};

export default HomePage;
