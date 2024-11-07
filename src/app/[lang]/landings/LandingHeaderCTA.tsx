import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { FetchSingleProduct } from '@/data/types';
import Link from 'next/link';
import React, { FC } from 'react';
import { paymentLinks } from './LandingsVariables';
import landingCTAImage from '@/public/webp-images/landing-icons/landing-header-cta-image.svg';
import Image from 'next/image';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const LandingHeaderCTA: FC<LandingProps> = ({ product, country }) => {
	const productSlug = product?.params?.slug || '';
	const paymentLink = paymentLinks[country]?.[productSlug] || '#';

	const headerTitle =
		productSlug === 'medicina-interna'
			? 'Aprende medicina interna gratis durante 7 días 🚀'
			: 'Prueba ACCSAP gratis durante 7 días 🚀';
	return (
		<div className='border border-[#DBDBDB] rounded-lg p-6 lg:p-8 lg:pl-12 bg-[#F5F8FF] flex flex-col-reverse lg:flex-row justify-between items-center'>
			{/* Contenido a la izquierda en desktop y debajo en mobile */}
			<div className=''>
				<h2 className='!font-raleway font-light text-xl lg:text-2xl text-[#392C35]'>{headerTitle}</h2>
				<ul className='mt-2 text-[#6474A6] text-base lg:text-xl'>
					<li>→ Acceso a todos los contenidos del programa</li>
					<li>→ Asesoramiento académico personalizado</li>
					<li>→ Asimilación progresiva de tus conocimientos</li>
					<li>→ Oportunidades de extensión de cursada</li>
				</ul>
				<div className='mt-4'>
					<ButtonPrimary
						href={paymentLink}
						targetBlank={true}
						rel='noopener noreferrer'
						className='!text-base lg:!text-xl lg:!font-bold'
					>
						¡Quiero la prueba gratuita!
					</ButtonPrimary>
				</div>
			</div>

			{/* Imagen a la derecha en desktop y arriba en mobile */}
			<div className='mb-4 lg:mb-0'>
				<Image src={landingCTAImage} alt='image' height={500} width={500} />
			</div>
		</div>
	);
};

export default LandingHeaderCTA;
