'use client';

import { useCustomer } from '@/hooks/useCustomer';
import { useProfile } from '@/hooks/useProfile';
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
	speciality?: string;
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

	/* obtener la data del user desde customer para completar el perfil */
	const { user, loading: userDataLoading, mutate: mutateProfile } = useProfile();

	const [formData, setFormData] = useState<FormDataType>({
		profession: user?.profession || '',
		otherProfession: user?.other_profession || '',
		speciality: user?.speciality || '',
		otherSpecialty: user?.other_specialty || '',
		country: user?.country || '',
		phone: user?.phone || '',
		year: user?.year || '',
		career: user?.career || '',
		workplace: user?.workplace || '',
		workArea: user?.work_area || '',
		isMemberOfAssociation: user?.school_associate || false,
		associationName: user?.school_name || '',
		interests: {
			specialty_interests: user?.interests?.specialty_interests || [],
			content_interests: user?.interests?.content_interests || [],
			other_interests: user?.interests?.other_interests || [],
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

	// Update formData when user data is loaded
	useEffect(() => {
		if (user) {
			setFormData({
				profession: user?.profession || '',
				otherProfession: '',
				speciality: user?.speciality || '',
				otherSpecialty: '',
				country: user?.country || '',
				phone: user?.phone || '',
				year: user?.year || '',
				career: user?.career || '',
				workplace: user?.workplace || '',
				workArea: user?.workArea || '',
				isMemberOfAssociation: user?.school_associate || false,
				associationName: user?.school_name || '',
				interests: {
					specialty_interests: user?.interests?.specialty_interests || [],
					content_interests: user?.interests?.content_interests || [],
					other_interests: user?.interests?.other_interests || [],
				},
			});
		}
	}, [user]);

	// const nextStep = () => setStep((prev) => prev + 1);
	const nextStep = () => {
		setStep((prev) => prev + 1);
	};
	const prevStep = () => setStep((prev) => prev - 1);
	const skipProfile = () => {
		const currentPath = window.location.pathname;
		const langMatch = currentPath.match(/^\/([^\/]+)\/completar-perfil/);
		const lang = langMatch ? langMatch[1] : 'ar';
		console.log('lang', lang);
		console.log('currentPath', currentPath);
		lang === 'ar' ? router.push('/dashboard') : router.push(`/${lang}/dashboard`);
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
				specialty: completeDataForMutation.speciality || completeDataForMutation.otherSpecialty,
				career: completeDataForMutation.career,
				workplace: completeDataForMutation.workplace,
				work_area: completeDataForMutation.workArea,
				school_associate: completeDataForMutation.isMemberOfAssociation,
				school_name: completeDataForMutation.associationName,
				interests: completeDataForMutation.interests, // This will correctly use the new interests
			});
		}
	};

	if (userDataLoading) {
		// Skeleton based on Step1BasicInfo
		return (
			<section className='w-full bg-white md:rounded-3xl rounded-t-3xl  shadow-md -mt-[40px] md:-mt-20 md:mx-20 z-[1] relative overflow-visible max-w-[1600px] animate-pulse'>
				<div className='w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9 font-inter'>
					{/* Skeleton for Back Button */}
					<div className='md:top-10 md:left-8 top-5 left-5 absolute w-10 h-10 rounded-full bg-gray-200'></div>

					{/* Skeleton for Title and Progress */}
					<div className='text-center mb-6 z-[1]'>
						<div className='h-8 bg-gray-200 rounded w-3/4 mx-auto mb-5'></div>
						<div className='flex justify-center items-center space-x-2'>
							<div className='w-16 h-2 bg-gray-300 rounded-full'></div>
							<div className='w-16 h-2 bg-gray-200 rounded-full'></div>
							<div className='w-16 h-2 bg-gray-200 rounded-full'></div>
							<div className='w-16 h-2 bg-gray-200 rounded-full'></div>
						</div>
					</div>

					{/* Skeleton for Form */}
					<div className='max-w-md mx-auto space-y-6 font-inter'>
						{[...Array(4)].map((_, i) => (
							<div key={i} className='space-y-2'>
								<div className='h-4 bg-gray-200 rounded w-1/4'></div>
								<div className='h-10 bg-gray-200 rounded'></div>
							</div>
						))}

						{/* Skeleton for Buttons */}
						<div className='h-12 bg-gray-300 rounded-[38px] w-full mt-6'></div>
						<div className='h-12 bg-gray-200 border border-gray-300 rounded-[38px] w-full mt-2'></div>
					</div>
				</div>
			</section>
		);
	}

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
