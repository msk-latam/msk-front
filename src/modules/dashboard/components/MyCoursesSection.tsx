import ArrowLeftIcon from '@/dashboard/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/dashboard/assets/icons/ArrowRightIcon';
import CalendarIcon from '@/dashboard/assets/icons/CalendarIcon';
import TrophyIcon from '@/dashboard/assets/icons/TrophyIcon';
import CtaButton from '@/dashboard/components/ui/CtaButton';
import userData from '@/dashboard/data/dashboardMock.json';
import Image from 'next/image';
import React, { useState } from 'react';

interface Course {
	id: number;
	image: string;
	status: string;
	title: string;
	expiryDate?: string;
	qualification?: number;
	statusType: 'progress' | 'inactive' | 'finished' | 'expired';
}

const MyCoursesSection: React.FC = () => {
	const [activeTab, setActiveTab] = useState('Todo');
	const [sortBy, setSortBy] = useState('Más recientes');
	const [currentPage, setCurrentPage] = useState(1);
	const coursesPerPage = 4;

	// TODO: Implement filtering based on activeTab
	const filteredCourses = userData.myCourses;

	// TODO: Implement sorting based on sortBy
	const sortedCourses = filteredCourses;

	// Pagination logic
	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
	const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

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
			case 'progress':
				return 'bg-[#FFEBF6] text-[#C42B8B]'; // Pink
			case 'inactive':
			case 'finished':
				return 'bg-[#DFE6FF] text-[#29324F]'; // Blue
			case 'expired':
				return 'bg-[#FFF4D8] text-[#8E6E3B]'; // Yellow
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const renderInfoLine = (course: Course) => {
		if (course.expiryDate) {
			return (
				<div className='flex items-center gap-1.5 text-xs text-[#4F5D89] font-inter'>
					<CalendarIcon />
					<span>Fecha de Expiración: {course.expiryDate}</span>
				</div>
			);
		}
		if (course.qualification !== undefined) {
			return (
				<div className='flex items-center gap-1.5 text-xs text-[#4F5D89] font-inter'>
					<TrophyIcon />
					<span>Calificación: {course.qualification}</span>
				</div>
			);
		}
		return null;
	};

	const renderButtons = (course: Course) => {
		const secondaryButtonClass =
			'bg-white text-[#1A1A1A] border border-[#DBDDE2] px-4 py-2 rounded-full font-inter font-medium text-xs hover:bg-gray-50 transition whitespace-nowrap';

		switch (course.statusType) {
			case 'progress':
				return (
					<>
						<button className={secondaryButtonClass}>Ir al foro</button>
						<CtaButton onClick={() => {}}>Ir al curso</CtaButton>
					</>
				);
			case 'inactive':
				return <CtaButton onClick={() => {}}>Activar</CtaButton>;
			case 'finished':
				return (
					<>
						<button className={secondaryButtonClass}>Ir al foro</button>
						<CtaButton onClick={() => {}}>Ver certificado</CtaButton>
					</>
				);
			case 'expired':
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
			<div className='flex space-x-4 overflow-x-auto scroll-snap-x scroll-snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:space-x-0 md:overflow-x-visible md:scroll-snap-none pb-4 -mb-4 scrollbar-hide mb-6'>
				{currentCourses.map((course) => (
					<div
						key={course.id}
						className='w-[90%] flex-shrink-0 scroll-snap-start md:w-auto md:flex-shrink bg-white rounded-[20px] border border-[#DBDDE2] overflow-hidden flex flex-col'
					>
						{/* Image */}
						<div className='relative w-full h-[160px]'>
							<Image src={course.image} alt={course.title} layout='fill' objectFit='cover' />
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
									{course.status}
								</span>
								{/* Title */}
								<h4 className='font-raleway font-bold text-base leading-tight text-[#1A1A1A] mb-2 min-h-[48px]'>
									{course.title}
								</h4>
								{/* Info Line */}
								<div className='min-h-[20px] mb-3'>{renderInfoLine(course as Course)}</div>
							</div>
							{/* Buttons */}
							<div className='flex items-center gap-2 justify-end mt-auto'>{renderButtons(course as Course)}</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination - Hidden on Mobile */}
			{totalPages > 1 && (
				<div className='hidden md:flex justify-center items-center gap-4 mt-6'>
					<button
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
						className='w-8 h-8 flex items-center justify-center rounded-full border border-[#DBDDE2] text-[#4F5D89] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
					>
						<ArrowLeftIcon />
					</button>
					<span className='font-inter text-sm text-[#1A1A1A]'>
						<span className='font-medium'>{String(currentPage).padStart(2, '0')}</span>
						<span className='text-[#C4C7CD]'> / {String(totalPages).padStart(2, '0')}</span>
					</span>
					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={currentPage === totalPages}
						className='w-8 h-8 flex items-center justify-center rounded-full border border-[#DBDDE2] text-[#4F5D89] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
					>
						<ArrowRightIcon />
					</button>
				</div>
			)}
		</div>
	);
};

export default MyCoursesSection;
