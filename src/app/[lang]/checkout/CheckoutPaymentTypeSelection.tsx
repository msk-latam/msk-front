'use client';

import React, { useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';

const PaymentTypeSelection: React.FC = () => {
	const { setPaymentType, setSubStep } = useCheckout();
	const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);

	const handleCheckboxChange = (paymentType: string) => {
		setSelectedPaymentType(paymentType);
		setPaymentType(paymentType);
	};

	const handleNextStep = () => {
		setSubStep(1);
	};

	useEffect(() => {
		setPaymentType('cuotas');
		setSubStep(1);
	}, []);

	return (
		<>
			<h2 className='flex items-center text-[#1A1A1A] text-2xl font-medium my-8 font-raleway'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					2
				</span>
				Pago
			</h2>
			<div className='p-6 bg-white border border-gray-300 rounded-lg '>
				<h2 className='text-2xl font-semibold text-[#392C35]'>¿Cómo quieres pagar?</h2>
				<div className='mt-4'>
					<label className='flex items-center mb-4 cursor-pointer'>
						<input
							type='checkbox'
							name='paymentType'
							value='unico'
							checked={selectedPaymentType === 'unico'}
							onChange={() => handleCheckboxChange('unico')}
							className='appearance-none w-5 h-5 border border-gray-300 rounded-[4px] checked:bg-[#9200AD] checked:border-[#9200AD] focus:ring-2 focus:ring-[#9200AD] focus:outline-none mr-2'
						/>
						Pago Único
					</label>
					<label className='flex items-center cursor-pointer'>
						<input
							type='checkbox'
							name='paymentType'
							value='cuotas'
							checked={selectedPaymentType === 'cuotas'}
							onChange={() => handleCheckboxChange('cuotas')}
							className='appearance-none w-5 h-5 border border-gray-300 rounded-[4px] checked:bg-[#9200AD] checked:border-[#9200AD] focus:ring-2 focus:ring-[#9200AD] focus:outline-none mr-2'
						/>
						<div>
							<span>Pago en Cuotas</span>
							<p className='text-sm text-[#6474A6] '>Abona en plazos con montos fijos, ¡sin recargos!</p>
						</div>
					</label>
				</div>
			</div>
			<div className='flex justify-end'>
				<button
					onClick={handleNextStep}
					disabled={!selectedPaymentType}
					className={`mt-4 px-12 py-3 text-sm rounded-md ${
						selectedPaymentType ? 'bg-[#9200AD] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
					}`}
				>
					Siguiente
				</button>
			</div>
		</>
	);
};

export default PaymentTypeSelection;
