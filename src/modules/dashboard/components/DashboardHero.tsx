import Image from 'next/image';
import React from 'react';
// Import UserData type from the service
import { UserData } from '@/lib/localStorageService/userDataService';

// Import SVG icon components
import ArrowRightIcon from '@/dashboard/assets/icons/ArrowRightIcon';
import DocumentIcon from '@/dashboard/assets/icons/DocumentIcon';
import EditIcon from '@/dashboard/assets/icons/EditIcon';
import PlusIcon from '@/dashboard/assets/icons/PlusIcon';
import UserIcon from '@/dashboard/assets/icons/UserIcon';
import AddButton from '@/dashboard/components/ui/AddButton';
import CtaButton from '@/dashboard/components/ui/CtaButton';
import EditButton from '@/dashboard/components/ui/EditButton';

// Import only the type, not the functions

// Define UserData type locally or import from service if exported
// It's better to define it once in the service and export/import it
interface UserDetail {
	label: string;
	value: string;
	placeholder: string;
}

interface ProfileCompletion {
	percentage: number;
	message: string;
	ctaText: string;
	ctaLink: string;
}

// Re-defining UserData here temporarily if not imported
interface UserDataForHero {
	profileImage: string;
	firstName?: string;
	lastName?: string;
	specialty: string;
	email?: string;
	phone?: string;
	details: UserDetail[];
	profileCompletion?: ProfileCompletion | null;
	interests?: string[];
	currentCourse: {
		image: string;
		label: string;
		title: string;
		progress: string;
	};
	recommendedResources: {
		image: string;
		title: string;
		author: string;
		tags: string[];
		buttonText: string;
		buttonLink: string;
	}[];
}

// Define props for DashboardHero
interface DashboardHeroProps {
	userData: UserData | null;
	onEditProfile: (field?: string) => void;
}

// Map for icon components
const IconMap: Record<string, React.FC> = {
	EditIcon: EditIcon,
	ArrowRight: ArrowRightIcon,
	PlusIcon: PlusIcon,
	DocumentIcon: DocumentIcon,
	UserIcon: UserIcon,
};

