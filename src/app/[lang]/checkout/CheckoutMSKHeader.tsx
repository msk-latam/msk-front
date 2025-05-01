'use client';
import Logo from '@/components/Logo/Logo';
import React from 'react';

const CheckoutMSKHeader = () => {
	return (
		<div
			className='h-56 md:pb-9 md:pt-0 pb-7 items-center'
			style={{
				background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
		   linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
			}}
		>
			<div className='relative flex flex-col md:flex-row items-center justify-center h-full w-full max-w-[1400px] mx-auto px-4'>
				{/* Logo a la izquierda en desktop, arriba en mobile */}
				<div className="z-10 md:static md:mr-auto pr-2 scale-75 md:scale-100">
					<Logo isOnBlog={false} />
				</div>

				{/* Título centrado en desktop, debajo del logo en mobile */}
				<h2
					className='text-white !font-raleway text-3xl md:text-4xl font-semibold mt-4 md:mt-0
					md:absolute md:left-1/2 md:top-1/2 md:pt-5 md:transform md:-translate-x-1/2 md:-translate-y-1/2'
				>
					Plataforma de Cobros
				</h2>
			</div>
		</div>
	);
};

export default CheckoutMSKHeader;
