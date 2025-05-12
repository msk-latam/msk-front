'use client';

import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import StoreCoursesSkeleton from '@/modules/store/components/skeletons/StoreCoursesSkeleton';
import StoreFiltersSkeleton from '@/modules/store/components/skeletons/StoreFiltersSkeleton';
import StoreCourses from '@/modules/store/components/StoreCourses';
import StoreFilters from '@/store/components/StoreFilters';
import StoreHeader from '@/store/components/StoreHeader';
import { Suspense, useState } from 'react';

export default function TiendaLayout({ lang, category = null }: { lang: string; category?: string | null }) {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	const isRecurso = ['curso', 'guias-profesionales', 'especialidades'].includes(category ?? '');

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
				<StoreHeader />
			</header>

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20 md:mb-0'>
				<section className='w-full -mt-[40px] z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4'>
					<div className='grid grid-cols-1 md:grid-cols-[333px_1fr] gap-5'>
						{/* Desktop filters */}
						<div className='hidden md:block'>
							<Suspense fallback={<StoreFiltersSkeleton />}>
								<StoreFilters />
							</Suspense>
						</div>

						{/* Mobile filters modal */}
						<Suspense fallback={null}>
							<StoreFilters isMobile isModalOpen={isFilterModalOpen} onModalClose={() => setIsFilterModalOpen(false)} />
						</Suspense>

						<Suspense fallback={<StoreCoursesSkeleton />}>
							<StoreCourses onOpenFilters={() => setIsFilterModalOpen(true)} lang={lang} />
						</Suspense>
					</div>
				</section>
			</main>

			<NewsLetter />
			<Footer />
		</>
	);
}