const DashboardHero: React.FC<DashboardHeroProps> = ({ userData, onEditProfile }) => {
	// Helper function to check if a field is empty
	const isEmpty = (value: string | undefined | null) => !value || value.trim() === '';

	// Renamed handleEditProfile to call the prop
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
			Intereses: 'interests',
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

	// Show loading state or return null if data hasn't loaded yet (handled by parent now)
	if (!userData) {
		// Parent component handles loading state
		return null; // Or potentially a minimal skeleton
	}

	// Use the userData prop directly
	const data = userData;

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-[468px_1fr] lg:grid-cols-[468px_3fr_3fr] gap-5 '>
				{/* User Profile Section - spans 1 column on mobile, 1 column on desktop */}
				<div className='md:col-span-1 md:row-span-3 bg-white rounded-[30px] p-[36px]'>
					{/* Profile Picture */}
					<div className='relative w-[126px] h-[126px] mx-auto mb-6'>
						<div className='w-full h-full overflow-hidden rounded-full border'>
							<Image
								src={data.profileImage || '/default-avatar.png'}
								alt='Profile'
								width={126}
								height={126}
								className='w-full h-full object-cover'
								onError={(e) => {
									e.currentTarget.src = '/default-avatar.png';
								}}
							/>
						</div>
						<div className='absolute bottom-0 right-0'>
							<EditButton onClick={() => handleEditClick('profileImage')} filled />
						</div>
					</div>

					{/* User Info */}
					<div className='mb-5 pb-4 border-b border-gray-100'>
						<h2 className='text-3xl font-bold font-raleway text-center mb-4 leading-[110%]'>
							{`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Nombre Apellido'}
						</h2>

						<div className='flex items-center justify-center'>
							<div className='flex gap-1 items-center justify-center'>
								<p
									className={`font-inter font-medium text-lg leading-[24px] text-center flex items-center justify-center ${
										!isEmpty(data.specialty) ? 'text-[#1A1A1A]' : 'text-[#4F5D89]'
									}`}
								>
									{isEmpty(data.specialty) ? 'Completar especialidad' : data.specialty}
								</p>
								{isEmpty(data.specialty) ? (
									<AddButton onClick={() => handleEditClick('Completar especialidad')} />
								) : (
									<EditButton onClick={() => handleEditClick('specialty')} />
								)}
							</div>
						</div>
					</div>

					{/* User Details - Display specified root fields: value if present, placeholder if empty */}
					{(() => {
						// Define the root fields to display in this section
						// Use the full UserData type for better safety with keys
						const fieldsToDisplayConfig: { key: keyof UserData; placeholder: string; label: string }[] = [
							{
								key: 'profesion',
								placeholder: 'Completar profesión',
								label: 'Profesión',
							},
							{ key: 'email', placeholder: 'Completar email', label: 'Email' },
							{ key: 'country', placeholder: 'Completar país', label: 'País' },
							{ key: 'phone', placeholder: 'Completar teléfono', label: 'Teléfono' },
							// Add other root fields here
						];

						return fieldsToDisplayConfig.map((fieldConf, index) => {
							// Explicitly cast data[fieldConf.key] to string | undefined | null for isEmpty check
							// Use UserData here as well for consistency
							const value = data[fieldConf.key as keyof UserData] as string | undefined | null;
							let displayValue = value; // Use a separate variable for the display value
							const fieldIsEmpty = isEmpty(value);

							/* mapear profesion usando diccionario */
							const professionLabels: Record<string, string> = {
								medico: 'Personal Médico',
								enfermero: 'Personal de Enfermería',
								enfermera: 'Personal de Enfermería',
							};

							const countryLabels: Record<string, string> = {
								ar: 'Argentina',
								es: 'España',
								fr: 'Francia',
								de: 'Alemania',
								it: 'Italia',
								pt: 'Portugal',
							};

							const specialtyLabels: Record<string, string> = {
								cardiologia: 'Cardiología',
								dermatologia: 'Dermatología',
								endocrinologia: 'Endocrinología',
								ginecologia: 'Ginecología',
								nutricion: 'Nutrición',
							};

							if (fieldConf.key === 'specialty') {
								displayValue = specialtyLabels[value as string] || value;
							}

							if (fieldConf.key === 'profesion') {
								displayValue = professionLabels[value as string] || value;
							}

							if (fieldConf.key === 'country') {
								displayValue = countryLabels[value as string] || value;
							}

							return (
								<div
									key={index}
									className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100 last:border-b-0'
								>
									<div className='flex justify-between items-center w-full'>
										<span
											className={`font-inter font-medium text-base leading-[24px] ${
												fieldIsEmpty ? 'text-[#4F5D89]' : 'text-[#1A1A1A]'
											}`}
										>
											{fieldIsEmpty ? fieldConf.placeholder : displayValue}
										</span>
										{fieldIsEmpty ? (
											// Pass placeholder to map correctly in handleEditClick
											<AddButton onClick={() => handleEditClick(fieldConf.placeholder)} />
										) : (
											// Pass the actual field key for editing
											<EditButton onClick={() => handleEditClick(fieldConf.key as string)} />
										)}
									</div>
								</div>
							);
						});
					})()}

					{/* Profile Completion Progress */}
					{data.profileCompletion && data.profileCompletion.percentage < 100 && (
						<div className='mt-6 bg-[#F7F9FF] rounded-[30px] p-[36px]'>
							<div className='relative h-8 w-full bg-blue-100 rounded-full overflow-hidden'>
								<div
									className='absolute top-0 left-0 h-full rounded-full bg-[#9200AD] transition-width duration-300 ease-in-out'
									style={{ width: `${data.profileCompletion.percentage}%` }}
								>
									<span className='absolute px-3 py-1 rounded-full bg-[#9200AD] text-white text-base font-medium -translate-y-1/2 translate-x-2 top-1/2 left-0 whitespace-nowrap'>
										Tu perfil {data.profileCompletion.percentage}%
									</span>
								</div>
							</div>
							<div className='mt-4 text-center text-sm'>
								<span className='text-[#4F5D89]'>{data.profileCompletion.message} </span>
								<a
									href={data.profileCompletion.ctaLink}
									onClick={(e) => {
										e.preventDefault();
										handleEditClick();
									}}
									className='text-[#9200AD] font-medium underline cursor-pointer'
								>
									{data.profileCompletion.ctaText}
								</a>
							</div>
						</div>
					)}
				</div>

				{/* Course Section - spans 2 columns on desktop */}
				{data.currentCourse && (
					<div className='md:col-span-2 rounded-[30px]  overflow-hidden group'>
						<div className='bg-cover bg-top h-[300px] relative flex flex-col justify-center p-[36px] text-white overflow-hidden'>
							<div
								className='absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-top'
								style={{ backgroundImage: `url(${data.currentCourse.image})` }}
							></div>

							{/* Overlay gradient */}
							<div
								className='absolute inset-0'
								style={{ background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.54) 38.02%, rgba(0, 0, 0, 0.09) 87.34%)' }}
							></div>

							{/* Course Label */}
							<div className='relative z-10 flex justify-between items-center'>
								<div className='flex flex-col items-start gap-5'>
									<span className='bg-[#DFE6FF] text-[#29324F] font-inter font-normal text-base  rounded-full px-3 py-1.5'>
										{data.currentCourse.label || 'Aprendizaje'}
									</span>

									<h2 className='text-white font-raleway font-[700] text-[36px] leading-[44px] max-w-[25ch]'>
										{data.currentCourse.title}
									</h2>
								</div>
								<CtaButton onClick={() => {}} showIcon={true}>
									Continuar
								</CtaButton>
							</div>

							{/* Progress Bar */}
							<div className='w-full h-[40px] bg-[#00000033]  absolute bottom-0 left-0'>
								<div
									className='h-full bg-[#00000080] px-[36px] flex items-center justify-start transition-width duration-300 ease-in-out'
									style={{ width: `${data.currentCourse.progress}` }}
								>
									<span className='text-white font-inter font-medium text-base leading-[24px] whitespace-nowrap'>
										{data.currentCourse.progress} completado
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Interests Section - spans 2 columns on desktop */}
				<div className='md:col-span-2 bg-white rounded-[30px] p-[36px]'>
					<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-3 text-[#1A1A1A]'>Tus intereses</h3>

					{data.interests && data.interests.length > 0 ? (
						<div className='flex flex-wrap gap-2 mb-4 items-center'>
							{data.interests.map((interest, index) => (
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
							<p className='text-[#4F5D89] font-inter text-center mb-6'>
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

				{/* Action Cards Section - spans 2 columns on desktop */}
				<div className='md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5'>
					{/* Mis facturas */}
					<button className='bg-white text-left flex items-center justify-start border border-[#DBDDE2] rounded-[30px] p-[36px] hover:shadow-md transition-shadow'>
						<div className=' w-[26px] text-[#9200AD] mr-4 flex-shrink-0'>
							<DocumentIcon />
						</div>
						<div>
							<h3 className='font-raleway font-bold text-[20px] leading-[28px] mb-1 text-[#1A1A1A]'>Mis facturas</h3>
							<p className='font-inter font-normal text-base leading-6 tracking-[0%] text-[#4F5D89]'>
								Encuentra y descarga tus facturas
							</p>
						</div>
					</button>

					{/* Mis cursos */}
					<button className='bg-white text-left flex items-center justify-start border border-[#DBDDE2] rounded-[30px] p-[36px] hover:shadow-md transition-shadow'>
						<div className=' w-[26px] text-[#9200AD] mr-4 flex-shrink-0'>
							<UserIcon />
						</div>
						<div>
							<h3 className='font-raleway font-bold text-[20px] leading-[28px] mb-1 text-[#1A1A1A]'>Mi cuenta</h3>
							<p className='font-inter font-normal text-base leading-6 tracking-[0%]  text-[#4F5D89]'>
								Gestiona todo lo relacionado con tus datos personales
							</p>
						</div>
					</button>
				</div>

				{/* Recommended Resources Section - spans full width below others */}
				{data.recommendedResources && data.recommendedResources.length > 0 ? (
					<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px]'>
						<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-6 text-[#1A1A1A]'>
							Recursos recomendados para tí
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{data.recommendedResources.map((resource, index) => (
								<div
									key={index}
									className='bg-white rounded-[30px] overflow-hidden flex flex-col md:flex-row border border-[#DBDDE2] hover:shadow-md transition-shadow'
								>
									{/* Image Section */}
									<div className='relative w-full md:w-[200px] h-[180px] md:h-auto flex-shrink-0 bg-gray-100'>
										<Image
											src={resource.image || '/placeholder-resource.jpg'}
											alt={resource.title}
											layout='fill'
											objectFit='cover'
											onError={(e) => {
												e.currentTarget.src = '/placeholder-resource.jpg';
											}}
										/>
									</div>

									{/* Content Section */}
									<div className='p-6 flex flex-col justify-between flex-grow'>
										<div>
											{/* Tags */}
											<div className='flex flex-wrap gap-2 mb-3'>
												{resource.tags?.map((tag, tagIndex) => (
													<span
														key={tagIndex}
														className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${
															tag === 'Nutrición' || tag === 'Endocrinología'
																? 'bg-[#DFE6FF] text-[#29324F]'
																: 'bg-[#FFF4D8] text-[#8E6E3B]'
														}`}
													>
														{tag}
													</span>
												))}
											</div>

											{/* Title */}
											<h4 className='font-raleway font-bold text-xl leading-tight mb-2 text-[#1A1A1A]'>{resource.title}</h4>

											{/* Author */}
											<p className='font-inter text-sm text-[#4F5D89] mb-4'>{resource.author}</p>
										</div>

										{/* Button */}
										<div className='mt-4 self-start md:self-end'>
											<CtaButton
												onClick={() => {
													console.log('Navigate to:', resource.buttonLink);
												}}
											>
												{resource.buttonText}
											</CtaButton>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px]'>
						<h3 className='font-raleway text-[34px] font-medium leading-[100%] mb-6 text-[#1A1A1A]'>
							Recursos recomendados para tí
						</h3>
						<p className='text-[#4F5D89] font-inter text-center'>Completa tu perfil para ver recursos recomendados.</p>
					</div>
				)}
			</div>
		</>
	);
};

export default DashboardHero;
