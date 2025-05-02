'use client';
import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import { useState } from 'react';

import useInterests from '@/hooks/useinterests';
import { useLogout } from '@/hooks/useLogout';
import { useProfile } from '@/hooks/useProfile';
import { useSaveUserProfile } from '@/hooks/useSaveUserProfile';
import CompleteProfilePromptModal from '@/modules/dashboard/components/CompleteProfilePromptModal';
import DashboardHero from '@/modules/dashboard/components/DashboardHero';
import HelpSection from '@/modules/dashboard/components/HelpSection';
import InterestsEditModal from '@/modules/dashboard/components/InterestsEditModal';
import LearningPlanCta from '@/modules/dashboard/components/LearningPlanCta';
import MyCoursesSection from '@/modules/dashboard/components/MyCoursesSection';
import ProfileEditModal from '@/modules/dashboard/components/ProfileEditModal';
import PromoBanner from '@/modules/dashboard/components/PromoBanner';

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
	const [showProfilePromptModal, setShowProfilePromptModal] = useState(false);

	const { user, loading } = useProfile();
	const { mutate: saveUserProfile, loading: isSaving } = useSaveUserProfile();

	const handleEditProfile = (field?: string) => {
		console.log('(Page) Edit profile triggered for field:', field || 'general');
		setEditTargetField(field);

		// Check if the profile seems incomplete (specifically check interests here)
		const isProfileIncomplete =
			interests && // Ensure interests object exists before checking properties
			!interests.specialty_interests?.length &&
			!interests.content_interests?.length;

		// Log the check
		console.log(`(Page) Checking if profile is incomplete: ${isProfileIncomplete}`, interests);

		if (isProfileIncomplete) {
			// If incomplete, show the prompt modal first
			console.log('(Page) Profile incomplete, showing prompt modal.');
			setShowProfilePromptModal(true);
		} else {
			// Otherwise, open the relevant edit modal directly
			console.log('(Page) Profile complete or check failed, opening edit modal directly for field:', field);
			if (field === 'interests') {
				setShowInterestsModal(true);
			} else {
				setShowEditModal(true); // Show general profile modal if field is undefined or not 'interests'
			}
		}
	};

	const handleCompleteProfileNow = () => {
		setShowProfilePromptModal(false); // Close the prompt
		// Open the correct edit modal based on the stored target field
		console.log('(Page) Proceeding from prompt to edit modal for field:', editTargetField);
		if (editTargetField === 'interests') {
			setShowInterestsModal(true);
		} else {
			// Default to the general profile edit modal
			setShowEditModal(true);
		}
	};

	const handleSaveProfile = async (formData: any) => {
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
		console.log('(Page) Interests data to save:', interestData);
		setSaveInterestsError(null);
		setSaveInterestsSuccess(false);

		try {
			console.log('(Page) Interests data to save:', user);
			await updateInterests(interestData);
			setEditTargetField(undefined);
			setSaveInterestsSuccess(true);
		} catch (error: any) {
			console.error('Failed to save interests:', error);
			setSaveInterestsError(error.message || 'Error desconocido al guardar intereses');
		}
	};

	// Calculate initial data for the Interests modal

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

			<CompleteProfilePromptModal
				isOpen={showProfilePromptModal}
				onClose={() => {
					setShowProfilePromptModal(false);
					// Clear the target field if the prompt is closed without proceeding
					setEditTargetField(undefined);
					console.log('(Page) Profile prompt modal closed.');
				}}
				onCompleteNow={handleCompleteProfileNow}
			/>

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
