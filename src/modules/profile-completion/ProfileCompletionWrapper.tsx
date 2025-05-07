'use client';

import { useCustomer } from '@/hooks/useCustomer';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Step1BasicInfo from './components/Step1BasicInfo';
import Step2Professional from './components/Step2Professional';
import Step3Interests from './components/Step3Interests';
import Step4Recommendations from './components/Step4Recommendations';

type FormDataType = {
	profession?: string;
	otherProfession?: string;
	specialty?: string;
	otherSpecialty?: string;
	country?: string;
	phone?: string;
	year?: string;
	career?: string;
	workplace?: string;
	workArea?: string;
	isMemberOfAssociation?: boolean;
	associationName?: string;
	interests?: {
		specialty_interests: string[] | null;
		content_interests: string[] | null;
		other_interests: string[] | null;
	};
};

export default function ProfileCompletionWrapper() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormDataType>({
		profession: '',
		otherProfession: '',
		specialty: '',
		otherSpecialty: '',
		country: '',
		phone: '',
		year: '',
		career: '',
		workplace: '',
		workArea: '',
		isMemberOfAssociation: false,
		associationName: '',
		interests: {
			specialty_interests: [],
			content_interests: [],
			other_interests: [],
		},
	});

	const router = useRouter();
	const customerMutation = useCustomer('create');

	useEffect(() => {
		const email = Cookies.get('email'); // Or whatever your cookie name is
		if (!email) {
			router.push('/login/?form=registerForm'); // Or your actual account creation page
		}
	}, [router]);

	// const nextStep = () => setStep((prev) => prev + 1);
	const nextStep = () => {
		setStep((prev) => prev + 1);
	};
	const prevStep = () => setStep((prev) => prev - 1);
	const skipProfile = () => {
		// Redirige o marca como completo sin llenar
		console.log('Perfil omitido');
	};

	const updateFormData = (newData: Partial<FormDataType>) => {
		setFormData((prev) => ({ ...prev, ...newData }));
		if (step === 3) {
			// formData here is the state *before* this current update.
			// newData contains the specific update (e.g., { interests: { ... } } from Step3).
			// Merge formData with newData to get the complete, up-to-date data for the mutation.
			const completeDataForMutation = { ...formData, ...newData };

			customerMutation.mutate({
				country: completeDataForMutation.country,
				phone: completeDataForMutation.phone,
				profession: completeDataForMutation.profession || completeDataForMutation.otherProfession,
				specialty: completeDataForMutation.specialty || completeDataForMutation.otherSpecialty,
				career: completeDataForMutation.career,
				workplace: completeDataForMutation.workplace,
				school_associate: completeDataForMutation.isMemberOfAssociation,
				school_name: completeDataForMutation.associationName,
				interests: completeDataForMutation.interests, // This will correctly use the new interests
			});
		}
	};

	return (
		<div className='w-full bg-white md:rounded-3xl rounded-t-3xl  shadow-md -mt-[40px] md:-mt-20 md:mx-20 z-[1] relative overflow-visible max-w-[1600px]'>
			{/* {formData} */}
			{step === 1 && <Step1BasicInfo data={formData} onNext={nextStep} onSkip={skipProfile} onUpdate={updateFormData} />}
			{step === 2 && (
				<Step2Professional
					data={formData}
					onNext={nextStep}
					onBack={prevStep}
					onUpdate={updateFormData}
					onSkip={() => {
						// lógica cuando el usuario quiera omitir
						nextStep(); // o lo que necesites
					}}
				/>
			)}
			{step === 3 && <Step3Interests data={formData} onNext={nextStep} onBack={prevStep} onUpdate={updateFormData} />}
			{step === 4 && <Step4Recommendations onBack={prevStep} />}
		</div>
	);
}
