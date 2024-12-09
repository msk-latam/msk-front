'use client';

import React from 'react';

const mockData = {
	title: 'Resumen de inscripción',
	items: [
		{
			description: 'Urgencias toxicológicas, psiquiátricas y neurológicas',
			price: 'ARS $1234567',
		},
		{
			description: 'ACCSAP. Programa de actualización en cardiología clínica',
			price: 'ARS $1234567',
		},
	],
	total: 'ARS $1234567',
	payments: '%Valor cuotas%',
};

const CheckoutResume: React.FC = () => {
	const { title, items, total, payments } = mockData;

	return (
		<div className='p-6 bg-white border border-gray-300 rounded-lg mt-24'>
			<h2 className='text-2xl font-semibold text-[#392C35]'>{title}</h2>

			{/* Grid para alineación tipo tabla */}
			<div className='mt-4'>
				<div className='grid grid-cols-2 gap-x-8'></div>

				{/* Iterar sobre los items */}
				{items.map((item, index) => (
					<div key={index} className='grid grid-cols-2 gap-x-8 mt-2'>
						{/* Descripción del artículo */}
						<div className='text-sm text-[#392C35]'>{item.description}</div>

						{/* Precio del artículo */}
						<div className='text-sm text-[#6474A6] text-right'>{item.price}</div>
					</div>
				))}
			</div>

			<hr className='my-6 border-dashed border-t-2 border-gray-300' style={{ borderStyle: 'dotted' }} />

			<div className='flex flex-col'>
				<span className='text-sm font-medium text-[#6474A6]'>TOTAL</span>
				<span className='text-3xl font-bold text-[#392C35]'>{total}</span>
				<p className='mt-2 text-sm text-[#6474A6]'>
					{`X pagos de `}
					<span className='font-bold'>{payments}</span>
				</p>
			</div>
		</div>
	);
};

export default CheckoutResume;
