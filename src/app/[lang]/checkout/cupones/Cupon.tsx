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

	const handleApplyCoupon = useCallback(async () => {
		if (isLoading || !couponCode.trim()) return;

		setIsLoading(true);
		setError('');
		setAppliedCoupon(null);

		try {
			const response = await fetch(`https://api.msklatam.net/validarCupon?cupon=${couponCode.toUpperCase()}`);
			const data = await response.json();
			console.log(data);

			if (!data.codigo) {
				setError('Cupón inválido');
			} else {
				const today = new Date();
				const expirationDate = new Date(data.fecha_vencimiento);

				if (expirationDate < today) {
					setError('Cupón expirado');
				} else {
					const formattedCoupon: Coupon = {
						name: data.nombre,
						code: data.codigo,
						discountType: data.tipo_descuento.toLowerCase() === 'porcentaje' ? 'percentage' : 'fixed',
						value: data.monto_descuento,
						expirationDate: data.fecha_vencimiento,
					};
					setAppliedCoupon(formattedCoupon);
				}
			}
		} catch (error) {
			setError('Error al validar el cupón');
		} finally {
			setIsLoading(false);
		}
	}, [couponCode, isLoading]);

	const handleRemoveCoupon = () => {
		setAppliedCoupon(null);
		setCouponCode('');
		setError('');
	};

	return (
		<div className='mt-4'>
			<label className='block text-xl font-bold text-gray-700'>Código de cupón</label>
			<div className='flex mt-2'>
				<input
					type='text'
					placeholder='Ingresa tu código'
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
					className='border rounded-l-2xl w-full border-gray-300 p-2 focus:ring-1 focus:border-[#DBDDE2] text-[#6e737c] py-2.5 px-3.5focus:ring focus:ring-[#9200AD]'
					disabled={isLoading}
				/>
				<button
					onClick={handleApplyCoupon}
					className={`bg-[#9200AD] text-white px-4 rounded-r-2xl hover:bg-[#FF5D5E] focus:ring-1 focus:border-[#FF5D5E] transition flex items-center justify-center ${
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
			{error && <p className='text-[#f5006d] text-sm mt-2'>{error}</p>}

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
