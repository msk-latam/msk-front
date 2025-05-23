'use client';

import { getLocalizedUrl } from '@/utils/getLocalizedUrl'; // 👈 Agregamos
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // 👈 Agregamos
import { BookOpen, ChevronRight } from 'react-feather';
import { RiHome6Line } from 'react-icons/ri';
import { useCourseHeader } from '../hooks/useCourseHeader';
import SkeletonCourseHeader from '../skeletons/SkeletonCourseHeader'; // Importa el Skeleton

interface CourseHeaderProps {
	slug: string;
	lang: string;
}

export default function CourseHeader({ slug, lang }: CourseHeaderProps) {
	const { data, loading, error } = useCourseHeader(slug, lang);
	const router = useRouter();
	const pathname = usePathname();
	const firstSegment = pathname?.split('/')[1];

	if (loading) {
		return <SkeletonCourseHeader />;
	}

	if (error || !data) {
		return (
			<div className='px-4 md:px-10 lg:px-20 max-w-[1300px] mx-auto h-96 flex justify-center items-center text-white'>
				<h1 className='text-3xl font-bold text-center sm:text-4xl'>Este curso actualmente no tiene información.</h1>
			</div>
		);
	}

	const { title, has_certificate, categories } = data.sections.header;

	// ✅ Función que maneja el click en categoría
	const handleSpecialtyClick = (specialtyName: string) => {
		const specialtySlug = specialtyName
			.toLowerCase()
			.replace(/\s+/g, '-')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9-]/g, '');

		const storeUrl = `${getLocalizedUrl(lang, '/tienda')}/${specialtySlug}`;
		router.push(storeUrl);
	};

	console.log(data);

	return (
		<div className='px-4 overflow-visible max-w-[1600px] md:px-14 mx-auto min-h-96 h-fit flex md:flex-col md:justify-end md:items-start flex-row flex-wrap justify-center items-center text-white'>
			<div className='w-full mt-20 mb-16 text-sm text-white md:mb-14 md:mt-0 h-fit'>
				{/* Breadcrumbs */}
				<nav className='flex max-w-full gap-1 mb-4 overflow-hidden text-sm font-medium whitespace-nowrap text-ellipsis font-raleway'>
					<Link href='/' className='my-auto shrink-0'>
						<RiHome6Line className='my-auto text-white' />
					</Link>
					<span className='shrink-0'>
						<ChevronRight />
					</span>

					{/* Tienda ahora es Link */}
					<Link href={getLocalizedUrl(lang, '/tienda')} className='my-auto truncate shrink-0 hover:underline'>
						<span className='block md:hidden'>...</span>
						<span className='hidden md:block'>Tienda</span>
					</Link>
					{categories
						.filter((spec) => spec.is_primary)
						.map((spec) => (
							<span key={spec.term_id} className='flex items-center'>
								<span className='shrink-0'>
									<ChevronRight />
								</span>
								<button
									type='button'
									onClick={() => handleSpecialtyClick(spec.name)}
									className='p-0 m-0 my-auto text-white truncate bg-transparent border-0 cursor-pointer shrink-0 hover:underline'
								>
									{spec.name}
								</button>
							</span>
						))}

					{/* Último: el título del curso en bold */}
					<span className='shrink-0'>
						<ChevronRight />
					</span>
					<span className='my-auto font-bold truncate'>{title}</span>
				</nav>

				{/* Título principal */}
				<h1 className='md:text-[51px] leading-none text-3xl text-white font-bold text-center md:text-left mt-5 mb-3'>
					{title}
				</h1>

				{data.resource === 'downloadable' && (
					<div className='flex items-center gap-2 text-sm'>
						<BookOpen className='' width={16} />
						<p className='flex items-center gap-2 text-sm md:text-[16px] md:mt-4 font-raleway font-semibold text-white md:justify-normal justify-center mb-4'>
							Guía profesional gratuita del curso superior de emergentología
						</p>
					</div>
				)}

				{has_certificate && (
					<p className='flex items-center gap-2 text-sm md:text-[16px] md:mt-4 font-raleway font-semibold text-white md:justify-normal justify-center mb-4'>
						<img src='/icons/certificado.svg' className='w-4 h-4' alt='certificado' />
						Con certificación
					</p>
				)}

				{/* Etiquetas de categorías */}
				<div className='flex flex-wrap items-center justify-center gap-2 md:items-start md:justify-normal'>
					{categories.map((spec) => (
						<span
							key={spec.term_id}
							className='px-5 py-2 text-xs font-normal text-white rounded-full cursor-pointer bg-black/20 font-inter hover:bg-black/30'
							onClick={() => handleSpecialtyClick(spec.name)}
						>
							{spec.name}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
