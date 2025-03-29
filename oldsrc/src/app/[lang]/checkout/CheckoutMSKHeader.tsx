'use client';
import Logo from '@/components/Logo/Logo';
import React from 'react';

const CheckoutMSKHeader = () => {
	return (
		<div className='flex justify-between items-center my-2'>
			<Logo isOnBlog={false} />
			<h2 className='text-[#6474A6] !font-inter text-sm font-light'>Plataforma de cobros</h2>
		</div>
	);
};

export default CheckoutMSKHeader;
