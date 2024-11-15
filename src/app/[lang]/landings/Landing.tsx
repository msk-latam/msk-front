'use client';
import { FetchSingleProduct } from '@/data/types';
import React, { FC, useEffect } from 'react';
import LandingHeader from './LandingHeader';
import LandingBody from './LandingBody';
import LandingTemario from './LandingTemario';
import LandingFooter from './LandingFooter';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { paymentLink } from './LandingsVariables';
import LandingNavBar from './LandingNavBar';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const Landing: FC<LandingProps> = ({ product, country }) => {
	return (
		<>
			<div className='mb-[70px]'>
				<LandingNavBar product={product} country={country} />
			</div>
			<LandingHeader product={product} country={country} />
			<div className='-mb-6 lg:mb-0'>
				<LandingBody product={product} country={country} />
			</div>
			{/* <LandingTemario product={product} country={country} /> */}
			<LandingFooter product={product} country={country} />

			{/* Hecho por Ariel Eitner */}
		</>
	);
};

export default Landing;
