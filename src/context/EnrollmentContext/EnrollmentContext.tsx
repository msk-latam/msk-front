'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface EnrollmentContextType {
	enrollSuccess: boolean;
	setEnrollSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
	const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);

	return <EnrollmentContext.Provider value={{ enrollSuccess, setEnrollSuccess }}>{children}</EnrollmentContext.Provider>;
};

export const useEnrollment = () => {
	const context = useContext(EnrollmentContext);
	if (!context) throw new Error('useEnrollment debe ser usado dentro de EnrollmentProvider');
	return context;
};
