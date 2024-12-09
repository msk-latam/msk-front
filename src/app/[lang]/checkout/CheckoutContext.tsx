'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutContextType {
	activeStep: number;
	subStep: number; // Nuevo estado para manejar subpasos
	completedSteps: number[];
	setActiveStep: (step: number) => void;
	setSubStep: (subStep: number) => void; // Método para actualizar el subpaso
	completeStep: (step: number) => void;
	paymentType: string | null;
	setPaymentType: (type: string | null) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [activeStep, setActiveStep] = useState(1);
	const [subStep, setSubStep] = useState(0); // Inicializamos subStep en 0 (sin subpaso)
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);
	const [paymentType, setPaymentType] = useState<string | null>(null);

	const completeStep = (step: number) => {
		if (!completedSteps.includes(step)) {
			setCompletedSteps([...completedSteps, step]);
		}
	};

	return (
		<CheckoutContext.Provider
			value={{
				activeStep,
				subStep,
				completedSteps,
				setActiveStep,
				setSubStep, // Pasamos la función para manejar subpasos
				completeStep,
				paymentType,
				setPaymentType,
			}}
		>
			{children}
		</CheckoutContext.Provider>
	);
};

export const useCheckout = () => {
	const context = useContext(CheckoutContext);
	console.log(context);
	if (!context) {
		throw new Error('useCheckout must be used within a CheckoutProvider');
	}
	return context;
};
