'use client';
import React, { FC } from 'react';
import { BRANDS_BY_COUNTRY } from '@/data/MSK/brands';
import Image from 'next/image';

interface BrandSliderProps {
	country: string;
}

const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
	const brands = BRANDS_BY_COUNTRY[country] || BRANDS_BY_COUNTRY['default'];

	return (
		<div className='relative'>
			<div className='overflow-x-auto flex space-x-8 py-4 scrollbar-thin'>
				{/* Contenedor con scroll horizontal */}
				<div className='flex items-center space-x-8'>
					{brands?.map((brand, index) => (
						<div key={index} className='flex-shrink-0'>
							<Image src={brand.img} alt='Brand logo' width={brand.width} height={100} className='object-contain' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BrandSlider;
