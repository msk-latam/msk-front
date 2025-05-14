// app/[lang]/tienda/[category]/CategoryLayout.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/modules/components/navbar/Navbar';
import Tienda from '@/modules/store-category/StoreCategory';
import TiendaHeader from '../../../../modules/store-category/components/StoreCategoryHeader';
import BotMaker from '@/modules/components/Bot/BotMaker';
import FAQ from '@/modules/home/components/faq/FAQ';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import Footer from '@/modules/components/footer/footer';
import { StoreProvider } from '@/context/storeFilters/StoreProvider';

export default function CategoryLayout({ category, lang }: { category: string; lang: string }) {
	return (
		<>
			<header
				className='w-full h-[400px] overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
          linear-gradient(180deg, rgba(0, 0, 0, 0) 32.33%, rgba(0, 0, 0, 0.4) 88.46%),
          linear-gradient(360deg, rgba(0, 0, 0, 0) 43.69%, rgba(0, 0, 0, 0.2) 100%)`,
				}}
			>
				<Navbar />
				<TiendaHeader category={category} />
			</header>
			<StoreProvider>
				<BotMaker />
				<Tienda category={category} country={lang} lang={lang} />
				<FAQ />
				<NewsLetter />
				<Footer />
			</StoreProvider>
		</>
	);
}
