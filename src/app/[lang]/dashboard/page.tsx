'use client';
import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import { useState } from 'react';

import { useProfile } from '@/hooks/useProfile';
import { useSaveInterests } from '@/hooks/useSaveInterests';
import { useSaveUserProfile } from '@/hooks/useSaveUserProfile';
import DashboardHero from '@/modules/dashboard/components/DashboardHero';
import HelpSection from '@/modules/dashboard/components/HelpSection';
import InterestsEditModal from '@/modules/dashboard/components/InterestsEditModal';
import LearningPlanCta from '@/modules/dashboard/components/LearningPlanCta';
import MyCoursesSection from '@/modules/dashboard/components/MyCoursesSection';
import ProfileEditModal, { UserProfileData } from '@/modules/dashboard/components/ProfileEditModal';
import PromoBanner from '@/modules/dashboard/components/PromoBanner';

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
interface InterestPayload {
	especialidadInteres: string[];
	contenidoInteres: string[];
	interesesAdicionales: string[];
}

export default function DashboardPage() {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showInterestsModal, setShowInterestsModal] = useState(false);
	const [editTargetField, setEditTargetField] = useState<string | undefined>(undefined);
	const [saveProfileError, setSaveProfileError] = useState<string | null>(null);
	const [saveProfileSuccess, setSaveProfileSuccess] = useState<boolean>(false);
	const [saveInterestsError, setSaveInterestsError] = useState<string | null>(null);
	const [saveInterestsSuccess, setSaveInterestsSuccess] = useState<boolean>(false);

	const { user, loading } = useProfile();
	const { mutate: saveUserProfile, loading: isSaving } = useSaveUserProfile();
	const {
		mutate: saveInterests,
		loading: isSavingInterests,
		error: interestsError,
		success: interestsSuccess,
	} = useSaveInterests();

	const handleEditProfile = (field?: string) => {
		console.log('(Page) Edit profile triggered for field:', field || 'general');
		setEditTargetField(field);
		if (field === 'interests') {
			setShowInterestsModal(true);
		} else {
			setShowEditModal(true);
		}
	};

	const handleSaveProfile = async (formData: Partial<UserProfileData>) => {
		console.log('(Page) Profile data to save:', formData);
		try {
			await saveUserProfile(formData);
			setShowEditModal(false);
			setEditTargetField(undefined);
			setSaveProfileSuccess(true);
		} catch (error: any) {
			console.error('Failed to save profile:', error);
			setSaveProfileError(error.message || 'Error desconocido');
		}
	};

	const handleSaveInterests = async (interestData: InterestPayload) => {
		if (!user || !user.crm_id) {
			console.error('User or user CRM ID not found, cannot save interests.');
			setSaveInterestsError('No se pudo encontrar el ID de usuario.');
			return;
		}

		console.log('(Page) Interests data to save:', interestData);
		setSaveInterestsError(null);
		setSaveInterestsSuccess(false);

		try {
			console.log('(Page) Interests data to save:', user);
			await saveInterests({
				...interestData,
				crm_id: user.crm_id,
			});
			setEditTargetField(undefined);
			setSaveInterestsSuccess(true);
		} catch (error: any) {
			console.error('Failed to save interests:', error);
			setSaveInterestsError(error.message || 'Error desconocido al guardar intereses');
		}
	};

	// Calculate initial data for the Interests modal
	const initialInterestData = user
		? {
				especialidadInteres: user.intereses?.filter((i) => especialidadOptions.includes(i)) || [],
				contenidoInteres: user.intereses?.filter((i) => contenidoOptions.includes(i)) || [],
				interesesAdicionales: user.interesesAdicionales || [],
		  }
		: {};

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
						isLoading={loading}
						userEmail={user?.email ?? ''}
					/>
					{!loading && user && (
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

			{showEditModal && (
				<ProfileEditModal
					isOpen={showEditModal}
					onClose={() => {
						setShowEditModal(false);
						setEditTargetField(undefined);
					}}
					onSave={handleSaveProfile}
					user={user}
					isSaving={isSaving}
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
					initialData={initialInterestData}
					isSaving={isSavingInterests}
					saveError={saveInterestsError}
					saveSuccess={saveInterestsSuccess}
				/>
			)}
		</>
	);
}
