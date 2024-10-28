'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface EnrollmentContextType {
	currentProduct: any;
	setCurrentProduct: any;
	enrollSuccess: boolean;
	setEnrollSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
	const [currentProduct, setCurrentProduct] = useState(null);
	const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);

	return (
		<EnrollmentContext.Provider value={{ currentProduct, setCurrentProduct, enrollSuccess, setEnrollSuccess }}>
			{children}
		</EnrollmentContext.Provider>
	);
};

export const useEnrollment = () => {
	const context = useContext(EnrollmentContext);
	if (!context) throw new Error('useEnrollment debe ser usado dentro de EnrollmentProvider');
	return context;
};
