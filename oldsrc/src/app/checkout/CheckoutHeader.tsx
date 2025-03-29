'use client';

import React from 'react';
import { useCheckout } from './CheckoutContext';

const steps = ['Crear cuenta', 'Pago', 'Estado de inscripción'];

const CheckoutHeader: React.FC = () => {
	const { activeStep, completedSteps } = useCheckout();

	return (
		<div className='relative w-screen bg-[#F8F8F9] transform -translate-x-1/2 left-1/2'>
			<div className='absolute top-0 left-0 w-screen h-[1px] bg-[#D9D9D9]' />

			<div className='flex justify-center space-x-4 py-4 w-screen'>
				{steps.map((step, index) => {
					const stepNumber = index + 1;
					const isActive = activeStep === stepNumber;
					const isCompleted = completedSteps.includes(stepNumber);

					const circleColor = isActive ? 'bg-[#FF5D5E]' : isCompleted ? 'bg-[#00853E]' : 'bg-[#6474A6]';

					const textColor = isActive ? 'text-[#FF5D5E]' : isCompleted ? 'text-[#00853E]' : 'text-[#6474A6]';

					return (
						<div key={index} className='flex items-center'>
							<div className={`flex items-center justify-center w-6 h-6 rounded-full ${circleColor} mr-2`}>
								<span className='text-white font-bold text-xs'>{stepNumber}</span>
							</div>

							<span className={`text-sm font-medium ${textColor} hidden lg:block`}>{step}</span>
						</div>
					);
				})}
			</div>
			<div className='absolute bottom-0 left-0 w-screen h-[1px] bg-[#D9D9D9]' />
		</div>
	);
};

export default CheckoutHeader;
