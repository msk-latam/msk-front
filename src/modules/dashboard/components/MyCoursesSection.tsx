import ArrowLeftIcon from '@/dashboard/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/dashboard/assets/icons/ArrowRightIcon';
import CalendarIcon from '@/dashboard/assets/icons/CalendarIcon';
import TrophyIcon from '@/dashboard/assets/icons/TrophyIcon';
import CtaButton from '@/dashboard/components/ui/CtaButton';
import { useLmsNavigation } from '@/hooks/useLmsNavigation';
import Image from 'next/image';
import React, { useState } from 'react';

interface Course {
	id: number;
	image: string;
	status: string;
	title: string;
	expiryDate?: string;
	qualification?: number;
	statusType: 'progress' | 'inactive' | 'finished' | 'expired' | 'Activo' | 'Finalizado' | 'Expirado';
	statusText: string;
	createdDate?: string;
	isFavorite?: boolean;
	product_code?: number;
	product_code_cedente?: string;
}

const MyCoursesSection: React.FC<{ courseData: Course[]; userEmail: string }> = ({ courseData, userEmail }) => {
	const [activeTab, setActiveTab] = useState('Todo');
	const [sortBy, setSortBy] = useState('Más recientes');
	const [currentPage, setCurrentPage] = useState(1);
	const coursesPerPage = 4;
	const { navigateToLms, isLoading: isNavigating, error: navigationError } = useLmsNavigation();

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
		if (course.expiryDate && course.statusType !== 'Expirado' && course.statusType !== 'Finalizado') {
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
				return (
					<>
						<button className={secondaryButtonClass}>Ir al foro</button>
						<CtaButton
							onClick={() => {
								if (course.product_code && course.product_code_cedente && userEmail) {
									navigateToLms(course.product_code, course.product_code_cedente, userEmail);
								} else {
									console.error('Missing data for LMS navigation:', course);
								}
							}}
							isDisabled={isNavigating}
						>
							{isNavigating ? 'Cargando...' : 'Ir al curso'}
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
					className='w-8 h-8 flex items-center justify-center rounded-full border border-[#DBDDE2] text-[#4F5D89] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
				>
					<ArrowLeftIcon />
				</button>
				<span className='font-inter text-sm'>
					<span className='font-bold text-[#1A1A1A]'>{String(currentPage).padStart(2, '0')}</span>
					<span className='text-[#4F5D89]'> / {String(totalPages).padStart(2, '0')}</span>
				</span>
				<button
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
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
