'use client';

import React from 'react';
import { useCheckout } from './CheckoutContext';

const PaymentTypeSelection: React.FC = () => {
	const { setPaymentType, setSubStep } = useCheckout(); // Usamos setSubStep en lugar de setActiveStep

	const handleSelection = (paymentType: string) => {
		setPaymentType(paymentType); // Establecemos el tipo de pago seleccionado
		setSubStep(1); // Avanzamos al subpaso 1, que es el formulario de pago
	};

	return (
		<>
			<h2 className='flex items-center text-[#392C35] text-2xl font-semibold my-8'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					2
				</span>
				Pago
			</h2>
			<div className='p-6 bg-white border border-gray-300 rounded-lg '>
				<h2 className='text-2xl font-semibold text-[#392C35]'>¿Cómo deseas pagar?</h2>
				<div className='mt-4'>
					<button
						onClick={() => handleSelection('unico')}
						className='px-6 py-2 mr-4 text-white font-bold bg-[#9200AD] rounded-sm'
					>
						Pago Único
					</button>
					<button
						onClick={() => handleSelection('cuotas')}
						className='px-6 py-2 text-white font-bold bg-[#9200AD] rounded-sm'
					>
						Pago en Cuotas
					</button>
				</div>
			</div>
		</>
	);
};

export default PaymentTypeSelection;
