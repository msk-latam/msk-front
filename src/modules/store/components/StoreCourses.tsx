'use client';

import { Course, CoursesApiResponse } from '@/types/course'; // Import types
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'; // Added useRouter, usePathname
import React, { useEffect, useState } from 'react'; // Added useRef, useCallback
import CourseCardSkeleton from './CourseCardSkeleton'; // Import Skeleton
import Pagination from './Pagination'; // Import Pagination
import StoreCoursesHead from './StoreCoursesHead';

// Define your filter keys if you need to be specific
const filterKeys = ['especialidades', 'recurso', 'profesion', 'duracion'];

// Debounce hook utility (can be moved to a utils file)
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}

interface StoreCoursesProps {
	// Props if any
	onOpenFilters?: () => void; // Añadimos la prop para abrir el modal de filtros
	lang: string;
}

const StoreCourses: React.FC<StoreCoursesProps> = ({ onOpenFilters, lang }) => {
	const router = useRouter(); // Added
	const pathname = usePathname(); // Added
	const searchParams = useSearchParams();
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalCourses, setTotalCourses] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// State for the search input
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

	// Calculate the total count of selected filter *options*
	let totalSelectedOptionsCount = 0;
	searchParams?.forEach((value, key) => {
		// Exclude 'search' and pagination params from filter count
		if (filterKeys.includes(key)) {
			const selectedOptions = value.split(',').filter(Boolean); // Filter out empty strings if value is empty
			totalSelectedOptionsCount += selectedOptions.length;
		}
	});

	// Effect to initialize searchTerm from URL on mount
	useEffect(() => {
		setSearchTerm(searchParams?.get('search') || '');
	}, []); // Run only once on mount

	// Effect to update URL when debounced search term changes
	useEffect(() => {
		const current = new URLSearchParams(searchParams?.toString());
		const currentSearch = current.get('search');

		// Update URL only if debounced term is different from current URL search param
		// or if it's empty and the param exists
		if (debouncedSearchTerm !== (currentSearch || '')) {
			const params = new URLSearchParams(searchParams?.toString());
			if (debouncedSearchTerm) {
				params.set('search', debouncedSearchTerm);
			} else {
				params.delete('search');
			}
			// Reset page to 1 when search term changes
			params.set('page', '1');
			router.push(`${pathname}?${params.toString()}`, { scroll: false });
		}
	}, [debouncedSearchTerm, searchParams, pathname, router]);

	useEffect(() => {
		const fetchCourses = async () => {
			setIsLoading(true);
			setError(null);
			try {
				// Construct the API URL with search parameters
				const params = new URLSearchParams(searchParams?.toString()); // Use current searchParams

				// Ensure required params are set (might be redundant if already in searchParams)
				params.set('lang', lang || 'int');
				params.set('page', params.get('page') || '1');
				params.set('per_page', params.get('per_page') || '12');

				// API parameter mapping - use the params directly from searchParams
				if (params.has('especialidades')) {
					params.set('specialty', params.get('especialidades') || '');
					params.delete('especialidades'); // Remove original key if needed by API
				}
				if (params.has('profesion')) {
					params.set('profession', params.get('profesion') || '');
					params.delete('profesion'); // Remove original key
				}
				if (params.has('duracion')) {
					params.set('duration', params.get('duracion') || '');
					params.delete('duracion'); // Remove original key
				}

				if (params.has('recurso')) {
					const recursoValue = params.get('recurso') || '';
					// Translate values: 'curso' to 'course', 'guias-profesionales' to 'downloadable'
					let translatedValue = recursoValue;
					if (recursoValue === 'curso') {
						translatedValue = 'course';
					} else if (recursoValue === 'guias-profesionales') {
						translatedValue = 'downloadable';
					}
					params.set('resource', translatedValue);
					params.delete('recurso'); // Remove original key
				}
				// NOTE: The 'search' parameter is already in `params` because the previous useEffect updated the URL

				const page = params.get('page') || '1';
				setCurrentPage(parseInt(page, 10));

				const apiUrl = `https://cms1.msklatam.com/wp-json/msk/v1/products?${params.toString()}`;
				console.log('Fetching courses with URL:', apiUrl); // Log the URL for debugging

				const response = await fetch(apiUrl);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data: CoursesApiResponse = await response.json();
				setCourses(data.data);
				setTotalCourses(data.meta.total);
				setTotalPages(data.meta.pages);
				setCurrentPage(data.meta.page);
			} catch (e: any) {
				console.error('Failed to fetch courses:', e);
				setError(`Failed to load courses: ${e.message}`);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCourses();
	}, [searchParams]); // Re-fetch ONLY when searchParams change

	const handleSearchChange = (term: string) => {
		setSearchTerm(term);
	};

	return (
		<div className='md:col-span-1 md:row-span-3 bg-white rounded-[30px] p-[36px] order-1 md:order-1'>
			<StoreCoursesHead
				filterCount={totalSelectedOptionsCount}
				searchTerm={searchTerm}
				onSearchChange={handleSearchChange}
				onOpenFilters={onOpenFilters}
			/>
			{isLoading ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
					{Array.from({ length: 12 }).map((_, index) => (
						<CourseCardSkeleton key={index} />
					))}
				</div>
			) : error ? (
				<p className='text-[#f5006d]'>{error}</p> // Show error message
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
					{courses.length > 0 ? (
						courses.map((course) => {
							const lang = pathname?.split('/')[1] || 'ar'; // Obtener el idioma desde la ruta

							return (
								<Link href={`${course.slug}`} key={course.id} className='border rounded-[30px] bg-white flex flex-col'>
									<img
										src={course.featured_images.medium}
										alt={course.title}
										className='w-full h-48 object-cover rounded-t-[30px]'
									/>
									<div className='p-4 flex flex-col h-full'>
										<div className='flex flex-wrap gap-1 mb-2 text-xs'>
											{course.resource === 'downloadable' ? (
												<>
													<span className='px-2 py-1 rounded-full bg-green-100 text-green-800'>Guía profesional</span>
													{course.categories
														.filter((cat) => cat.is_primary)
														.map((cat) => (
															<span key={cat.term_id} className='px-2 py-1 rounded-full bg-blue-100 text-blue-800'>
																{cat.name}
															</span>
														))}
												</>
											) : (
												course.categories
													.sort((a) => (a.is_primary ? -1 : 1)) // Sort primary category first
													.slice(0, 2) // Limit to 2 categories for display
													.map((cat) => (
														<span
															key={cat.term_id}
															className={`px-2 py-1 rounded-full ${
																cat.is_primary ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
															}`}
														>
															{cat.name}
														</span>
													))
											)}
										</div>
										<h3 className='font-bold text-lg mb-1'>{course.title}</h3>
										{typeof course.cedente === 'object' && !Array.isArray(course.cedente) && (
											<p className='text-sm text-gray-600 mb-3'>{course.cedente.name}</p>
										)}
										<div className='flex justify-between items-center text-sm text-gray-500 mt-auto'>
											<div>
												{course.duration && course.duration !== '0' && (
													<span className='flex items-center gap-1'>
														<svg width='14' height='18' viewBox='0 0 14 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
															<path
																d='M4.07235 14.4167H9.07235M2.07235 0.666687H11.0723C11.5391 0.666687 11.7724 0.666687 11.9507 0.757515C12.1075 0.837409 12.235 0.964893 12.3149 1.12169C12.4057 1.29995 12.4057 1.53331 12.4057 2.00002V3.72878C12.4057 4.13644 12.4057 4.34026 12.3596 4.53207C12.3188 4.70213 12.2515 4.86471 12.1601 5.01383C12.057 5.18202 11.9129 5.32615 11.6246 5.6144L9.18182 8.05721C8.85181 8.38723 8.6868 8.55223 8.62498 8.74251C8.5706 8.90988 8.5706 9.09016 8.62498 9.25753C8.6868 9.44781 8.85181 9.61281 9.18182 9.94283L11.6246 12.3856C11.9129 12.6739 12.057 12.818 12.1601 12.9862C12.2515 13.1353 12.3188 13.2979 12.3596 13.468C12.4057 13.6598 12.4057 13.8636 12.4057 14.2713V16C12.4057 16.4667 12.4057 16.7001 12.3149 16.8783C12.235 17.0351 12.1075 17.1626 11.9507 17.2425C11.7724 17.3334 11.5391 17.3334 11.0723 17.3334H2.07235C1.60564 17.3334 1.37228 17.3334 1.19402 17.2425C1.03722 17.1626 0.909736 17.0351 0.829842 16.8783C0.739014 16.7001 0.739014 16.4667 0.739014 16V14.2713C0.739014 13.8636 0.739014 13.6598 0.785064 13.468C0.825892 13.2979 0.893232 13.1353 0.984613 12.9862C1.08768 12.818 1.23181 12.6739 1.52006 12.3856L3.96287 9.94283C4.29289 9.61281 4.45789 9.44781 4.51972 9.25753C4.5741 9.09016 4.5741 8.90988 4.51972 8.74251C4.45789 8.55223 4.29288 8.38722 3.96287 8.05721L1.52006 5.6144C1.23181 5.32615 1.08768 5.18202 0.984613 5.01383C0.893232 4.86471 0.825892 4.70213 0.785064 4.53207C0.739014 4.34026 0.739014 4.13644 0.739014 3.72878V2.00002C0.739014 1.53331 0.739014 1.29995 0.829842 1.12169C0.909736 0.964893 1.03722 0.837409 1.19402 0.757515C1.37228 0.666687 1.60564 0.666687 2.07235 0.666687Z'
																stroke='#5A5F67'
																strokeWidth='1.25'
																strokeLinecap='round'
																strokeLinejoin='round'
															/>
														</svg>
														{course.duration} horas
													</span>
												)}
											</div>

											<Link
												href={`${course.slug}`}
												className='bg-[#191919] text-white px-4 py-2 rounded-full hover:bg-[#474b53] transition-colors'
											>
												Descubrir
											</Link>
										</div>
									</div>
								</Link>
							);
						})
					) : (
						<div className='col-span-full flex flex-col items-center justify-center py-10 px-4 text-center'>
							<svg
								className='w-16 h-16 text-gray-400 mb-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<p className='text-lg font-medium text-gray-700'>No se encontraron cursos</p>
							<p className='text-sm text-gray-500 mt-2'>Intenta con otros filtros o vuelve más tarde</p>
						</div>
					)}
				</div>
			)}
			{/* Render Pagination if not loading, no error, has courses, and more than one page */}
			{!isLoading && !error && courses.length > 0 && totalPages > 1 && (
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			)}
		</div>
	);
};

export default StoreCourses;
