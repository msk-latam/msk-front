import Questions from '@/components/Questions/Questions';
import { FetchSingleProduct } from '@/data/types';
import React, { FC, useEffect, useState } from 'react';
import { FAQS } from '../page';
import ssr from '@/services/ssr';
import Image from 'next/image';
import { cedenteTropos, landingFAQs, paymentLinks } from './LandingsVariables';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const LandingFooter: FC<LandingProps> = ({ product, country }) => {
	const [faqs, setFaqs] = useState<any>(null);

	const fetchContent = async () => {
		const fetchedContent = await ssr.getWpContent('/home-msk', country);
		setFaqs(fetchedContent);
	};

	const footerImage =
		product.params.slug === 'medicina-interna'
			? '/webp-images/landing-images/footer-medicina-interna-desktop.png'
			: '/webp-images/landing-images/footer-accsap-desktop.png';

	const footerTitle = product.params.slug === 'medicina-interna' ? product.ficha.title : 'Programa ACCSAP';

	const productSlug = product?.params?.slug || '';
	const paymentLink = paymentLinks[country]?.[productSlug] || '#';

	useEffect(() => {
		fetchContent();
	}, [product]);

	return (
		<>
			<footer>
				<Questions content={landingFAQs(country) as FAQS} isLanding={true} />

				<div className=' lg:absolute lg:flex  bg-[#FFFFFF] rounded-3xl shadow-2xl shadow-black/25 translate-y-[-50px] z-10'>
					<div className='lg:flex'>
						<Image src={footerImage} alt='banner' width={750} height={550} className='p-0 m-0' />
					</div>
					<div className='flex w-full flex-col p-6 lg:p-8'>
						<h2 className='text-2xl'> {footerTitle} </h2>
						<div className='flex flex-col lg:flex-row gap-4'>
							<div className=''>
								<p className='text-[#6474A6] font-bold font-inter'>CEDENTE</p>
								<p className='font-medium'>
									{product.lista_de_cedentes?.[0]?.post_title} {cedenteTropos(product)}
								</p>
							</div>
							<div>
								<p className='text-[#6474A6] font-inter font-bold'>DURACIÓN</p>
								<p className='font-medium'> {product.details.duration.value} horas </p>
							</div>
						</div>
						<hr className='border-t border-[#CCD1DC] my-2' />

						<div className='lg:flex lg:gap-6 flex flex-wrap'>
							<div className='flex gap-2'>
								<p className='font-medium'>{product.details.duration.value} horas</p>
								<p className='font-medium'>|</p>
								<p className='font-medium'>{product.cantidad_modulos} módulos</p>
							</div>
							<div>
								<p className='text-[#CCD1DC]'>|</p>
							</div>
							<div className='flex gap-2'>
								<p className='font-medium'>MODALIDAD</p>
								<p className='font-medium'>100% online</p>
							</div>
						</div>

						<div className='mt-4'>
							<ButtonPrimary href={paymentLink} targetBlank={true} rel='noopener noreferrer'>
								Prueba 7 días gratis
							</ButtonPrimary>
						</div>
					</div>
				</div>
				<div className=' h-0 lg:h-[250px]'>
					<div className='bg-[#F3F4F6] h-[250px] w-screen  translate-x-[-50%]  absolute z-0 left-1/2'></div>
				</div>
			</footer>
		</>
	);
};

export default LandingFooter;
