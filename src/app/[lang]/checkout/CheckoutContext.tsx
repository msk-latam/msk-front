'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutContextType {
	activeStep: number;
	completedSteps: number[];
	setActiveStep: (step: number) => void;
	completeStep: (step: number) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [activeStep, setActiveStep] = useState(1);
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);

	const completeStep = (step: number) => {
		if (!completedSteps.includes(step)) {
			setCompletedSteps([...completedSteps, step]);
		}
	};

	return (
		<CheckoutContext.Provider value={{ activeStep, completedSteps, setActiveStep, completeStep }}>
			{children}
		</CheckoutContext.Provider>
	);
};

export const useCheckout = () => {
	const context = useContext(CheckoutContext);
	console.log('useCheckout ejecutado', context);
	if (!context) {
		throw new Error('useCheckout must be used within a CheckoutProvider');
	}
	return context;
};
