import ArrowLeftIcon from '@/dashboard/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/dashboard/assets/icons/ArrowRightIcon';
import CalendarIcon from '@/dashboard/assets/icons/CalendarIcon';
import TrophyIcon from '@/dashboard/assets/icons/TrophyIcon';
import CtaButton from '@/dashboard/components/ui/CtaButton';
import { useLmsNavigation } from '@/hooks/useLmsNavigation';
import Image from 'next/image';
import React, { useState } from 'react';

// Simple SVG placeholders for icons - replace with actual icons later
const LightningIcon = () => (
	<svg width='20' height='23' viewBox='0 0 20 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M10.9662 1.33008L2.05963 12.0179C1.71082 12.4365 1.53641 12.6458 1.53375 12.8225C1.53143 12.9762 1.5999 13.1224 1.71943 13.219C1.85692 13.3301 2.12935 13.3301 2.6742 13.3301H9.96617L8.96617 21.3301L17.8727 10.6422C18.2215 10.2237 18.3959 10.0144 18.3986 9.83762C18.4009 9.68396 18.3324 9.53777 18.2129 9.44118C18.0754 9.33008 17.803 9.33008 17.2581 9.33008H9.96617L10.9662 1.33008Z'
			stroke='#9200AD'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
const LightningFastIcon = () => (
	<svg width='23' height='21' viewBox='0 0 23 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M8.63281 15.8301H3.13281M6.13281 10.3301H1.63281M8.63281 4.83008H3.63281M16.6328 1.33008L10.0364 10.5651C9.74441 10.9738 9.59843 11.1782 9.60475 11.3486C9.61025 11.497 9.68139 11.6352 9.79891 11.7259C9.93389 11.8301 10.1851 11.8301 10.6874 11.8301H15.6328L14.6328 19.3301L21.2292 10.0951C21.5212 9.68632 21.6672 9.48195 21.6609 9.31155C21.6554 9.1632 21.5842 9.02496 21.4667 8.93426C21.3317 8.83008 21.0806 8.83008 20.5783 8.83008H15.6328L16.6328 1.33008Z'
			stroke='#9200AD'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
const RocketIcon = () => (
	<svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M10.2996 14.3303L7.29956 11.3303M10.2996 14.3303C11.6964 13.7991 13.0364 13.129 14.2996 12.3303M10.2996 14.3303V19.3303C10.2996 19.3303 13.3296 18.7803 14.2996 17.3303C15.3796 15.7103 14.2996 12.3303 14.2996 12.3303M7.29956 11.3303C7.83171 9.94976 8.50176 8.62639 9.29956 7.38033C10.4647 5.51731 12.0872 3.98337 14.0126 2.92442C15.9379 1.86546 18.1022 1.3167 20.2996 1.33033C20.2996 4.05033 19.5196 8.83033 14.2996 12.3303M7.29956 11.3303H2.29956C2.29956 11.3303 2.84956 8.30033 4.29956 7.33033C5.91956 6.25033 9.29956 7.33033 9.29956 7.33033M2.79956 15.8303C1.29956 17.0903 0.799561 20.8303 0.799561 20.8303C0.799561 20.8303 4.53956 20.3303 5.79956 18.8303C6.50956 17.9903 6.49956 16.7003 5.70956 15.9203C5.32087 15.5493 4.80885 15.335 4.27179 15.3184C3.73472 15.3017 3.21044 15.4841 2.79956 15.8303Z'
			stroke='#9200AD'
			stroke-width='1.5'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
);

interface Course {
	id: number;
	image: string;
	status: string;
	title: string;
	expiryDate?: string;
	qualification?: number;
	statusType: 'progress' | 'inactive' | 'finished' | 'expired' | 'Activo' | 'Finalizado' | 'Expirado' | 'Sin enrolar';
	statusText: string;
	createdDate?: string;
	isFavorite?: boolean;
	product_code?: number;
	product_code_cedente?: string;
	link_al_foro?: string;
}

const MyCoursesSection: React.FC<{ courseData: Course[]; userEmail: string }> = ({ courseData, userEmail }) => {
	const [activeTab, setActiveTab] = useState('Todo');
	const [sortBy, setSortBy] = useState('Más recientes');
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPlan, setSelectedPlan] = useState('Regular');
	const [navigatingCourseId, setNavigatingCourseId] = useState<number | null>(null);
	const coursesPerPage = 4;
	const { navigateToLms, isLoading: isNavigating, error: navigationError } = useLmsNavigation();

	// --- Conditional Rendering for No Courses ---
	if (!courseData || courseData.length === 0) {
		return (
			<></>
			// <div className='bg-white rounded-[30px] p-[36px] mt-5 flex  gap-8 items-center'>
			// 	{/* Left Side: Text and Button */}
			// 	<div className='flex flex-col gap-4 max-w-[500px]'>
			// 		<h2 className='font-raleway text-[34px] font-medium leading-tight text-[#1A1A1A]'>
			// 			Arma tu plan de aprendizaje gratuito
			// 		</h2>
			// 		<p className='text-[##6E737C] font-inter text-base font-normal'>
			// 			Capacítate a tu manera y toma el control de tu desarrollo académico
			// 		</p>
			// 		<button className='bg-[#f3f4f6] text-[#989CA4] px-6 py-3 rounded-full font-inter font-medium text-sm hover:bg-[#e2e3e5] transition self-start'>
			// 			Descubrir plan de aprendizaje
			// 		</button>
			// 	</div>

			// 	{/* Right Side: Plan Selection */}
			// 	<div className='bg-[#F7F8FC] rounded-[20px] p-6 flex flex-col gap-4 w-full'>
			// 		<h3 className='text-[#1A1A1A] font-raleway font-semibold text-xl text-center'>
			// 			¿Qué plan quieres llevar adelante?
			// 		</h3>
			// 		<div className='flex flex-col md:flex-row gap-4 justify-center items-center w-full'>
			// 			{/* Plan Option: Tranquilo */}
			// 			<button
			// 				className={`flex flex-col items-center gap-2 p-6 rounded-[38px] border ${
			// 					selectedPlan === 'Tranquilo' ? 'border-[#93A6E0] bg-[#DFE6FF]' : 'border-[#DBDDE2] bg-white'
			// 				} hover:border-[#93A6E0] transition w-full`}
			// 				onClick={() => setSelectedPlan('Tranquilo')}
			// 			>
			// 				<LightningIcon />
			// 				<span className='font-inter font-semibold text-[#1A1A1A]'>Tranquilo</span>
			// 				<span className='font-inter text-sm text-[#4F5D89]'>30 minutos semanales</span>
			// 			</button>
			// 			{/* Plan Option: Regular */}
			// 			<button
			// 				className={`flex flex-col items-center gap-2 p-6 rounded-[38px] border ${
			// 					selectedPlan === 'Regular' ? 'border-[#93A6E0] bg-[#DFE6FF]' : 'border-[#DBDDE2] bg-white'
			// 				} hover:border-[#93A6E0] transition w-full`}
			// 				onClick={() => setSelectedPlan('Regular')}
			// 			>
			// 				<LightningFastIcon />
			// 				<span className='font-inter font-semibold text-[#1A1A1A]'>Regular</span>
			// 				<span className='font-inter text-sm text-[#4F5D89]'>60 minutos semanales</span>
			// 			</button>
			// 			{/* Plan Option: Intensivo */}
			// 			<button
			// 				className={`flex flex-col items-center gap-2 p-6 rounded-[38px] border ${
			// 					selectedPlan === 'Intensivo' ? 'border-[#93A6E0] bg-[#DFE6FF]' : 'border-[#DBDDE2] bg-white'
			// 				} hover:border-[#93A6E0] transition w-full`}
			// 				onClick={() => setSelectedPlan('Intensivo')}
			// 			>
			// 				<RocketIcon />
			// 				<span className='font-inter font-semibold text-[#1A1A1A]'>Intensivo</span>
			// 				<span className='font-inter text-sm text-[#4F5D89]'>+120 minutos semanales</span>
			// 			</button>
			// 		</div>
			// 	</div>
			// </div>
		);
	}

	// --- Filtering Logic ---
	const filteredCourses = courseData.filter((course) => {
		if (activeTab === 'Todo') {
			return true; // Show all courses
		}
		if (activeTab === 'Cursos') {
			// Adjust this condition based on how you define 'Cursos'
			// For example, show only active or not finished courses
			return course.statusType === 'Activo' || course.statusType === 'progress';
		}
		if (activeTab === 'Favoritos') {
			// Assuming you have an 'isFavorite' property in your Course interface
			return course.isFavorite === true;
		}
		return true; // Default case, should not happen with current tabs
	});

	// --- Sorting Logic ---
	const sortedCourses = [...filteredCourses].sort((a, b) => {
		switch (sortBy) {
			case 'Más recientes':
				// Assuming 'createdDate' exists and is in a sortable format (e.g., ISO string)
				return new Date(b.createdDate || 0).getTime() - new Date(a.createdDate || 0).getTime();
			case 'Más antiguos':
				return new Date(a.createdDate || 0).getTime() - new Date(b.createdDate || 0).getTime();
			case 'Alfabético':
				return a.title.localeCompare(b.title);
			default:
				return 0;
		}
	});

	// --- Pagination Logic ---
	const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
		setCurrentPage(1); // Reset page when tab changes
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(event.target.value);
		setCurrentPage(1); // Reset page when sort changes
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const getStatusStyles = (statusType: Course['statusType']) => {
		switch (statusType) {
			case 'Activo':
				return 'bg-[#FFEBF6] text-[#C42B8B]'; // Pink
			case 'Finalizado':
				return 'bg-[#DFE6FF] text-[#29324F]'; // Blue
			case 'Expirado':
				return 'bg-[#FFF4D8] text-[#8E6E3B]'; // Yellow
			case 'inactive':
				return 'bg-[#DFE6FF] text-[#29324F]'; // Blue
			case 'finished':
				return 'bg-[#DFE6FF] text-[#29324F]'; // Blue
			case 'expired':
				return 'bg-[#FFF4D8] text-[#8E6E3B]'; // Yellow
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const renderInfoLine = (course: Course) => {
		if (
			course.expiryDate &&
			course.statusType !== 'Expirado' &&
			course.statusType !== 'Finalizado' &&
			course.statusType !== 'Sin enrolar'
		) {
			const date = new Date(course.expiryDate);
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear();
			const formattedDate = `${day}-${month}-${year}`;
			return (
				<div className='flex items-center gap-1.5 text-xs text-[#4F5D89] font-inter font-medium'>
					<CalendarIcon />
					<span>Fecha de Expiración: {formattedDate}</span>
				</div>
			);
		}
		if (course.qualification !== undefined && course.statusType === 'Finalizado') {
			return (
				<div className='flex items-center gap-1.5 text-xs text-[#4F5D89] font-inter font-medium'>
					<TrophyIcon />
					<span>Calificación: {course.qualification}</span>
					<a
						href={`https://www.google.com`}
						target='_blank'
						rel='noopener noreferrer'
						className='cursor-pointer text-[#9200AD] underline font-inter font-medium text-sm'
					>
						Ver certificado
					</a>
				</div>
			);
		}
	};

	const renderButtons = (course: Course) => {
		const secondaryButtonClass =
			'bg-white text-[#1A1A1A] border border-[#DBDDE2]  px-6 py-3 rounded-full font-inter font-medium text-sm hover:bg-[#838790] transition whitespace-nowrap';

		switch (course.statusType) {
			case 'Activo':
			case 'Finalizado':
			case 'Sin enrolar':
				return (
					<>
						<button
							style={{ display: course?.link_al_foro ? '' : 'none' }}
							className={`${secondaryButtonClass} ${!course?.link_al_foro ? 'opacity-50 cursor-not-allowed' : ''}`}
							onClick={() => course?.link_al_foro && window.open(course.link_al_foro, '_blank')}
							disabled={!course?.link_al_foro}
						>
							Ir al foro
						</button>

						<CtaButton
							onClick={async () => {
								if (course.product_code && course.product_code_cedente && userEmail) {
									setNavigatingCourseId(course.product_code);
									try {
										await navigateToLms(course.product_code, course.product_code_cedente, userEmail);
									} catch (error) {
										console.error('LMS navigation failed for course:', course.product_code, error);
									} finally {
										setNavigatingCourseId(null);
									}
								} else {
									console.error('Missing data for LMS navigation:', course);
								}
							}}
							isDisabled={navigatingCourseId === course.product_code}
						>
							{navigatingCourseId === course.product_code
								? 'Cargando...'
								: course.statusType === 'Sin enrolar'
								? 'Activar'
								: 'Ir al curso'}
						</CtaButton>
					</>
				);

			case 'Expirado':
				return <CtaButton onClick={() => {}}>Reactivar</CtaButton>;
			default:
				return null;
		}
	};

	return (
		<div className='bg-white rounded-[30px] p-[36px] mt-5'>
			{/* Header: Title, Tabs, Sorting */}
			<h2 className='font-raleway text-[34px] font-medium leading-[100%] text-[#1A1A1A] whitespace-nowrap mb-6'>
				Mis cursos
			</h2>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full'>
				<div className='flex flex-col md:flex-row items-center justify-between md:items-center gap-4 w-full '>
					{/* Tabs */}
					<div className='flex items-center gap-2  p-1'>
						{['Todo', 'Cursos', 'Favoritos'].map((tab) => (
							<button
								key={tab}
								onClick={() => handleTabClick(tab)}
								className={`px-4 py-2 rounded-full   text-sm font-inter transition ${
									activeTab === tab ? 'border border-[#DBDDE2] text-[#1A1A1A] font-medium' : 'text-[#4F5D89]'
								}`}
							>
								{tab}
							</button>
						))}
					</div>
					{/* Sorting */}
					<div className='flex items-center gap-2 text-sm'>
						<span className='text-[#4F5D89] font-inter'>Ordenar por</span>
						<div className='relative'>
							<select
								value={sortBy}
								onChange={handleSortChange}
								className='appearance-none border border-[#DBDDE2] rounded-full px-4 py-2 pr-8 text-[#1A1A1A] font-inter font-medium bg-white focus:outline-none focus:ring-1 focus:ring-[#9200AD]'
							>
								<option value='Más recientes'>Más recientes</option>
								<option value='Más antiguos'>Más antiguos</option>
								<option value='Alfabético'>Alfabético</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Courses Grid / Mobile Carousel */}
			<div className='flex space-x-4 overflow-x-auto scroll-snap-x scroll-snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:space-x-0 md:overflow-x-visible md:scroll-snap-none pb-4 -mb-4 scrollbar-hide '>
				{currentCourses.map((course) => (
					<div
						key={course.id}
						className='w-[90%] flex-shrink-0 scroll-snap-start md:w-auto md:flex-shrink bg-white rounded-[20px] border border-[#DBDDE2] overflow-hidden flex flex-col'
					>
						{/* Image */}
						<div className='relative w-full h-[160px]'>
							<div className='absolute inset-0'>
								<Image src={course.image} alt={course.title} fill={true} className='object-cover' />
							</div>
						</div>
						{/* Content */}
						<div className='p-4 flex flex-col flex-grow justify-between'>
							<div>
								{/* Status Tag */}
								<span
									className={`inline-block px-3 py-1 rounded-full text-xs font-inter font-medium mb-3 ${getStatusStyles(
										(course as Course).statusType,
									)}`}
								>
									{course.statusText}
								</span>
								{/* Title */}
								<h4 className='font-raleway font-bold text-base leading-tight text-[#1A1A1A] mb-2 min-h-[48px]'>
									{course.title}
								</h4>
								{/* Info Line */}
								<div className='min-h-[20px] mb-3 font-inter'>{renderInfoLine(course as Course)}</div>
							</div>
							{/* Buttons */}
							<div className='flex items-center gap-2 justify-end mt-auto'>{renderButtons(course as Course)}</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination - Hidden on Mobile */}
			<div className='flex justify-center items-center gap-4 mt-6'>
				<button
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					style={{ visibility: totalPages ? 'visible' : 'hidden' }}
					className='w-8 h-8 flex items-center justify-center rounded-full border border-[#DBDDE2] text-[#4F5D89] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
				>
					<ArrowLeftIcon />
				</button>
				<span className='font-inter text-sm' style={{ visibility: totalPages ? 'visible' : 'hidden' }}>
					<span className='font-bold text-[#1A1A1A]'>{String(currentPage).padStart(2, '0')}</span>
					<span className='text-[#4F5D89]'> / {String(totalPages).padStart(2, '0')}</span>
				</span>
				<button
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
					style={{ visibility: totalPages ? 'visible' : 'hidden' }}
					className='w-8 h-8 flex items-center justify-center rounded-full border border-[#DBDDE2] text-[#4F5D89] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
				>
					<ArrowRightIcon />
				</button>
			</div>

			{navigationError && <p className='text-[#f5006d] text-center mt-4'>{navigationError}</p>}
		</div>
	);
};

export default MyCoursesSection;
