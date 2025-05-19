'use client';

import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import { ChevronRight } from 'react-feather';
import { RiHome6Line } from 'react-icons/ri';
// import { useCourseHeader } from '../hooks/useCourseHeader';
import SkeletonBlogHeader from '../skeletons/SkeletonBlogHeader';
import { supportedLanguages } from '@/config/languages';

interface CourseHeaderProps {
	// slug: string;
	lang: string;
}

export default function BlogHeader({}: CourseHeaderProps) {
	// const { data, loading, error } = useBlogHeader(slug, lang);
	const router = useRouter();
	const pathname = usePathname();
	// const firstSegment = pathname?.split('/')[1];

	// if (loading) {
	// 	return <SkeletonBlogHeader />;
	// }

	// if (error || !data) {
	// 	return (
	// 		<div className='px-4 md:px-10 lg:px-20 max-w-[1300px] mx-auto h-96 flex justify-center items-center text-white'>
	// 			<h1 className='text-3xl sm:text-4xl font-bold text-center'>Este curso actualmente no tiene información.</h1>
	// 		</div>
	// 	);
	// }

	// const { title, has_certificate, categories } = data;

	// // ✅ Función que maneja el click en categoría
	// const handleSpecialtyClick = (specialtyName: string) => {
	// 	const specialtySlug = specialtyName
	// 		.toLowerCase()
	// 		.replace(/\s+/g, '-')
	// 		.normalize('NFD')
	// 		.replace(/[\u0300-\u036f]/g, '')
	// 		.replace(/[^a-z0-9-]/g, '');

	// 	const storeUrl = `${getLocalizedUrl(lang, '/tienda')}/${specialtySlug}`;
	// 	router.push(storeUrl);
	// };
	// const pathname = usePathname();
	const firstSegment = pathname?.split('/')[1];
	const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';
	// ✅ Esta es la verdadera URL que deberías usar en el logo
	// const homeUrl = lang === 'ar' ? '/' : `/${lang}`;


	return (
		<div className='px-4 overflow-visible max-w-[1600px] md:px-14 mx-auto min-h-96 h-fit flex md:flex-col md:justify-end md:items-start flex-row flex-wrap justify-center items-center text-white'>
			<div className='text-sm text-white md:mb-14 md:mt-0 mt-20 mb-16 w-full h-fit'>
				{/* Breadcrumbs */}
				<nav className='flex overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-full gap-1 font-raleway font-medium mb-4'>
					
    			<Link href={getLocalizedUrl(lang, '/home')} className='my-auto shrink-0'>
						<RiHome6Line className='text-white my-auto' />
					</Link>
					{/* <span className='shrink-0'>
						<ChevronRight />
					</span> */}

					{/* Tienda ahora es Link */}
					{/* <Link href={getLocalizedUrl(lang, '/tienda')} className='truncate my-auto shrink-0 hover:underline'>
						<span className='block md:hidden'>...</span>
						<span className='hidden md:block'>Tienda</span>
					</Link> */}
					{/* {categories
						.filter((spec) => spec.is_primary)
						.map((spec) => (
							<span key={spec.term_id} className='flex items-center'>
								<span className='shrink-0'>
									<ChevronRight />
								</span>
								<button
									type='button'
									onClick={() => handleSpecialtyClick(spec.name)}
									className='truncate my-auto shrink-0 hover:underline bg-transparent text-white border-0 p-0 m-0 cursor-pointer'
								>
									{spec.name}
								</button>
							</span>
						))} */}

					{/* Último: el título del curso en bold */}
					<span className='shrink-0'>
						<ChevronRight />
					</span>
					{/* <span className='truncate font-bold my-auto'>{title}</span> */}
										<span className='truncate font-bold my-auto'>Blog</span>

				</nav>

				{/* Título principal */}
				{/* <h1 className='md:text-[51px] leading-none text-3xl text-white font-bold text-center md:text-left mt-5 mb-3'>{title}</h1> */}
								<h1 className='md:text-[51px] leading-none text-3xl text-white font-bold text-center md:text-left my-6'>Ésta página está en construcción</h1>


				{/* Certificación */}
				{/* {has_certificate && ( */}
					{/* <p className='flex items-center gap-2 text-sm md:text-[16px] md:mt-4 font-raleway font-semibold text-white md:justify-normal justify-center mb-4'>
						<img src='/icons/certificado.svg' className='w-4 h-4' alt='certificado' />
						Con certificación
					</p>
				{/* )} */}

				{/* Etiquetas de categorías */}
				{/* <div className='flex flex-wrap items-center md:items-start justify-center md:justify-normal gap-2'>
					 {categories.map((spec) => ( 
						<span
							// key={spec.term_id}
							className='bg-black/20 text-white text-xs font-inter font-normal px-5 py-2 rounded-full cursor-pointer hover:bg-black/30'
							// onClick={() => handleSpecialtyClick(spec.name)}
						>
							{spec.name}
						</span>
					 ))}
				</div>  */}
			</div>
		</div>
	);
}
