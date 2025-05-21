'use client';

import CtaButton from '@/dashboard/components/ui/CtaButton';
import { useOffers } from '@/modules/home/hooks/useOffer';
import { usePathname, useRouter } from 'next/navigation'; // ✔️ Importamos useRouter
import React from 'react';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';

const PromoBanner = ({ lang }: { lang: string }) => {
	const { data: offer, loading, error } = useOffers(lang);
	const router = useRouter(); // ✔️ Inicializamos el router
	// const pathname = usePathname();
	// const lang = pathname?.split('/')[1] || 'arg';
	if (!offer) return null;

	// ✔️ Arreglo del contenido con listas y espaciado
	const renderContent = () => {
		if (!offer.contenido) return null;

		return (
			<div
				className='font-inter text-base md:text-xl max-w-[500px] list-disc list-outside ml-5 mb-8 space-y-3 md:space-y-4'
				style={{
					color: 'white',
					listStyleType: 'disc',
					marginLeft: '1.5rem',
				}}
				dangerouslySetInnerHTML={{ __html: offer.contenido }}
			/>
		);
	};

	// ✔️ El valor del descuento, ahora se toma de `numero_de_porcentaje`
	const discountNumber = offer.numero_de_porcentaje.replace('+', '');
	const discountText = offer.texto_descuento;

	return (
		<div className='relative md:rounded-[30px] overflow-hidden -z-10 -mt-4 md:mt-5 text-white min-h-[450px] md:min-h-[350px] flex flex-col'>
			{/* Background Image */}
			<div
				className='absolute inset-0 z-0 bg-center bg-cover'
				style={{
					backgroundImage: `url(${offer.background_image})`,
				}}
			></div>

			{/* Dark Overlay */}
			<div
				className='absolute inset-0 z-10'
				style={{
					background:
						'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%), linear-gradient(255.21deg, rgba(0, 0, 0, 0) 22.64%, rgba(0, 0, 0, 0.4) 49.04%)',
				}}
			></div>

			{/* Content Container */}
			<div className='relative z-20 flex flex-col justify-between flex-grow p-6 mt-40 md:mt-0 md:p-12'>
				{/* Top Text Content */}
				<div>
					<p className='mb-4 text-base font-normal md:text-lg font-inter md:mb-8'>{offer.disponibilidad}</p>

					<h2
						className='flex flex-col gap-2 mb-6 text-3xl md:text-5xl font-raleway md:gap-4 md:mb-8'
						dangerouslySetInnerHTML={{ __html: offer.titulo }}
					/>

					{/* Contenido (renderizado manual) */}
					{renderContent()}
				</div>

				{/* Discount and Button Section */}
				<div className='flex flex-col items-center gap-4 mt-6 md:items-end md:absolute md:bottom-12 md:right-12 md:flex-row md:mt-0'>
					{/* Discount */}
					<div className='flex items-end gap-2 text-center md:text-right'>
						<span className='text-6xl md:text-[78.49px] font-inter font-bold leading-none md:leading-[100%] tracking-tighter md:tracking-[-13%]'>
							{discountNumber}
						</span>
						<div className='flex flex-col items-center gap-1 md:items-start md:gap-2'>
							<span className='font-inter font-extralight text-4xl md:text-[47.42px] leading-none md:leading-[100%]'>%</span>
							<span className='text-sm md:text-[19.62px] font-inter font-light leading-none md:leading-[100%] tracking-[-2.5%] whitespace-pre-line'>
								OFF
							</span>
						</div>
						<span className='text-xl md:text-[26.16px] font-inter font-extrabold leading-tight md:leading-[90%] tracking-[-2.5%] opacity-90 whitespace-pre-line text-center md:text-start max-w-[160px]'>
							{discountText}
						</span>
					</div>

					{/* Button */}
					<div className='flex justify-center w-full mb-10 md:w-auto md:mb-0'>
						<CtaButton
							onClick={() => {
								// Detectar si para argentina tiene `/dashboard`
								const path = getLocalizedUrl(lang, offer.cta.url);

								// Si es Argentina  y hay `/dashboard` en la URL, lo reemplazamos por `/ar`. Middleware detecta
								// y quita el /ar
								const cleanedPath = path.includes('/dashboard') ? path.replace('/dashboard', '/ar') : path;

								console.log(`🔄 Redirigiendo a: ${cleanedPath}`);
								router.push(cleanedPath);
							}}
							showIcon={true}
						>
							{offer.cta.title}
						</CtaButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromoBanner;
