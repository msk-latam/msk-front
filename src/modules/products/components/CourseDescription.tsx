'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCourseDescription } from '../hooks/useCourseDescription';
import CourseDescriptionSkeleton from '../skeletons/CourseDescriptionSkeleton'; // Importa el componente Skeleton

interface CourseDescriptionProps {
	slug: string;
	lang: string;
}

export default function CourseDescription({ slug, lang }: CourseDescriptionProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const { data, loading, error } = useCourseDescription(slug, lang);

	const MAX_LENGTH = 600;

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	if (loading) {
		return <CourseDescriptionSkeleton />;
	}

	const rawDescription = data?.content ?? '';
	const description = rawDescription;
	const title = data?.title ?? 'Descripción del curso';

	// Si hay error o no hay descripción, devuelve null
	if (error || !data?.content) return null;

	const displayDescription = isExpanded
		? description
		: description.length > MAX_LENGTH
		? description.slice(0, MAX_LENGTH) + '...'
		: description;

	// Reemplaza la lógica de "loading" con el Skeleton cuando los datos están cargando

	return (
		<section className='bg-white rounded-[38px] md:pt-7 md:pb-3'>
			<h1 className='text-2xl md:text-[34px] font-raleway font-medium mb-6 text-[#1A1A1A]'>{title}</h1>

			<article className='text-[#1A1A1A] text-sm font-inter font-light text-[16px] leading-[161%] relative'>
				<div
					className='m-0 font-inter text-base flex flex-col gap-2 [&>p]:font-inter [&>p]:text-base [&>p]:font-[400] [&>p]:m-0'
					dangerouslySetInnerHTML={{ __html: displayDescription }}
				/>

				{description.length > MAX_LENGTH && !isExpanded && (
					<div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
				)}
			</article>

			{description.length > MAX_LENGTH && (
				<motion.div
					className='flex justify-center mt-2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: 'easeOut' }}
				>
					<motion.button
						onClick={handleToggle}
						className='text-[#9200AD] text-sm flex items-center gap-2'
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 1, ease: 'easeOut' }}
					>
						{isExpanded ? 'Leer menos' : 'Leer más'}
						<motion.svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-chevron-down'
							viewBox='0 0 16 16'
							animate={{ rotate: isExpanded ? 180 : 0 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							<path d='M1 4.5a.5.5 0 0 1 .708-.708L8 9.293l6.292-5.5A.5.5 0 0 1 15 4.5l-7 6a.5.5 0 0 1-.708 0l-7-6z' />
						</motion.svg>
					</motion.button>
				</motion.div>
			)}
		</section>
	);
}
