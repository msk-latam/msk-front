'use client';

import { useEffect, useState, useRef } from 'react';
import { useCourseTeachers } from '../hooks/useCourseTeachers';
import SkeletonCourseTeachers from '../skeletons/SkeletonCourseTeachers';

interface CourseTeachersProps {
	slug: string;
	lang: string;
	onHideEmpty?: () => void;
}

const ITEMS_PER_PAGE = 4;

export default function CourseTeachers({ slug, lang, onHideEmpty }: CourseTeachersProps) {
	const { data, loading, error } = useCourseTeachers(slug, lang);
	const [page, setPage] = useState(0);

	// Scroll automático al equipo docente si el hash lo indica
	useEffect(() => {
		if (!loading && data?.length && typeof window !== 'undefined') {
			const hash = window.location.hash;
			if (hash === '#equipo-docente') {
				const el = document.getElementById('equipo-docente');
				if (el) {
					setTimeout(() => {
						el.scrollIntoView({ behavior: 'smooth', block: 'start' });
					}, 100);
				}
			}
		}
	}, [loading, data]);

	const hasNotified = useRef(false);

	const isEmpty = !data || data.length === 0;

	useEffect(() => {
		if (!hasNotified.current && !loading && (error || isEmpty)) {
			onHideEmpty?.();
			hasNotified.current = true;
		}
	}, [loading, error, isEmpty, onHideEmpty]);
	if (loading) return <SkeletonCourseTeachers />;
	if (error || !data || data.length === 0) return null;

	const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
	const start = page * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	const currentData = data.slice(start, end);

	return (
		<>
			<style>{`
				html {
					scroll-behavior: smooth;
				}
			`}</style>

			<section
				className='bg-white rounded-[38px] px-6 md:px-0 max-w-5xl py-12 space-y-8'
				id={slug === 'administracion-y-gestion-hospitalaria' ? 'equipo-docente' : undefined}
			>
				<h2 className='text-[24px] md:text-[32px] font-raleway md:text-left text-center text-[#1A1A1A] mb-6'>
					Equipo docente
				</h2>

				{/* Mobile: paginado */}
				<div className='block md:hidden space-y-6'>
					{currentData.map((teacher, idx) => {
						const name = teacher.name ?? 'Docente sin nombre';
						const title = teacher.description ?? 'Sin descripción disponible';
						const image =
							typeof teacher.image === 'string' && teacher.image !== ''
								? teacher.image
								: 'https://wp.msklatam.com/wp-content/themes/oceano2/assets/media/user-default.png';

						return (
							<div key={idx} className='flex items-start gap-4'>
								<div className='w-24 h-24 rounded-[24px] overflow-hidden'>
									<img src={image} alt={name} className='w-full h-full object-cover aspect-square' />
								</div>
								<div className='flex flex-col'>
									<p className='font-raleway font-semibold text-[#1A1A1A]'>{name}</p>
									<p className='text-sm font-inter font-normal text-[#5A5F67]'>{title}</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Desktop: grid completo */}
				<div className='hidden md:grid md:grid-cols-2 gap-8'>
					{currentData.map((teacher, idx) => {
						const name = teacher.name ?? 'Docente sin nombre';
						const title = teacher.description ?? 'Sin descripción disponible';
						const image =
							typeof teacher.image === 'string' && teacher.image !== ''
								? teacher.image
								: 'https://wp.msklatam.com/wp-content/themes/oceano2/assets/media/user-default.png';

						return (
							<div key={idx} className='flex items-start gap-4'>
								<div className='w-24 h-24 rounded-[24px] overflow-hidden bg-white flex-shrink-0'>
									<img src={image} alt={name} className='w-full h-full object-cover' />
								</div>
								<div className='flex flex-col'>
									<p className='font-raleway font-semibold text-[#1A1A1A]'>{name}</p>
									<p className='text-sm font-inter font-normal text-[#5A5F67]'>{title}</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Paginación para todas las vistas */}
				{totalPages > 1 && (
					<div className='flex justify-center items-center gap-6 mt-10'>
						<button
							onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
							disabled={page === 0}
							className='w-8 h-8 flex items-center justify-center rounded-[20px] border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30'
						>
							&lt;
						</button>

						<div className='flex items-center gap-2 text-sm text-gray-700 font-medium'>
							{Array.from({ length: totalPages }).map((_, i) => {
								const isFirst = i === 0;
								const isLast = i === totalPages - 1;
								const isNearCurrent = Math.abs(i - page) <= 1;
								const shouldShow = isFirst || isLast || isNearCurrent || Math.abs(i - page) === 2;

								if (!shouldShow) return null;

								const isEllipsisBefore = i > 1 && i === page - 2 && i !== 1;
								const isEllipsisAfter = i < totalPages - 2 && i === page + 2 && i !== totalPages - 2;

								return (
									<span key={i} className='flex items-center'>
										{isEllipsisBefore || isEllipsisAfter ? (
											<span className='px-1'>...</span>
										) : (
											<span
												onClick={() => setPage(i)}
												className={`cursor-pointer px-2 ${i === page ? 'text-black font-bold' : ''}`}
											>
												{i + 1}
											</span>
										)}
									</span>
								);
							})}
						</div>

						<button
							onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
							disabled={page === totalPages - 1}
							className='w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30'
						>
							&gt;
						</button>
					</div>
				)}
			</section>
		</>
	);
}
