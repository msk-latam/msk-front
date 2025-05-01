'use client';
import Logo from '@/components/Logo/Logo';
import React from 'react';

const CheckoutMSKHeader = () => {
	return (
		<div
		className='flex justify-between items-center my-2'
		style={{
			background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
		   linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
		}}
	>


			<Logo isOnBlog={false} />
			<h2 className='text-[#6474A6] !font-inter text-sm font-light'>Plataforma de cobros</h2>

		</div>
	);
};

export default CheckoutMSKHeader;
