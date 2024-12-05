import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';
import ssr from '@/services/ssr';
import React from 'react';
interface PageProps {
	params: { lang: string };
}
const BlogGuiasProfesionales = async ({ params }: PageProps) => {
	// Obtener el idioma actual desde params
	const currentCountry = params.lang;
	const allBestSellers = await ssr.getBestSellers(currentCountry);
	return (
		<section id='guias-profesionales' className='py-8'>
			<h2 className='!font-raleway text-3xl font-medium text-[#392C35] mb-1'>Guías profesionales</h2>
			<p className='!font-inter text-[#6474A6] text-lg font-light mb-8'>Contenido de la sección guías profesionales...</p>

			<SectionSliderBestSellers
				posts={allBestSellers}
				className='w-full section-slider-posts-container lg:px-12 md:px-4 !text-left'
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
