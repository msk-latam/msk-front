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
			<h2 className='text-2xl font-bold mb-4'>Guías Profesionales</h2>
			<p>Contenido de la sección Guías Profesionales...</p>

			<SectionSliderBestSellers
				posts={allBestSellers}
				className='w-full section-slider-posts-container px-12 md:px-4 !text-left'
				postCardName='card9'
				heading='Guías profesionales'
				subHeading='Contenido de nivel académico y acceso gratuito'
				sliderStype='style2'
				uniqueSliderClass='pageBlog-section6'
			/>
		</section>
	);
};

export default BlogGuiasProfesionales;
