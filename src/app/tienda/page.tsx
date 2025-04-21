'use client';

import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import StoreCourses from '@/modules/store/components/StoreCourses';
import StoreFilters from '@/store/components/StoreFilters';
import StoreHeader from '@/store/components/StoreHeader';
import { Suspense } from 'react';
/* store components */

export default function TiendaPage() {
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

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20  md:mb-0'>
				<section className='w-full  -mt-[40px]  z-[10] relative overflow-visible max-w-[1400px] mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-[333px_1fr] gap-5 '>
						<Suspense fallback={<div>Cargando filtros...</div>}>
							<StoreFilters />
						</Suspense>
						<Suspense fallback={<div>Cargando cursos...</div>}>
							<StoreCourses />
						</Suspense>
					</div>
				</section>
			</main>

			<NewsLetter />
			<Footer />
		</>
	);
}
// export default function TiendaPage() {
// 	return (
// 		<>
// 			{/* HEADER CON GRADIENTE */}
// 			<div
// 				className='w-full h-[180px] sm:h-[290px] overflow-hidden m-0 p-0'
// 				style={{
// 					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
//                        linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
// 				}}
// 			>
// 				<Navbar />
// 				<HeaderTitle />
// 			</div>

// 			<div className='max-w-screen-xl mx-auto px-4 py-10'>
// 				<div className='flex gap-6'>
// 					<FilterSidebar />

// 					<section className='w-full lg:w-3/4'>
// 						<div className='flex justify-between mb-6'>
// 							<div>
// 								<button className='text-sm font-medium'>Filtros (2)</button>
// 								<input type='text' placeholder='Buscar' className='ml-4 px-3 py-1 border rounded-md text-sm' />
// 							</div>
// 							<div>
// 								<label className='text-sm font-medium'>Ordenar por </label>
// 								<select className='ml-2 border rounded-md px-2 py-1 text-sm'>
// 									<option value='novedades'>Novedades</option>
// 								</select>
// 							</div>
// 						</div>

// 						<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
// 							{Array.from({ length: 12 }).map((_, i) => (
// 								<CourseCard
// 									key={i}
// 									title='Iniciación a la investigación en enfermería'
// 									subtitle='Tropos'
// 									hours={600}
// 									tags={['Medicina General', 'Actualidad']}
// 									imageUrl='https://via.placeholder.com/393x180'
// 								/>
// 							))}
// 						</div>

// 						<Pagination totalPages={4} currentPage={1} onPageChange={() => {}} />
// 					</section>
// 				</div>
// 			</div>

// 			<FAQ />
// 			<NewsLetter />
// 			<Footer />
// 		</>
// 	);
// }
