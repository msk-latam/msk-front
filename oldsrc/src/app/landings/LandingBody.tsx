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
			: country !== 'es'
			? `ACCSAP es el programa de actualización clínica bandera del American College of Cardiology. Se trata de una herramienta de formación utilizada por profesionales de todo el mundo para mantenerse al corriente de los últimos desarrollos de la cardiología. 
      ACCSAP. Programa de actualización en cardiología clínica está conformado por 10 módulos que abarcan temas como insuficiencia cardíaca y miocardiopatías, trastornos sistémicos que afectan al aparato circulatorio, enfermedad valvular, enfermedad pericárdica y trastornos de la circulación pulmonar, entre otros.`
			: 'El programa ACCSAP es la principal herramienta de actualización clínica del American College of Cardiology. Se trata del medio de formación continuada más importante de la especialidad, empleado por especialistas en Cardiología de todo el mundo para mantenerse al corriente de los últimos avances en el área.';

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
		// console.log('cargando embed');
		if (!document.getElementById('EmbedSocialHashtagScript')) {
			const script = document.createElement('script');
			script.id = 'EmbedSocialHashtagScript';
			script.src = 'https://embedsocial.com/cdn/ht.js';
			script.async = true;
			document.head.appendChild(script);
		}
	}, [dataRef]);

	return (
		<>
			<div className='my-6'>
				<h2 className='text-2xl mb-2 font-light text-[#392C35]'> {aboutCourse} </h2>
				<p className='text-[#392C35]  text-[18px] whitespace-pre-line'> {aboutCourseBody} </p>
				<div className='my-8'>
					<LandingTemarioCTA product={product} country={country} />
				</div>
				<div className='embedsocial-hashtag' data-ref={dataRef}></div>
			</div>
		</>
	);
};

export default LandingBody;
