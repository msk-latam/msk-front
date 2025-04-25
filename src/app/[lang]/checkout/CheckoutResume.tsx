'use client';

import React from 'react';
import { useCheckout } from './CheckoutContext';
import Cupon from './cupones/Cupon';
interface CheckoutResumeProps {
	product: any;
	country: string;
}

const CheckoutResume: React.FC<CheckoutResumeProps> = ({ product, country }) => {
	const { ficha, total_price } = product;
	const { paymentType, appliedCoupon, activeStep } = useCheckout();

	const currencies: any = {
		cl: 'CLP',
		ar: 'ARS',
		ec: 'USD',
		mx: 'MXN',
		bo: 'BOB',
		co: 'COP',
		cr: 'CRC',
		sv: 'USD',
		gt: 'USD',
		hn: 'HNL',
		ni: 'USD',
		pa: 'USD',
		py: 'PYG',
		pe: 'PEN',
		uy: 'UYU',
		ve: 'USD',
	};
	const currency = currencies[country] || 'USD';

	const items: any[] = [
		{
			description: ficha.title,
			price: total_price,
		},
	];

	// Normaliza el número eliminando puntos y lo convierte a entero
	const parseNumber = (value: string): number => parseInt(value.replace(/\./g, ''), 10);

	// Formatea un número en el estilo de Estados Unidos
	const formatNumber = (value: number): string =>
		new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

	const formatPesoArgentino = (value: number): string => {
		const hasDecimals = value % 1 !== 0;

		return new Intl.NumberFormat('es-AR', {
			minimumFractionDigits: hasDecimals ? 2 : 0,
			maximumFractionDigits: hasDecimals ? 2 : 0,
		}).format(value);
	};

	// Procesa el precio total
	const total = parseNumber(total_price);
	const installmentValue = Math.floor(total / 12);
	const discount =
		appliedCoupon && appliedCoupon.discountType === 'percentage'
			? total * (appliedCoupon.value / 100)
			: appliedCoupon && appliedCoupon.discountType === 'fixed'
			? appliedCoupon.value
			: 0;

	const totalWithDiscount = Math.max(total - discount, 0); // Asegura que no sea negativo

	const installmentValueWithDiscount = totalWithDiscount / 12;

	return (
		<div className='p-6 mt-24 bg-white border border-gray-300 rounded-lg'>
			<h2 className='text-2xl font-semibold text-[#392C35]'>Resumen de inscripción</h2>

			<div className='mt-4'>
				<div className='grid grid-cols-2 gap-x-8'></div>

				{items.map((item, index) => (
					<div key={index} className='grid grid-cols-2 mt-2 gap-x-8'>
						<div className='text-sm text-[#392C35]'>{item.description}</div>

						{/* Precio del artículo */}
						<div className='text-sm text-[#6474A6] text-right'>{`${currency} $${item.price}`}</div>
					</div>
				))}
			</div>

			{discount > 0 && (
				<div className='grid grid-cols-2 mt-2 rounded-md gap-x-8'>
					<div className='text-sm font-medium text-[#392C35]'>Descuento</div>
					<div className='text-sm font-medium text-right text-[#6474A6]'>
						- {`${currency} $${formatPesoArgentino(discount)}`}
					</div>
				</div>
			)}

			{activeStep <= 1 && <Cupon />}

			<hr className='my-6 border-t-2 border-gray-300 border-dashed' style={{ borderStyle: 'dotted' }} />

			<div className='flex flex-col'>
				<span className='text-sm font-medium text-[#6474A6]'>TOTAL</span>
				<span className='text-3xl font-bold text-[#392C35]'>{`${currency} $${formatPesoArgentino(totalWithDiscount)}`}</span>

				<p className='mt-2 text-sm text-[#6474A6]'>
					{`12 pagos de `}
					<span className='font-bold'>{`${currency} $${formatPesoArgentino(installmentValueWithDiscount)}`}</span>
				</p>
			</div>
		</div>
	);
};

export default CheckoutResume;
