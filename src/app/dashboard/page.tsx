'use client';

import '@/app/globals.css';
import DashboardHero from '@/dashboard/components/DashboardHero';
import HelpSection from '@/dashboard/components/HelpSection';
import PromoBanner from '@/dashboard/components/PromoBanner';
import LearningPlanCta from '@/modules/dashboard/components/LearningPlanCta';
import MyCoursesSection from '@/modules/dashboard/components/MyCoursesSection';
import Footer from '@/modules/home/components/footer/footer';
import Navbar from '@/modules/home/components/navbar/Navbar';
import NewsLetter from '@/modules/home/components/newsletter/NewsLetter';
import { useEffect, useState } from 'react';

import { UserData, getUserData, updateUserData } from '@/lib/localStorageService/userDataService';
import ProfileEditModal from '@/modules/dashboard/components/ProfileEditModal';

export default function DashboardPage() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);

	useEffect(() => {
		const initialData = getUserData();
		setUserData(initialData);
	}, []);

	const handleEditProfile = (field?: string) => {
		console.log('(Page) Edit profile triggered for field:', field || 'general');
		setShowEditModal(true);
	};

	const handleSaveProfile = (formData: Partial<UserData>) => {
		console.log('(Page) Profile data to save:', formData);
		const updatedData = updateUserData(formData);
		setUserData(updatedData);
		setShowEditModal(false);
	};

	if (!userData) {
		return <div className='flex justify-center items-center h-screen'>Loading...</div>;
	}

	return (
		<>
			<header
				className='w-full h-[180px] sm:h-[579px] overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar />
			</header>

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20 -mb-[100px] md:mb-0'>
				<section className='w-full -mt-[40px] md:-mt-[420px] z-[10] relative overflow-visible max-w-[1400px] mx-auto'>
					<DashboardHero userData={userData} onEditProfile={handleEditProfile} />
					<MyCoursesSection />
					<LearningPlanCta />
					<PromoBanner />
					<HelpSection />
				</section>
			</main>

			<NewsLetter />
			<Footer />

			{showEditModal && (
				<ProfileEditModal
					isOpen={showEditModal}
					onClose={() => setShowEditModal(false)}
					onSave={handleSaveProfile}
					initialData={userData}
				/>
			)}
		</>
	);
}
