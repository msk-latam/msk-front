'use client';

import { useHeroContent } from '@/modules/home/hooks/useHeroContent';
import HeroSkeleton from '@/modules/home/skeletons/HeroSkeleton';
import { HeroSlide } from '@/modules/home/types';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import Head from 'next/head';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';
import HeroHighlights from './HeroHighlights';
import PlayPauseButton from './PlayPauseButton';

const Hero = () => {
	const { data, loading } = useHeroContent();
	const slides: HeroSlide[] = data?.slides || [];
	const backgroundImages = slides.map((s) => s.background_image?.[0]).filter(Boolean);

	const [currentSlide, setCurrentSlide] = useState(0);
	const [animationKey, setAnimationKey] = useState(0);
	const [paused, setPaused] = useState(false);

	const pathname = usePathname();
	const lang = pathname?.split('/')[1] || 'ar';

	useEffect(() => {
		if (paused || slides.length === 0) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 8000);
		return () => clearInterval(interval);
	}, [paused, slides.length]);

	useEffect(() => {
		setAnimationKey((prev) => prev + 1);
	}, [currentSlide]);

	const handleSelect = (index: number) => {
		setCurrentSlide(index);
		setPaused(true);
		setTimeout(() => setPaused(false), 8000);
	};

	if (loading) return <HeroSkeleton />;
	if (slides.length === 0) return null;

	const current = slides[currentSlide];
	const firstHeroImage = backgroundImages[0];
	console.log('CTA title:', JSON.stringify(current.cta?.title));
	const normalize = (str?: string) =>
		str
			?.trim()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');

	return (
		<>
			{firstHeroImage && (
				<Head>
					<link rel='preload' as='image' href={firstHeroImage} />
				</Head>
			)}

			<div className='relative md:h-[800px] h-[600px] w-full bg-black text-white px-4 overflow-hidden pt-[150px]'>
				<PlayPauseButton paused={paused} onToggle={() => setPaused((prev) => !prev)} />

				<HeroCarousel slides={backgroundImages} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

				<div className='absolute inset-0'>
					<div className='px-5 py-3 md:mt-40 md:py-0 overflow-visible max-w-[1600px] md:px-6 mx-auto h-[80%] md:h-[71%] flex flex-col justify-center items-center md:justify-end text-center gap-0 md:items-start md:text-left md:gap-2'>
						<div className='md:px-6 w-full flex flex-col justify-center items-center md:justify-end text-center gap-0 md:items-start md:text-left md:gap-2'>
							{/* Tag dinámico */}

							{/* Título + botón alineados como antes */}
							<div className='w-full grid md:grid-cols-[1fr_auto] gap-4 mt-10 md:mt-2 md:items-start'>
								{/* Título con estructura fija y estilo dinámico */}
								<div className='md:min-h-[130px] md:max-w-[1100px] w-full'>
									<h1
										className='text-[2rem] md:text-5xl text-white leading-tight md:min-w-full md:text-[60px] font-bold font-Raleway'
										dangerouslySetInnerHTML={{
											__html: current.title
												.replace(/<span>/gi, `<br><span class="not-italic font-lora-italic">`)
												.replace(/<\/span>/gi, `</span>`),
										}}
									></h1>
									<p className='text-white text-base font-Raleway font-semibold mt-4'>{current.subtitle}</p>
								</div>

								{/* Botón CTA */}
								<div className='w-full md:w-auto flex justify-center md:justify-end md:pt-[2.5rem]'>
									<Link
										href={getLocalizedUrl(
											lang,
											normalize(current.cta?.title) === 'registrate ahora' ? '/login' : current.cta?.url || '/tienda',
										)}
										className='bg-white text-black px-5 py-3 rounded-full text-[14px] hover:scale-105 transition flex items-center gap-2'
									>
										{current.cta?.title || 'Comenzá tu experiencia'}
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='18'
											height='18'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth='2'
											className='mt-[1px]'
										>
											<path strokeLinecap='round' strokeLinejoin='round' d='M14 5l7 7-7 7M3 12h18' />
										</svg>
									</Link>
								</div>
							</div>
						</div>

						{/* Highlights sincronizados */}
						<HeroHighlights
							currentSlide={currentSlide}
							highlights={slides.map((s) => s.title.replace(/<\/?[^>]+(>|$)/g, ''))}
							onSelect={handleSelect}
							animationKey={animationKey}
							paused={paused}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
