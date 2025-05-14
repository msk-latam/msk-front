'use client';
import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import { useEffect, useState } from 'react';

import type { UpdateCustomerPayload } from '@/hooks/useCustomer';
import { useCustomer } from '@/hooks/useCustomer';
import useInterests from '@/hooks/useinterests';
import { useLogout } from '@/hooks/useLogout';
import { useProfile } from '@/hooks/useProfile';

import CompleteProfilePromptModal from '@/modules/dashboard/components/CompleteProfilePromptModal';
import DashboardHero from '@/modules/dashboard/components/DashboardHero';
import HelpSection from '@/modules/dashboard/components/HelpSection';
import InterestsEditModal from '@/modules/dashboard/components/InterestsEditModal';
import LearningPlanCta from '@/modules/dashboard/components/LearningPlanCta';
import MyCoursesSection from '@/modules/dashboard/components/MyCoursesSection';
import type { UserProfileData } from '@/modules/dashboard/components/ProfileEditModal';
import ProfileEditModal from '@/modules/dashboard/components/ProfileEditModal';
import PromoBanner from '@/modules/dashboard/components/PromoBanner';
import { createContractCRM } from '../checkout/utils/utils';

interface InterestPayload {
	specialty_interests: string[];
	content_interests: string[];
	other_interests: string[];
}

// Define interest options here to help categorize initial data
// (Ideally, share this structure with the modal)
const especialidadOptions = [
	'Administración y gestión',
	'Anestesiología y dolor',
	'Cardiología',
	'Cirugía',
	'Dermatología',
	'Diabetes',
	'Emergentología',
	'Endocrinología',
	'Gastroenterología',
	'Geriatría',
	'Ginecología',
	'Hematología',
	'Infectología',
	'Medicina familiar',
	'Medicina general',
	'Medicina intensiva',
	'Nefrología',
	'Nutrición',
	'Obstetricia',
	'Oftalmología',
	'Oncología',
	'Pediatría',
	'Psiquiatría',
	'Radiología e imagenología',
	'Traumatología',
	'Urología',
];
const contenidoOptions = [
	'Cursos',
	'Guías profesionales',
	'Artículos de blog',
	'Infografías',
	'Videografías',
	'Tutoriales',
	'Webinars',
];

// Define this interface outside the component function, perhaps near the top

