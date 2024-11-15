import { FetchSingleProduct } from '@/data/types';
import Image from 'next/image';
import React, { FC } from 'react';
import { cedenteTropos } from './LandingsVariables';
import Link from 'next/link';
import LandingHeaderCTA from './LandingHeaderCTA';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const LandingHeader: FC<LandingProps> = ({ product, country }) => {
	const accsapIcons = [
		'/webp-images/landing-icons/accsap.svg',
		'/webp-images/landing-icons/saxum.svg',
		'/webp-images/landing-icons/colmed3.svg',
		'/webp-images/landing-icons/conamege.svg',
		'/webp-images/landing-icons/consejo-superior-medico.svg',
		'/webp-images/landing-icons/msk-andros-otec.svg',
		'/webp-images/landing-icons/smhgm.svg',
		'/webp-images/landing-icons/ucuenca.svg',
		'/webp-images/landing-icons/afeme.svg',
		'/webp-images/landing-icons/anamer.svg',
	];

	const medicinaIcons = [
		'/webp-images/landing-icons/euneiz.svg',
		'/webp-images/landing-icons/saxum.svg',
		'/webp-images/landing-icons/colmed3.svg',
		'/webp-images/landing-icons/consejo-superior-medico.svg',
		'/webp-images/landing-icons/conamege.svg',
		'/webp-images/landing-icons/msk-andros-otec.svg',
		'/webp-images/landing-icons/sociedad-peruana-medicina-interna.svg',
		'/webp-images/landing-icons/smhgm.svg',
		'/webp-images/landing-icons/ucuenca.svg',
		'/webp-images/landing-icons/afeme.svg',
		'/webp-images/landing-icons/anamer.svg',
	];

	const headerIcons = product.params.slug === 'medicina-interna' ? medicinaIcons : accsapIcons;

	const bannerImage =
		product.params.slug === 'medicina-interna'
			? '/webp-images/landing-images/header-medicina-interna.png'
			: '/webp-images/landing-images/header-accsap.png';

	const headerDescription =
		product.params.slug === 'medicina-interna'
			? 'Con este amplio curso de actualización en medicina interna incorporarás los conocimientos necesarios para el abordaje de distintas enfermedades, el diagnóstico de estados patológicos poco frecuentes, el manejo clínico de las comorbilidades y la toma de decisiones sobre la derivación del paciente.'
			: 'Con el programa ACCSAP en MSK podrás actualizar y fortalecer tus conocimientos sobre guías y protocolos clínicos, obtener información de investigaciones emergentes e implementar nuevas herramientas para tu práctica y para tu rendimiento en la actividad profesional, alcanzando los más altos estándares internacionales. ';

	return (
		<>
			<div className='relative '>
				<div className='absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 overflow-y-hidden bg-[#E2E8EC] lg:bg-transparent '>
					<div className='hidden lg:block'>
						<Image src={bannerImage} alt='Banner' layout='fill' objectFit='cover' quality={100} className='z-0' />
					</div>

					<div className='lg:hidden bg-[#E2E8EC] w-full h-full'></div>
				</div>
				<div className='relative z-10 pt-10 pb-[120px]'>
					<div className='inline-block bg-[#FEF9C3] px-2 py-1 rounded-sm my-4 '>
						<p className='font-medium text-[#8E5A1C] '>Prueba 7 días gratis</p>
					</div>
					<h2 className='font-bold text-3xl text-[#392C35] mb-4'>{product.ficha.title}</h2>
					<p
						className='text-[#6474A6] font-inter  mr-0 lg:mr-60  text-[18px] lg:w-[800px] '
						dangerouslySetInnerHTML={{ __html: headerDescription }}
					></p>
				</div>
			</div>
			<div className='transform translate-y-[-70px]'>
				<LandingHeaderCTA country={country} product={product} />
			</div>
			<p className='text-[#6474A6] font-inter font-bold -mt-8'>CERTIFICADO Y AVALADO POR:</p>
			<div
				className={`flex ${
					product.params.slug === 'accsap' ? 'gap-7' : 'gap-4'
				} my-4 py-4 !overflow-x-visible whitespace-nowrap`}
			>
				{headerIcons.map((icon, index) => (
					<Image key={index} src={icon} alt={`icon-${index}`} width={500} height={500} className='inline-block' />
				))}
			</div>
		</>
	);
};

export default LandingHeader;
