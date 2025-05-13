import Image from 'next/image';
import React, { useState } from 'react';
// Import UserData type from the service
// import { UserData } from '@/lib/localStorageService/userDataService';

// Import SVG icon components
import DocumentIcon from '@/dashboard/assets/icons/DocumentIcon';
import PlusIcon from '@/dashboard/assets/icons/PlusIcon';
import UserIcon from '@/dashboard/assets/icons/UserIcon';
import AddButton from '@/dashboard/components/ui/AddButton';
import EditButton from '@/dashboard/components/ui/EditButton';
// import dashboardMock from '@/modules/dashboard/data/dashboardMock.json'; // <-- Import mock data
import { type Interests } from '@/hooks/useinterests'; // Changed: Import Interests type
import { useLmsNavigation } from '@/hooks/useLmsNavigation';
import { urlFormat } from '@/utils/urlFormat';
import Link from 'next/link';
import DashboardHeroSkeleton from './DashboardHeroSkeleton';
import InvoicesModal from './InvoicesModal';
import CtaButton from './ui/CtaButton';
// import { goToEnroll, goToLMS } from '@/lib/account';
// // Define props for DashboardHero
interface DashboardHeroProps {
	userData: any; // <-- TODO: Change to UserData type
	onEditProfile: (field?: string) => void;
	isLoading?: boolean; // For userData loading
	userEmail: string;
	onOpenCompleteProfileModal: () => void;
	interests: Interests | null; // Changed: Added interests prop
	isInterestsLoading: boolean; // Changed: Added isInterestsLoading prop
}

// const defaultRecommendedCourse = {
// 	image:
// 		'https://images.ctfassets.net/cnu0m8re1exe/KARd6CSmh3yD656fzK3Kl/d46556b481191e9a679ed0e02388788f/doctor-and-patient.jpg?fm=jpg&fl=progressive&w=1140&h=700&fit=fill', // Use the image from the example
// 	label: 'Recomendado para ti',
// 	title: 'Curso de Endocrinología y Nutrición',
// 	buttonText: 'Descubrir',
// 	buttonLink: '/tienda/endocrinologia-y-nutricion/', // Replace with actual link
// };

