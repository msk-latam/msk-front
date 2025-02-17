import ButtonSecondary from '@/components/Button/ButtonSecondary';
import NcLink from '@/components/NcLink/NcLink';
import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';
import ssr from '@/services/ssr';
import Link from 'next/link';
import React from 'react';
interface PageProps {
	params: { lang: string };
}
const BlogGuiasProfesionales = async ({ params }: PageProps) => {
	// Obtener el idioma actual desde params
	const currentCountry = 'ar';
	// const currentCountry = params.lang;
	const allBestSellers = await ssr.getBestSellers(currentCountry);
	return (
		<section id='guias-profesionales' className='py-8'>
			<div className='flex justify-between items-center'>
				<div>
					<h2 className='!font-raleway text-3xl font-medium text-[#392C35] mb-1'>Guías profesionales</h2>
					<p className='!font-inter text-[#6474A6] text-lg font-light mb-8'>
						Contenido de nivel académico y acceso gratuito
					</p>
				</div>
				<div>
					<Link href={'/tienda/?recurso=guias-profesionales'} className={` sm:block flex-shrink-0`}>
						<ButtonSecondary
							className='!leading-none border-solid border-1 border-neutral-200 text-neutral-400'
							sizeClass='px-3 py-2 sm:py-3 sm:px-6 text-[11px]'
						>
							<span className='text-[11px] sm:text-sm'>Ver más</span>
							<svg className='w-3 h-3 sm:w-5 sm:h-5 ml-3 rtl:rotate-180' viewBox='0 0 24 24' fill='none'>
								<path
									d='M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeMiterlimit='10'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M3.5 12H20.33'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeMiterlimit='10'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</ButtonSecondary>
					</Link>
				</div>
			</div>

			<SectionSliderBestSellers
				posts={allBestSellers}
				className='w-full section-slider-posts-container  !text-left'
				postCardName='card9'
				heading=''
				subHeading=''
				sliderStype='style2'
				uniqueSliderClass='pageBlog-section6'
			/>
		</section>
	);
};

export default BlogGuiasProfesionales;
