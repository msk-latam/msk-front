import CourseRequirements from '@/components/SingleProductDetail/Requirements/CourseRequirements';
import { FetchSingleProduct } from '@/data/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import { paymentLinks } from './LandingsVariables';
import LandingTemarioCTA from './LandingTemarioCTA';
import { courseReviewRefs } from '@/components/SingleProductDetail/EmbedSocial';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const LandingBody: FC<LandingProps> = ({ product, country }) => {
	const aboutCourse = product.params.slug === 'medicina-interna' ? 'Sobre el curso' : 'Sobre el programa';

	const aboutCourseBody =
		product.params.slug === 'medicina-interna'
			? 'Con el curso de Medicina interna de MSK, podrás mejorar tus competencias en la especialidad para ser capaz de llevar a cabo una práctica diaria al máximo nivel de responsabilidad, dirigida a resolver los procesos que afectan a los distintos órganos y sistemas del adulto. Tu aprendizaje tendrá el foco puesto en las patologías prevalentes, preparándote para promover la salud y prevenir la enfermedad de personas y colectivos que requieran tu atención. Al finalizar el curso de Medicina interna de MSK, habrás adquirido especiales habilidades para el razonamiento clínico y la toma de decisiones. También contarás con conocimientos científicos clave para el manejo básico de distintas enfermedades y procesos nosológicos, para determinar derivaciones a cirugía o subespecialistas y para aplicar correctamente diversos medios diagnósticos y terapéuticos, con el plus de haber aprendido sobre cómo informar adecuadamente al paciente y a sus familiares.'
			: `ACCSAP es el programa de actualización clínica bandera del American College of Cardiology. Se trata de una herramienta de formación utilizada por profesionales de todo el mundo para mantenerse al corriente de los últimos desarrollos de la cardiología. 
      ACCSAP. Programa de actualización en cardiología clínica está conformado por 10 módulos que abarcan temas como insuficiencia cardíaca y miocardiopatías, trastornos sistémicos que afectan al aparato circulatorio, enfermedad valvular, enfermedad pericárdica y trastornos de la circulación pulmonar, entre otros.`;

	const bannerImagesDesktop =
		product.params.slug === 'medicina-interna'
			? '/webp-images/landing-images/banner-medicina-interna-desktop.webp'
			: '/webp-images/landing-images/banner-accsap-desktop.webp';
	const bannerImagesMobile =
		product.params.slug === 'medicina-interna'
			? '/webp-images/landing-images/banner-medicina-interna-mobile.webp'
			: '/webp-images/landing-images/banner-accsap-mobile.webp';

	const bell = '/webp-images/landing-icons/campana.svg';

	const productSlug = product?.params?.slug || '';
	const paymentLink = paymentLinks[country]?.[productSlug] || '#';
	const slug = product.params.slug;

	const dataRef = courseReviewRefs[slug] ? courseReviewRefs[slug] : courseReviewRefs['general'];

	useEffect(() => {
		console.log('cargando embed');
		if (!document.getElementById('EmbedSocialHashtagScript')) {
			const script = document.createElement('script');
			script.id = 'EmbedSocialHashtagScript';
			script.src = 'https://embedsocial.com/cdn/ht.js';
			script.async = true;
			document.head.appendChild(script);
		}
		// return () => {
		//   console.log('removiendo embed');
		//   document.body.removeChild(script);
		// };
	}, [dataRef]);

	return (
		<>
			<div className='my-6'>
				<h2 className='text-2xl mb-2 font-light text-[#392C35]'> {aboutCourse} </h2>
				<p className='text-[#392C35]  text-lg whitespace-pre-line'> {aboutCourseBody} </p>

				<div className='my-8'>
					<LandingTemarioCTA product={product} country={country} />
				</div>

				<div className='embedsocial-hashtag' data-ref={dataRef}></div>

				{/* <div className='block md:hidden mt-6'>
					<Link href={paymentLink} target='_blank' rel='noopener noreferrer'>
						<Image src={bannerImagesMobile} alt='Banner Mobile' width={500} height={300} className='w-full h-auto' />
					</Link>
				</div>

				<div className='hidden md:block'>
					<Link href={paymentLink} target='_blank' rel='noopener noreferrer'>
						<Image src={bannerImagesDesktop} alt='Banner Desktop' width={1000} height={500} className='w-full h-auto' />
					</Link>
				</div> */}

				{/* <div className='lg:flex block my-4 lg:justify-between'>
					{product.params.slug === 'accsap' && (
						<div className='flex  gap-4 px-6 lg:px-10 py-4 bg-[#F5F8FF] rounded-md my-6 lg:my-0'>
							<Image src={bell} alt='bell' width={80} height={80} />
							<p className='w-[27.7rem] font-medium text-sm text-[#6474A6]'> {accsapTranslateMessage} </p>
						</div>
					)}
					{product.requirements && (
						<CourseRequirements title='Qué necesitas' requirements={product.requirements} requireImage={false} />
					)}
				</div> */}
			</div>
		</>
	);
};

export default LandingBody;
