'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useCourseReviews } from '../hooks/useCourseReviews';
import { ReviewItem } from '../types/types';
import GradientBackground from './GradientBackground';

interface CourseTestimonialsProps {
	slug: string;
	lang: string;
}

export default function CourseTestimonials({ slug, lang }: CourseTestimonialsProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const { data, loading, error } = useCourseReviews(slug, lang);

	const scroll = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const scrollAmount = carouselRef.current.offsetWidth * 0.8;
			carouselRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	if (loading) return <div className='py-16 text-center text-white'>Cargando testimonios...</div>;
	if (error || !data) return <div className='py-16 text-center text-white'>Error cargando los datos</div>;

	return (
		<GradientBackground>
			<section className='flex flex-col py-16 pt-48 pl-6 text-white md:pt-60 md:block space-y-96 md:space-y-2'>
				<div className='max-w-screen-xl pr-6 mx-auto text-left md:mb-0 '>
					<h2 className='text-[32px] md:text-[52px] font-raleway font-bold mb-4 leading-snug'>
						Sé parte de nuestra comunidad <br className='hidden md:inline' />
						de profesionales
					</h2>
					<p className='text-base md:text-[32px] font-raleway font-normal mb-6'>
						¡La próxima historia de éxito puede ser tuya!
					</p>

					<div className='flex items-center justify-start gap-2 mb-8 md:mb-32'>
						<div className='flex -space-x-2'>
							{data?.slice(0, 3).map((t: ReviewItem, i: number) => (
								<img
									key={i}
									src={t.picture}
									alt={`User ${i}`}
									className='object-cover w-8 h-8 border-2 border-white rounded-full'
								/>
							))}
						</div>
						<div className='text-left text-white'>
							<strong className='text-lg font-bold font-raleway'>+18.000 profesionales</strong>
							<br />
							<p className='text-base font-raleway font-extralight'>ya se capacitaron con nosotros</p>
						</div>
					</div>
				</div>

				{/* Carrusel con botones superpuestos */}
				<div className='moverflow-visible max-w-[1400px] mx-auto w-full relative group'>
					<div
						ref={carouselRef}
						className='flex gap-6 px-1 overflow-x-auto scroll-smooth snap-x snap-mandatory md:px-0 scrollbar-hide'
					>
						{data?.map((t: ReviewItem, idx: number) => (
							<div
								key={idx}
								className='min-w-[85%] sm:min-w-[45%] md:min-w-[calc((100%-theme(spacing.12))/3)] snap-start
                bg-white/50 backdrop-blur-md text-white
                rounded-[30px] p-6 shadow-md'
							>
								<div className='flex items-center gap-4 mb-4'>
									<img src={t.picture} alt={t.name} className='object-cover w-10 h-10 rounded-full' />
									<p className='text-sm font-normal font-inter'>{t.name}</p>
								</div>
								<p className='text-sm font-normal text-white font-inter' dangerouslySetInnerHTML={{ __html: t.review }} />
								<div className='mt-4 text-sm text-right text-white'>{t.stars}/5 ★</div>
							</div>
						))}
					</div>

					{/* Botones - aparecen al hacer hover sobre el grupo */}
					<button
						onClick={() => scroll('left')}
						className='absolute z-10 hidden p-2 text-white -translate-y-1/2 border border-white rounded-full shadow md:flex -left-14 top-1/2 hover:scale-105 '
					>
						<ChevronLeft className='w-5 h-5' />
					</button>
					<button
						onClick={() => scroll('right')}
						className='absolute z-10 hidden p-2 text-white -translate-y-1/2 border border-white rounded-full shadow md:flex -right-14 top-1/2 hover:scale-105'
					>
						<ChevronRight className='w-5 h-5' />
					</button>
				</div>
			</section>
		</GradientBackground>
	);
}
