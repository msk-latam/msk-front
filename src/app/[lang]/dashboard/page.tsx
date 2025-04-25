'use client';
import '@/app/globals.css';
import DashboardHero from '@/dashboard/components/DashboardHero';
import HelpSection from '@/dashboard/components/HelpSection';
import PromoBanner from '@/dashboard/components/PromoBanner';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import LearningPlanCta from '@/modules/dashboard/components/LearningPlanCta';
import MyCoursesSection from '@/modules/dashboard/components/MyCoursesSection';
import { useEffect, useState } from 'react';

import UserDataStorage from '@/components/UserDataStorage';
import { UserData, getUserData, updateUserData } from '@/lib/localStorageService/userDataService';
import InterestsEditModal from '@/modules/dashboard/components/InterestsEditModal';
import ProfileEditModal from '@/modules/dashboard/components/ProfileEditModal';

export default function DashboardPage() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showInterestsModal, setShowInterestsModal] = useState(false);
	const [editTargetField, setEditTargetField] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				// Simulate API delay for demo purposes
				await new Promise((resolve) => setTimeout(resolve, 800));
				const initialData = getUserData();
				setUserData(initialData);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleEditProfile = (field?: string) => {
		console.log('(Page) Edit profile triggered for field:', field || 'general');
		setEditTargetField(field);
		if (field === 'interests') {
			setShowInterestsModal(true);
		} else {
			setShowEditModal(true);
		}
	};

	const handleSaveProfile = (formData: Partial<UserData>) => {
		console.log('(Page) Profile data to save:', formData);
		const updatedData = updateUserData(formData);
		setUserData(updatedData);
		setShowEditModal(false);
		setEditTargetField(undefined);
	};

	const handleSaveInterests = (updatedInterests: string[]) => {
		console.log('(Page) Interests to save:', updatedInterests);
		const updatedData = updateUserData({ interests: updatedInterests });
		setUserData(updatedData);
		setShowInterestsModal(false);
		setEditTargetField(undefined);
	};

	return (
		<>
			<UserDataStorage />

			<header
				className='w-full h-[180px] sm:h-[579px] overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar isDashboard />

			</header>

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20 -mb-[100px] md:mb-0'>
				<section className='w-full -mt-[40px] md:-mt-[420px] z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4'>
					<DashboardHero userData={userData} onEditProfile={handleEditProfile} isLoading={isLoading} />
					{!isLoading && userData && (
						<>
							<MyCoursesSection />
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
					initialData={userData}
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
					initialInterests={userData?.interests || []}
				/>
			)}
		</>
	);
}