const DashboardHero: React.FC<DashboardHeroProps> = ({
	userData,
	onEditProfile,
	isLoading = false,
	userEmail,
	onOpenCompleteProfileModal,
	interests,
	isInterestsLoading,
}) => {
	const isEmpty = (value: string | undefined | null) => !value || value.trim() === '';
	const [showInvoicesModal, setShowInvoicesModal] = useState(false);
	const { navigateToLms, isLoading: isNavigating, error: navigationError } = useLmsNavigation();

	const handleEditClick = (field?: string) => {
		// Map display labels/placeholders to actual UserData field names
		const fieldNameMap: Record<string, string> = {
			Email: 'email',
			'Añadir email': 'email',
			Teléfono: 'phone',
			'Añadir teléfono': 'phone',
			Especialidad: 'specialty',
			'Completar especialidad': 'specialty',
			'Nombre/s': 'firstName',
			'Apellido/s': 'lastName',
			País: 'country',
			'Seleccionar país': 'country',
			'Completar país': 'country',
			Profesión: 'profesion',
			'Seleccionar profesión': 'profesion',
			'Completar profesión': 'profesion',
			'Lugar de trabajo': 'workplace',
			'Ingresar lugar de trabajo': 'workplace',
			'Completar lugar de trabajo': 'workplace',
			'Área de trabajo': 'workArea',
			'Ingresar área de trabajo': 'workArea',
			'Completar área de trabajo': 'workArea',
			profileImage: 'profileImage',
			profesion: 'profesion',
			country: 'country',
			workplace: 'workplace',
			workArea: 'workArea',
		};
		const actualFieldName = field ? fieldNameMap[field] || field : undefined;
		console.log(`DashboardHero: Edit clicked for display field "${field}", mapped to UserData field "${actualFieldName}"`);
		onEditProfile(actualFieldName);
	};

	if (isLoading) {
		return <DashboardHeroSkeleton />;
	}
	const data = userData;
	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-[468px_1fr] lg:grid-cols-[468px_3fr_3fr] gap-5 '>
				{/* User Profile Section - Mobile: 1st, Desktop: 1st Col */}
				<div className='md:col-span-1 md:row-span-3 bg-white rounded-[30px] p-[36px] order-1 md:order-1'>
					{/* Profile Picture */}
					<div className='relative w-[126px] h-[126px] mx-auto mb-6'>
						<div className='w-full h-full overflow-hidden rounded-full border'>
							{data?.profileImage ? (
								<Image
									src={data?.profileImage}
									alt='Profile'
									width={126}
									height={126}
									className='w-full h-full object-cover'
								/>
							) : (
								<div
									className='relative inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full w-full h-full text-3xl'
									style={{ backgroundColor: 'rgb(0, 209, 178)' }}
								>
									<span className='font-semibold text-white'>{`${data?.name?.charAt(0) || ''}${
										data?.lastName?.charAt(0) || ''
									}`}</span>
								</div>
							)}
						</div>
						<div className='absolute bottom-0 right-0'>
							<EditButton onClick={() => handleEditClick('profileImage')} filled />
						</div>
					</div>

					{/* User Info */}
					<div className='mb-5 pb-4 border-b border-gray-100'>
						<h2 className='text-3xl font-bold font-raleway text-center mb-4 leading-[110%]'>
							{`${data?.name || ''} ${data?.lastName || ''}`.trim() || 'Nombre Apellido'}
						</h2>

						<div className='flex items-center justify-center'>
							<div className='flex gap-1 items-center justify-center'>
								<p
									className={`font-inter font-medium text-lg leading-[24px] text-center flex items-center justify-center ${
										!isEmpty(data?.speciality) ? 'text-[#1A1A1A]' : 'text-[#4F5D89]'
									}`}
								>
									{isEmpty(data?.speciality) ? 'Completar especialidad' : data?.speciality}
								</p>
								{isEmpty(data?.speciality) ? (
									<AddButton onClick={() => handleEditClick('Completar especialidad')} />
								) : (
									<EditButton onClick={() => handleEditClick('speciality')} />
								)}
							</div>
						</div>
					</div>

					{/* User Details Section */}
					<div className='space-y-4'>
						{/* Profession */}
						<div className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100'>
							<span
								className={`font-inter font-medium text-base leading-[24px] ${
									!data?.profession ? 'text-[#4F5D89]' : 'text-[#1A1A1A]'
								}`}
							>
								{data?.profession || 'Completar profesión'}
							</span>
							{!data?.profession ? (
								<AddButton onClick={() => handleEditClick('Completar profesión')} />
							) : (
								<EditButton onClick={() => handleEditClick('profesion')} />
							)}
						</div>

						{/* Email */}
						<div className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100'>
							<span
								className={`font-inter font-medium text-base leading-[24px] ${
									!data?.email ? 'text-[#4F5D89]' : 'text-[#1A1A1A]'
								}`}
							>
								{data?.email || 'Completar email'}
							</span>
							{!data?.email ? (
								<AddButton onClick={() => handleEditClick('Completar email')} />
							) : (
								<EditButton onClick={() => handleEditClick('email')} />
							)}
						</div>

						{/* Country */}
						<div className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100'>
							<span
								className={`font-inter font-medium text-base leading-[24px] ${
									!data?.country ? 'text-[#4F5D89]' : 'text-[#1A1A1A]'
								}`}
							>
								{data?.country || 'Completar país'}
							</span>
							{!data?.country ? (
								<AddButton onClick={() => handleEditClick('Completar país')} />
							) : (
								<EditButton onClick={() => handleEditClick('country')} />
							)}
						</div>

						{/* Phone */}
						<div className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100'>
							<span
								className={`font-inter font-medium text-base leading-[24px] ${
									!data?.phone ? 'text-[#4F5D89]' : 'text-[#1A1A1A]'
								}`}
							>
								{data?.phone || 'Completar teléfono'}
							</span>
							{!data?.phone ? (
								<AddButton onClick={() => handleEditClick('Completar teléfono')} />
							) : (
								<EditButton onClick={() => handleEditClick('phone')} />
							)}
						</div>
					</div>

					{/* Profile Completion Progress */}
					{data?.profileCompletion && data?.profileCompletion?.percentage < 100 && (
						<div className='mt-6 bg-[#F7F9FF] rounded-[30px] p-[36px]'>
							<div className='relative h-8 w-full bg-blue-100 rounded-full overflow-hidden'>
								<div
									className='absolute top-0 left-0 h-full rounded-full bg-[#9200AD] transition-width duration-300 ease-in-out'
									style={{ width: `${data?.profileCompletion.percentage}%` }}
								>
									<span className='absolute px-3 py-1 rounded-full bg-[#9200AD] text-white text-base font-medium -translate-y-1/2  top-1/2 left-0 whitespace-nowrap'>
										Tu perfil {data?.profileCompletion?.percentage}%
									</span>
								</div>
							</div>
							<div className='mt-4 text-center text-sm'>
								<span className='text-[#4F5D89]'>{data?.profileCompletion?.message} </span>
								<button
									onClick={(e) => {
										e.preventDefault();
										onOpenCompleteProfileModal();
									}}
									className='text-[#9200AD] font-medium underline cursor-pointer'
								>
									{data?.profileCompletion.ctaText}
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Action Cards Section - Mobile: 2nd, Desktop: 4th in 2nd Col */}
				<div className='md:col-span-2 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5 order-2 md:order-4'>
					{/* Mis facturas */}
					<button
						className='bg-white text-left flex items-center justify-start border border-[#DBDDE2] rounded-[30px] p-[36px] hover:shadow-md transition-shadow'
						onClick={() => setShowInvoicesModal(true)}
					>
						<div className=' w-[26px] text-[#9200AD] mr-4 flex-shrink-0'>
							<DocumentIcon />
						</div>
						<div>
							<h3 className='font-raleway font-bold text-[20px] leading-[28px] mb-1 text-[#1A1A1A]'>Mis facturas</h3>
							<p className='font-inter font-normal text-base leading-6 tracking-[0%] text-[#1A1A1A]'>
								Encuentra y descarga tus facturas
							</p>
						</div>
					</button>

					{/* Mi cuenta (was Mis cursos) */}
					<button
						className='bg-white text-left flex items-center justify-start border border-[#DBDDE2] rounded-[30px] p-[36px] hover:shadow-md transition-shadow'
						onClick={() => handleEditClick()}
					>
						<div className=' w-[26px] text-[#9200AD] mr-4 flex-shrink-0'>
							<UserIcon />
						</div>
						<div>
							<h3 className='font-raleway font-bold text-[20px] leading-[28px] mb-1 text-[#1A1A1A]'>Mi cuenta</h3>
							<p className='font-inter font-normal text-base leading-6 tracking-[0%]  text-[#1A1A1A]'>
								Gestiona todo lo relacionado con tus datos personales
							</p>
						</div>
					</button>
				</div>

				{/* Interests Section - Mobile: 3rd, Desktop: 3rd in 2nd Col */}
				<div className='md:col-span-2 lg:col-span-2 bg-white rounded-[30px] p-[36px] order-3 md:order-3'>
					<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-3 text-[#1A1A1A]'>Tus intereses</h3>

					{isInterestsLoading ? (
						<p className='text-center text-[#4F5D89] py-5'>Cargando intereses...</p>
					) : interests && interests?.specialty_interests?.length > 0 ? (
						<div className='flex flex-wrap gap-2 mb-4 items-center'>
							{interests?.specialty_interests?.map((interest: string, index: number) => (
								<span
									key={index}
									className={`px-4 py-2 rounded-full text-base font-inter font-normal bg-[#F7F9FF] text-[#29324F]`}
								>
									{interest}
								</span>
							))}
							<button
								onClick={() => handleEditClick('interests')}
								className='rounded-full border border-[#DBDDE2] flex items-center justify-center text-[#1A1A1A] cursor-pointer w-10 h-10 hover:bg-[#F7F9FF] hover:text-[#29324F] transition-colors'
							>
								<PlusIcon />
							</button>
						</div>
					) : (
						<div className='flex flex-col items-center justify-center pt-5'>
							<p className='text-[#4F5D89] font-raleway font-medium text-center mb-6'>
								¡No encontramos nada aún! Personaliza tu experiencia en MSK
							</p>
							<button
								onClick={() => handleEditClick('interests')}
								className='bg-[#9200AD] text-white px-5 py-3 rounded-full font-inter font-medium text-sm hover:bg-[#7a0092] transition'
							>
								Completar intereses
							</button>
						</div>
					)}
				</div>

				{/* Course Section - Conditionally Rendered */}
				{/* Mobile: 4th, Desktop: 2nd in 2nd Col */}
				<div className='md:col-span-2 lg:col-span-2 rounded-[30px] overflow-hidden group order-4 md:order-2'>
					<div className='bg-cover bg-top h-[300px] rounded-[30px] relative flex flex-col justify-center p-[36px] text-white overflow-hidden'>
						<div
							className='absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center'
							style={{ backgroundImage: `url(${data?.currentCourse?.image})` }}
						></div>
						{/* Overlay gradient */}
						<div
							className='absolute inset-0'
							style={{ background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.54) 38.02%, rgba(0, 0, 0, 0.09) 87.34%)' }}
						></div>
						{/* Course Content: Title, Label, Button */}
						<div className='relative z-10 flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center'>
							{/* Group Label and Title */}
							<div className='flex flex-col items-start gap-4'>
								<span className='bg-[#DFE6FF] text-[#29324F] font-inter font-normal text-sm md:text-base rounded-full px-3 py-1.5'>
									{data?.currentCourse?.completed_percentage === null ? 'Recomendado para ti' : 'Continúa tu aprendizaje'}
								</span>
								<h2 className='text-white font-raleway font-[700] text-[24px] md:text-[36px] leading-[26px] md:leading-[44px] max-w-[25ch]'>
									{data?.currentCourse?.title}
								</h2>
							</div>
							{/* Button - Aligned below title on mobile, right on desktop */}

							<div className='w-auto mt-4 md:mt-0'>
								<CtaButton
									onClick={() => {
										if (data?.currentCourse?.completed_percentage === null) {
											const currentPath = window.location.pathname;
											const langMatch = currentPath.match(/^\/([^\/]+)\/dashboard/);
											const lang = langMatch ? langMatch[1] : '';
											window.location.href = lang
												? `/${lang}/${data?.currentCourse?.link}`
												: `/${data?.currentCourse?.link}`;
										} else if (data?.currentCourse?.product_code && data?.currentCourse?.product_code_cedente && userEmail) {
											navigateToLms(data?.currentCourse?.product_code, data?.currentCourse?.product_code_cedente, userEmail);
										} else {
											console.error('Missing data for LMS navigation:', data?.currentCourse);
										}
									}}
									showIcon={true}
									isDisabled={isNavigating}
								>
									{isNavigating
										? 'Cargando...'
										: data?.currentCourse?.completed_percentage === null
										? 'Descubrir'
										: data?.currentCourse?.status === 'Sin enrolar'
										? 'Activar'
										: 'Continuar'}
								</CtaButton>
							</div>
						</div>
						{/* Progress Bar */}
						{data?.currentCourse?.completed_percentage !== null && (
							<div className='w-full h-[40px] bg-[#00000033] absolute bottom-0 left-0'>
								<div
									className='h-full bg-[#00000080] px-[36px] flex items-center justify-start transition-width duration-300 ease-in-out'
									style={{ width: `${data?.currentCourse?.completed_percentage}%` }}
								>
									<span className='text-white font-inter font-medium text-base leading-[24px] whitespace-nowrap'>
										{data?.currentCourse?.completed_percentage}% completado
									</span>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Recommended Resources Section - Mobile: 5th, Desktop: 5th in 2nd/3rd Col */}
				{data?.recommendedResourcesByIA && data?.recommendedResourcesByIA.length > 0 ? (
					<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px] order-5 md:order-5'>
						<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-6 text-[#1A1A1A]'>
							Recursos recomendados para tí
						</h3>
						{/* Mobile: Carousel / Desktop: Grid */}
						<div className='flex space-x-4 overflow-x-auto scroll-snap-x scroll-snap-mandatory md:grid md:grid-cols-2 md:gap-5 md:space-x-0 md:overflow-x-visible md:scroll-snap-none pb-4 -mb-4 scrollbar-hide '>
							{data?.recommendedResourcesByIA.map((resource: any, index: number) => (
								<Link
									href={urlFormat(`/curso/${resource.slug}`)}
									key={index}
									className='w-[90%] flex-shrink-0 scroll-snap-start md:w-auto md:flex-shrink bg-white rounded-[30px] overflow-hidden flex flex-col md:flex-row border border-[#DBDDE2] hover:shadow-md transition-shadow min-h-[280px]'
								>
									{/* Image Section */}
									<div className='relative w-full md:w-[200px] h-[180px] md:h-auto flex-shrink-0 bg-gray-100'>
										<Image src={resource.featured_images.high} alt={resource.title} layout='fill' objectFit='cover' />
									</div>

									{/* Content Section */}
									<div className='px-4 py-6 grid grid-rows-[auto_1fr_1fr_1fr] h-full relative w-full'>
										{/* Tags section - fixed height */}
										<div className=' mb-2'>
											<div className='flex flex-wrap gap-2'>
												{resource?.categories?.length > 0 && (
													<span
														className={`px-3 py-1 rounded-full text-xs font-inter font-medium bg-[#DFE6FF] text-[#29324F]
															}`}
													>
														{resource?.categories[0]?.name}
													</span>
												)}
												<span
													className={`px-3 py-1 rounded-full text-xs font-inter font-medium bg-[#FFF4D8] text-[#8E6E3B]
															}`}
												>
													{resource?.resource === 'course' ? 'Curso' : 'Guía'}
												</span>
											</div>
										</div>

										{/* Title section - fixed height with ellipsis if needed */}
										<div className='mb-2'>
											<h4 className='font-raleway font-bold text-xl leading-tight text-[#1A1A1A] line-clamp-2'>
												{resource?.title}
											</h4>
										</div>

										{/* Author section - fixed height */}
										<div className='mb-4'>
											<p className='font-inter text-sm text-[#4F5D89]'>{resource?.cedente?.name}</p>
										</div>

										{/* Button - positioned absolutely */}
										<div className='absolute bottom-4 right-4'>
											<CtaButton onClick={() => {}}>Descubrir</CtaButton>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				) : // Optional: Show a different message if interests exist but no resources yet
				isInterestsLoading ? (
					<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px] order-5 md:order-5'>
						<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-6 text-[#1A1A1A]'>
							Recursos recomendados para tí
						</h3>
						<p className='text-[#4F5D89] font-inter text-center'>Cargando recomendaciones...</p>
					</div>
				) : interests &&
				  (interests.specialty_interests?.length > 0 ||
						interests.content_interests?.length > 0 ||
						interests.other_interests?.length > 0) ? (
					// Case 2: No resources yet, but interests exist -> Show "Searching..."
					<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px] order-5 md:order-5'>
						<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-6 text-[#1A1A1A]'>
							Recursos recomendados para tí
						</h3>
						<p className='text-[#4F5D89] font-inter text-center'>
							Estamos buscando los mejores recursos para tus intereses...
						</p>
					</div>
				) : (
					// Case 3: No resources and no interests -> Show "Complete interests"
					<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px] order-5 md:order-5'>
						<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-6 text-[#1A1A1A]'>
							Recursos recomendados para tí
						</h3>
						<p className='text-[#4F5D89] font-inter text-center'>Completa tus intereses para ver recursos recomendados.</p>
					</div>
				)}
			</div>

			{/* Render the Invoices Modal */}
			<InvoicesModal contracts={data?.contracts} isOpen={showInvoicesModal} onClose={() => setShowInvoicesModal(false)} />
		</>
	);
};

export default DashboardHero;
