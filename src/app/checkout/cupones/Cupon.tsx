'use client';

import React, { useState, useCallback } from 'react';
import { useCheckout } from '../CheckoutContext';

interface Coupon {
	name: string;
	code: string;
	discountType: 'percentage' | 'fixed';
	value: number;
	expirationDate: string;
}

const Cupon: React.FC = () => {
	const { appliedCoupon, setAppliedCoupon } = useCheckout();
	const [couponCode, setCouponCode] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const mockCoupons: Coupon[] = [
		{ name: 'Descuento de $10.000', code: 'DESCUENTO10', discountType: 'fixed', value: 10000, expirationDate: '2025-12-31' },
		{ name: 'Descuento del 50%', code: 'DESCUENTO50', discountType: 'percentage', value: 50, expirationDate: '2025-12-31' },
		{ name: 'Descuento de $100', code: 'OFERTA100', discountType: 'fixed', value: 100, expirationDate: '2025-06-30' },
		{ name: 'Cupón vencido 1', code: 'EXPIRADO1', discountType: 'percentage', value: 15, expirationDate: '2023-05-15' },
		{ name: 'Cupón vencido 2', code: 'EXPIRADO2', discountType: 'fixed', value: 200, expirationDate: '2024-02-01' },
	];

	const handleApplyCoupon = useCallback(() => {
		if (isLoading || !couponCode.trim()) return;

		setIsLoading(true);
		setError('');
		setAppliedCoupon(null);

		setTimeout(() => {
			const foundCoupon = mockCoupons.find((coupon) => coupon.code === couponCode.toUpperCase());

			if (!foundCoupon) {
				setError('Cupón inválido');
			} else {
				const today = new Date();
				const expirationDate = new Date(foundCoupon.expirationDate);

				if (expirationDate < today) {
					setError('Cupón expirado');
				} else {
					setAppliedCoupon(foundCoupon);
				}
			}

			setIsLoading(false);
		}, 2000);
	}, [couponCode, isLoading]);

	const handleRemoveCoupon = () => {
		setAppliedCoupon(null);
		setCouponCode('');
		setError('');
	};

	return (
		<div className='mt-4'>
			<label className='block text-sm font-medium text-gray-700'>Código de cupón</label>
			<div className='flex mt-2'>
				<input
					type='text'
					placeholder='Ingresa tu código'
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
					className='border p-2 rounded-l w-full focus:ring focus:ring-[#9200AD]'
					disabled={isLoading}
				/>
				<button
					onClick={handleApplyCoupon}
					className={`bg-[#9200AD] text-white px-4 rounded-r hover:bg-[#FF5D5E] transition flex items-center justify-center ${
						isLoading || !couponCode.trim() ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={isLoading || !couponCode.trim()}
				>
					{isLoading ? (
						<svg
							className='animate-spin h-5 w-5 text-white'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
							<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z'></path>
						</svg>
					) : (
						'Aplicar'
					)}
				</button>
			</div>

			{/* Mensaje de error */}
			{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

			{/* Mensaje de cupón aplicado */}
			{appliedCoupon && (
				<div className='mt-2 flex items-center justify-between p-2 border rounded bg-green-100'>
					<p className='text-green-600 text-sm'>
						Cupón aplicado: <strong>{appliedCoupon.name}</strong> 🎉
					</p>
					<button onClick={handleRemoveCoupon} className='text-red-600 text-sm font-medium hover:underline'>
						Eliminar
					</button>
				</div>
			)}
		</div>
	);
};

export default Cupon;
