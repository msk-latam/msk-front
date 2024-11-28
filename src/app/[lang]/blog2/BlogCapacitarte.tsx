import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';
import ssr from '@/services/ssr';
import React from 'react';
interface PageProps {
	params: { lang: string };
}

const BlogCapacitarte = async ({ params }: PageProps) => {
	// Obtener el idioma actual desde params
	const currentCountry = params.lang;
	const allBestSellers = await ssr.getBestSellers(currentCountry);
	console.log(allBestSellers);
	return (
		<section className='py-8'>
			<div className=' md:rounded-[40px] bg-neutral-100 dark:bg-black dark:bg-opacity-20  relative py-8 md:py-16 mb-[96px] xl:w-[129%] left-1/2 transform -translate-x-1/2  w-screen -mt-10'>
				<SectionSliderBestSellers
					posts={allBestSellers}
					// loading={loadingBestSellers}
					className='w-full section-slider-posts-container px-12 md:px-4'
					postCardName='card9'
					heading='Nuestros cursos más elegidos'
					subHeading='Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!'
					sliderStype='style2'
					uniqueSliderClass='pageNewHome-section6'
				/>
			</div>
		</section>
	);
};

export default BlogCapacitarte;
