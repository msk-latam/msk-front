'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Logo from '@/components/Logo/Logo';
import { FetchSingleProduct } from '@/data/types';
import React, { FC } from 'react';
import { paymentLinks } from './LandingsVariables';
import { usePathname } from 'next/navigation';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const LandingNavBar: FC<LandingProps> = ({ product, country }) => {
	const productSlug = product?.params?.slug;
	const paymentLink = paymentLinks[country]?.[productSlug] || '#';
	const pathname = usePathname(); // Hook para obtener la URL actual
	const isCertificacionesPage = pathname.includes('/certificaciones/');

	return (
		<div className='fixed top-0 left-0 w-full  py-3 px-4 bg-white shadow-md z-50'>
			<div className='lg:container flex justify-between items-center'>
				<Logo target={'_blank'} isOnBlog={false} />
				{isCertificacionesPage ? (
					<ButtonPrimary href='/' targetBlank={false} rel='noopener noreferrer' className='!py-2 !m-0'>
						Capacítate
					</ButtonPrimary>
				) : (
					<ButtonPrimary href={paymentLink} targetBlank={true} rel='noopener noreferrer' className='!py-2 !m-0'>
						¡Quiero la prueba gratuita!
					</ButtonPrimary>
				)}
			</div>
		</div>
	);
};

export default LandingNavBar;
