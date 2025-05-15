'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCourseInstitutions } from '../../hooks/useCourseInstitutions';
import SkeletonCourseInstitutions from '../../skeletons/SkeletonCourseInstitutions';
import InfoIcon from './InfoIcon';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

interface CourseInstitutionProps {
	slug: string;
	lang: string;
	onHideEmpty?: () => void;
}

export default function CourseInstitutions({ slug, lang, onHideEmpty }: CourseInstitutionProps) {
	const { data: institutions, loading, error } = useCourseInstitutions(slug, lang);
	const hasNotified = useRef(false);

	useEffect(() => {
		if (!hasNotified.current && !loading && (!institutions || institutions.length === 0)) {
			onHideEmpty?.();
			hasNotified.current = true;
		}
	}, [loading, institutions, onHideEmpty]);

	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		mode: 'free-snap',
		slides: {
			perView: 1,
			spacing: 16,
		},
	});

	if (loading) return <SkeletonCourseInstitutions />;
	if (!institutions || institutions.length === 0) return null;

	return (
		<section className='md:py-3 text-left h-fit'>
			<h2 className='text-xl md:text-left text-center md:text-2xl text-[#1A1A1A] font-medium mb-6 w-fit mx-auto md:mx-0'>
				Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
			</h2>

			{/* Desktop grid */}
			<div className='hidden md:flex md:gap-3 gap-4 flex-wrap items-center justify-center md:px-0 px-2'>
				{institutions.map((inst) => (
					<InstitutionCard key={inst.id} inst={inst} />
				))}
			</div>

			{/* Mobile carousel */}
			<div ref={sliderRef} className='sm:keen-slider flex md:hidden'>
				{institutions.map((inst) => (
					<div key={inst.id} className='keen-slider__slide flex justify-center md:hidden'>
						<InstitutionCard inst={inst} />
					</div>
				))}
			</div>
		</section>
	);
}

function InstitutionCard({ inst }: { inst: any }) {
	return (
		<div className='bg-[#f7f9ff] rounded-[30px] p-7 h-32 flex items-center justify-center relative w-[250px]'>
			<Image
				src={inst.image}
				alt={inst.title}
				width={200}
				height={80}
				className='object-contain mix-blend-multiply max-h-[80px]'
			/>
			{inst.description && (
				<div className='absolute bottom-2 right-2 group'>
					<InfoIcon />
					<div className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2 bg-[#3B476C] text-white text-sm rounded-lg p-3 text-center pointer-events-none w-max max-w-[200px] z-10'>
						{inst.description}
						<div className='absolute w-3 h-3 bg-[#3B476C] transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-6px] z-[-1]'></div>
					</div>
				</div>
			)}
		</div>
	);
}
