'use client';

import React from 'react';
import { useCheckout } from './CheckoutContext';

const steps = ['Crear cuenta', 'Pago', 'Estado de inscripción'];

const CheckoutHeader: React.FC = () => {
	const { activeStep, completedSteps } = useCheckout();

	return (
		<div className='relative w-full transform -translate-x-1/2 left-1/2'>
			<div className='absolute top-0 left-0 w-full' />

			<div className='flex justify-center space-x-4 md:pt-8 md:pb-6 pt-7 pb-3 w-full'>
				{steps.map((step, index) => {
					const stepNumber = index + 1;
					const isActive = activeStep === stepNumber;
					const isCompleted = completedSteps.includes(stepNumber);

					const circleColor = isActive ? 'bg-[#B814D6]' : isCompleted ? 'bg-[#9200AD]' : 'bg-[#7B8CC3]';

					const textColor = isActive ? 'text-[#B814D6]' : isCompleted ? 'text-[#9200AD]' : 'text-[#7B8CC3]';

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
			
		</div>
	);
};

export default CheckoutHeader;