export default function DashboardPage() {
	const { logout } = useLogout();
	const { interests, updateInterests, isLoading: isInterestsLoading } = useInterests();

	const [showEditModal, setShowEditModal] = useState(false);
	const [showInterestsModal, setShowInterestsModal] = useState(false);
	const [editTargetField, setEditTargetField] = useState<string | undefined>(undefined);
	const [saveProfileError, setSaveProfileError] = useState<string | null>(null);
	const [saveProfileSuccess, setSaveProfileSuccess] = useState<boolean>(false);
	const [saveInterestsError, setSaveInterestsError] = useState<string | null>(null);
	const [saveInterestsSuccess, setSaveInterestsSuccess] = useState<boolean>(false);
	const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);

	const { user, loading: userDataLoading, mutate: mutateProfile } = useProfile();
	const { mutate: updateCustomerProfile, loading: isSavingProfile, error: saveProfileErrorFromHook } = useCustomer();
	const [reload, setReload] = useState(false);
	const handleReload = () => {
		setReload((prev) => !prev); // Esto cambiará el valor de 'reload' y hará que el hook se ejecute de nuevo
	};

	const handleEditProfile = (field?: string) => {
		console.log('(Page) Edit profile triggered for field:', field || 'general');
		setEditTargetField(field);

		if (field === 'interests') {
			setShowInterestsModal(true);
		} else {
			setShowEditModal(true);
		}
	};

	const handleOpenCompleteProfileModal = () => {
		console.log('(Page) Opening complete profile prompt modal.');
		setShowCompleteProfileModal(true);
	};

	const handleCloseCompleteProfileModal = () => {
		setShowCompleteProfileModal(false);
		setEditTargetField(undefined);
		console.log('(Page) Profile prompt modal closed.');
	};

	const handleCompleteProfileNow = () => {
		handleCloseCompleteProfileModal();
		console.log('(Page) Proceeding from prompt to edit modal for field:', editTargetField);
		if (editTargetField === 'interests') {
			setShowInterestsModal(true);
		} else {
			setShowEditModal(true);
		}
	};

	const handleSaveProfile = async (formDataFromModal: Partial<UserProfileData>, password?: string) => {
		console.log('(Page) Profile data to save:', formDataFromModal, 'Password changed:', !!password);
		setSaveProfileError(null);
		setSaveProfileSuccess(false);

		// Map formDataFromModal to UpdateCustomerPayload
		const payload: UpdateCustomerPayload = {
			first_name: formDataFromModal.name,
			last_name: formDataFromModal.lastName,
			country: formDataFromModal.country,
			phone: formDataFromModal.fullPhoneNumber || formDataFromModal.phone,
			profession: formDataFromModal.profession,
			specialty: formDataFromModal.speciality,
			career: formDataFromModal.career,
			workplace: formDataFromModal.workplace ?? undefined,
			work_area: formDataFromModal.workArea ?? undefined,
			school_associate: formDataFromModal.belongsToMedicalCollege ?? undefined,
			school_name: formDataFromModal.school_name ?? undefined,
			identification: formDataFromModal.documentNumber,
			document_type: formDataFromModal.document_type,
			company_name: formDataFromModal.company_name,
			invoice_required:
				formDataFromModal.invoice_required !== undefined
					? parseInt(formDataFromModal.invoice_required as string, 10)
					: undefined,
			billing_email: formDataFromModal.billingEmail,
			billing_phone: formDataFromModal.fullBillingPhoneNumber,
			tax_regime: formDataFromModal.tax_regime,
		};

		if (password) {
			payload.password = password;
		}

		// Filter out undefined values to send a cleaner payload
		const cleanedPayload = Object.entries(payload).reduce((acc, [key, value]) => {
			if (value !== undefined) {
				acc[key as keyof UpdateCustomerPayload] = value;
			}
			return acc;
		}, {} as Partial<UpdateCustomerPayload>);

		try {
			console.log('(Page) Sending to API:', cleanedPayload);
			await updateCustomerProfile(cleanedPayload as UpdateCustomerPayload); // API call to save data

			setEditTargetField(undefined);
			setSaveProfileSuccess(true);

			// This is the call to re-fetch profile data and update the UI
			mutateProfile(); // Re-fetch profile data via SWR

			setTimeout(() => {
				setSaveProfileError(null);
				setSaveProfileSuccess(false);
				// setShowEditModal(false); // Optionally close modal after success message duration
			}, 3000);
		} catch (error: any) {
			console.error('Failed to save profile:', error);
			setSaveProfileError(error.message || 'Error desconocido al guardar perfil');
			setSaveProfileSuccess(false);
			setTimeout(() => {
				setSaveProfileError(null);
			}, 5000);
		}
	};

	const handleSaveInterests = async (interestData: InterestPayload) => {
		console.log('(Page) Interests data to save:', interestData);
		setSaveInterestsError(null);
		setSaveInterestsSuccess(false);

		try {
			console.log('(Page) Interests data to save user context:', user); // Corrected log
			await updateInterests(interestData);
			mutateProfile(); // Re-fetch profile data to update completion percentage
			setEditTargetField(undefined);
			setSaveInterestsSuccess(true);
			setTimeout(function () {
				setSaveInterestsError(null);
				setSaveInterestsSuccess(false);
			}, 3000);
		} catch (error: any) {
			console.error('Failed to save interests:', error);
			setSaveInterestsError(error.message || 'Error desconocido al guardar intereses');
		}
	};

	useEffect(() => {
		const enrolarCurso = async () => {
			const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');

			if (redirectAfterLogin) {
				// Elimina la barra final si existe
				const cleanPath = redirectAfterLogin.endsWith('/') ? redirectAfterLogin.slice(0, -1) : redirectAfterLogin;

				// Extrae la última parte
				const extractedValue = cleanPath.split('/').pop();
				console.log('Valor extraído:', extractedValue);

				const lang = 'ar';
				const slug = extractedValue;

				try {
					const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}?lang=${lang}`, {
						cache: 'no-cache',
					});

					const course = await res.json();
					console.log('Curso:', course);
					//mapeo para no cambiar la funcion original
					const product = {
						ficha: {
							product_code: 9005897,
						},
					};

					createContractCRM(user.crm_id, product, 0, 'ARS', 'Argentina', 'mercadopago', 'Obsequio');
					localStorage.removeItem('redirectAfterLogin');
				} catch (error) {
					console.error('Error al obtener el curso o crear el contrato:', error);
				}
			} else {
				console.log('No hay redirección guardada en localStorage');
			}
		};

		enrolarCurso();
	}, [user]);

	console.log(user);

	return (
		<>
			<header
				className='w-full h-[180px] md:h-[579px] overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar isDashboard />
			</header>

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20 -mb-[100px] md:mb-0'>
				<section className='w-full -mt-[40px] md:-mt-[420px] z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4'>
					<DashboardHero
						userData={user}
						onEditProfile={handleEditProfile}
						isLoading={userDataLoading}
						userEmail={user?.email ?? ''}
						onOpenCompleteProfileModal={handleOpenCompleteProfileModal}
						interests={interests}
						isInterestsLoading={isInterestsLoading}
					/>
					{!userDataLoading && user && (
						<>
							<MyCoursesSection courseData={user.coursesInProgress} userEmail={user.email} />
							<LearningPlanCta />
							<PromoBanner />
							<HelpSection />
						</>
					)}
				</section>
			</main>

			<NewsLetter />
			<Footer />

			<CompleteProfilePromptModal
				isOpen={showCompleteProfileModal}
				onClose={handleCloseCompleteProfileModal}
				onCompleteNow={handleCompleteProfileNow}
			/>

			{showEditModal && (
				<ProfileEditModal
					isOpen={showEditModal}
					onClose={() => {
						setShowEditModal(false);
						setEditTargetField(undefined);
						setSaveProfileError(null); // Clear error on modal close
						setSaveProfileSuccess(false); // Clear success on modal close
					}}
					onSave={handleSaveProfile}
					user={user}
					isSaving={isSavingProfile}
					saveError={saveProfileError}
					saveSuccess={saveProfileSuccess}
				/>
			)}

			{showInterestsModal && (
				<InterestsEditModal
					isOpen={showInterestsModal}
					onClose={() => {
						setShowInterestsModal(false);
						setEditTargetField(undefined);
					}}
					onSave={handleSaveInterests}
					initialData={
						interests ?? {
							specialty_interests: [],
							content_interests: [],
							other_interests: [],
						}
					}
					isSaving={isInterestsLoading}
					saveError={saveInterestsError}
					saveSuccess={saveInterestsSuccess}
				/>
			)}
		</>
	);
}
