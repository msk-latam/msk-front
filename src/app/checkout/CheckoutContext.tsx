'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	profession: string;
	specialty: string;
	privacyPolicy: boolean;
	type_doc?: string;
}
interface Coupon {
	name: string;
	code: string;
	discountType: 'percentage' | 'fixed';
	value: number;
	expirationDate: string;
}

interface CheckoutContextType {
	activeStep: number;
	subStep: number;
	completedSteps: number[];
	setActiveStep: (step: number) => void;
	setSubStep: (subStep: number) => void;
	completeStep: (step: number) => void;
	paymentType: string | null;
	setPaymentType: (type: string | null) => void;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	paymentStatus: 'approved' | 'pending' | 'rejected';
	setPaymentStatus: (status: 'approved' | 'pending' | 'rejected') => void;
	user: User | null;
	setUser: (user: User | null) => void;
	appliedCoupon: Coupon | null;
	setAppliedCoupon: (coupon: Coupon | null) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [activeStep, setActiveStep] = useState(1);
	const [subStep, setSubStep] = useState(0);
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);
	const [paymentType, setPaymentType] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState<'approved' | 'pending' | 'rejected'>('pending');
	const [user, setUser] = useState<User | null>(null);
	const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

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
				setSubStep,
				completeStep,
				paymentType,
				setPaymentType,
				isSubmitting,
				setIsSubmitting,
				paymentStatus,
				setPaymentStatus,
				user,
				setUser,
				appliedCoupon,
				setAppliedCoupon,
			}}
		>
			{children}
		</CheckoutContext.Provider>
	);
};

export const useCheckout = () => {
	const context = useContext(CheckoutContext);
	if (!context) {
		throw new Error('useCheckout must be used within a CheckoutProvider');
	}
	return context;
};
