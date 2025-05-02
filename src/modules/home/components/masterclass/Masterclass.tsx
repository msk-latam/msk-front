'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import ProfessionalCardDesktop from './ProfessionalCardDesktop';
import ProfessionalCardMobile from './ProfessionalCardMobile';
import { useMasterclassSection } from '@/modules/home/hooks/useMasterclassSection';
import { Professional } from '@/modules/home/types';
import { professionals as mockProfessionals } from './professionals';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname } from 'next/navigation';
import MasterclassSkeleton from '@/modules/home/skeletons/MasterclassSkeleton';

const Masterclass = () => {
	const {
		data: fetchedProfessionals,
		masterclass,
		link: masterclassLink,
		backgroundImage,
		loading,
		error,
	} = useMasterclassSection();

	const usingMock = !fetchedProfessionals?.length;
	const professionals: Professional[] = usingMock ? mockProfessionals : fetchedProfessionals;

	const pathname = usePathname();
	const lang = pathname.split('/')[1] || 'ar';

	const [current, setCurrent] = useState<number>(1);
	const [withTransition, setWithTransition] = useState(true);

	const nextSlide = () => setCurrent((prev) => prev + 1);
	const prevSlide = () => setCurrent((prev) => prev - 1);

	const handlers = useSwipeable({
		onSwipedLeft: nextSlide,
		onSwipedRight: prevSlide,
		trackMouse: true,
	});

	useEffect(() => {
		const interval = setInterval(nextSlide, 6000);
		return () => clearInterval(interval);
	}, [professionals]);

	const extendedProfessionals = [professionals[professionals.length - 1], ...professionals, professionals[0]];

	useEffect(() => {
		if (current === extendedProfessionals.length - 1) {
			setTimeout(() => {
				setWithTransition(false);
				setCurrent(1);
			}, 300);
		}
		if (current === 0) {
			setTimeout(() => {
				setWithTransition(false);
				setCurrent(extendedProfessionals.length - 2);
			}, 300);
		}
	}, [current, extendedProfessionals.length]);

	useEffect(() => {
		if (!withTransition) {
			setTimeout(() => setWithTransition(true), 50);
		}
	}, [withTransition]);

	const cardWidth = 320;
	const cardMarginRight = 16;
	const totalCardWidth = cardWidth + cardMarginRight;

	if (loading) return <MasterclassSkeleton />;
	if (error || professionals.length === 0) return null;

	const mainPro = professionals[0];

	return (
		<section
			aria-labelledby='masterclass-heading'
			className='relative -translate-y-0 w-full min-h-screen flex items-center justify-center text-white z-5 font-raleway'
		>
			<div className='absolute inset-0 bg-black/40 backdrop-blur-sm z-[1] md:hidden ' />
			<Image
				src={backgroundImage || '/images/masterclass/main-masterclass.png'}
				alt='Fondo sección Masterclass'
				fill
				className='object-cover object-center blur-3xl md:blur-none absolute inset-0 z-[1] brightness-75'
				priority
			/>

			<main className='relative z-10 h-full md:h-screen overflow-visible max-w-[1600px] mx-auto md:px-4 w-full py-11 mt-8 md:py-0 md:mt-0 flex flex-col justify-center md:px-20 md:mb-10'>
				<div className='h-full flex flex-col justify-center gap-10 md:flex-row md:items-center md:justify-between md:px-4'>
					{/* Texto Desktop */}
					<header className='hidden md:flex flex-col gap-16 text-center md:text-left md:max-w-2xl md:order-1'>
						{masterclass?.tags?.[0] && (
							<p className='border border-white rounded-full px-6 py-3 text-sm w-fit mx-auto md:mx-0 uppercase tracking-widest'>
								{masterclass?.tags[0]}
							</p>
						)}
						<div className='flex flex-col md:gap-6'>
							<h1 id='masterclass-heading' className=' md:text-[3rem] font-bold leading-tight text-white'>
								{masterclass?.title || 'Masterclass destacada'}
							</h1>
							<p className='text-sm md:text-lg opacity-80'>{masterclass?.description || 'Descripción no disponible'}</p>
						</div>
						<nav aria-label='Inscripción a Masterclass'>
							<Link
								//href={getLocalizedUrl(lang, new URL(masterclassLink ?? '#').pathname.replace('/producto/', '/tienda/'))}
								href={getLocalizedUrl(lang, masterclassLink || '')}
								className='bg-white text-black px-6 py-3 rounded-full font-semibold text-sm md:text-base flex items-center gap-2 w-fit mx-auto md:mx-0 hover:scale-105 transition'
							>
								Inscribite ahora
								<svg width='24' height='22' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M5.21582 12H19.2158M19.2158 12L12.2158 5M19.2158 12L12.2158 19'
										stroke='black'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</Link>
						</nav>
					</header>

					{/* Card Desktop */}
					<article className='md:order-2'>
						<ProfessionalCardDesktop
							pro={professionals[(current - 1 + professionals.length) % professionals.length]}
							current={(current - 1 + professionals.length) % professionals.length}
							total={professionals.length}
							onNext={nextSlide}
							onPrev={prevSlide}
						/>
					</article>
				</div>

				{/* Mobile */}
				{professionals.length === 1 ? (
					<div className='md:hidden w-full flex flex-col items-center pl-6 gap-6 z-[1]'>
						{masterclass?.tags?.[0] && (
							<h2 className='text-1xl border border-white rounded-full px-6 py-3 self-start uppercase tracking-widest'>
								{masterclass.tags[0]}
							</h2>
						)}
						<ProfessionalCardMobile pro={professionals[0]} />
					</div>
				) : (
					<section className='md:hidden w-full flex flex-col items-center pl-6 gap-6 overflow-x-hidden z-[1]'>
						{masterclass?.tags?.[0] && (
							<p className='border border-white rounded-full px-6 py-3 text-sm w-fit mx-auto md:mx-0 uppercase tracking-widest'>
								{masterclass?.tags[0]}
							</p>
						)}
						<div className='relative w-full overflow-hidden'>
							<div
								{...handlers}
								className={`flex ${withTransition ? 'transition-transform duration-500 ease-in-out' : ''}`}
								style={{
									transform: `translateX(-${current * totalCardWidth}px)`,
									width: `${extendedProfessionals.length * totalCardWidth}px`,
								}}
							>
								{extendedProfessionals.map((pro, i) => (
									<ProfessionalCardMobile key={i} pro={pro} />
								))}
							</div>
						</div>
					</section>
				)}
			</main>
		</section>
	);
};

export default Masterclass;
