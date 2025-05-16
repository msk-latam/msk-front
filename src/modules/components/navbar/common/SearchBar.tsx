'use client';

import { supportedLanguages } from '@/config/languages';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { urlFormat } from '@/utils/urlFormat';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'react-feather';
import { useAllCourses } from '../hooks/useAllCourses';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
	placeholder: string;
	isMainView?: boolean;
	isDiscoverView?: boolean;
	isSpecialtyView?: boolean;
	isSpecialtyDetailView?: boolean;
	isInstitutionsView?: boolean;
	className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder,
	isMainView = false,
	isDiscoverView = false,
	isSpecialtyView = false,
	isSpecialtyDetailView = false,
	isInstitutionsView = false,
	className = '',
}) => {
	const pathname = usePathname();
	const router = useRouter();

	const firstSegment = pathname?.split('/')[1];
	const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';

	const { courses, loading, error, fetchCourses } = useAllCourses(lang);

	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const [filteredResults, setFilteredResults] = useState<any[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const searchContainerRef = useRef<HTMLDivElement>(null);

	const inputTextStyle =
		isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
			? ''
			: isInstitutionsView
			? 'text-[#838790] border-[#989ca4]'
			: '';

	useEffect(() => {
		const trimmed = debouncedSearchTerm.trim();

		if (trimmed === '') {
			setFilteredResults([]);
			setIsDropdownOpen(false);
			return;
		}

		if (loading) {
			setIsDropdownOpen(true); // Mostrar spinner mientras carga
			return;
		}

		if (courses.length === 0) {
			setFilteredResults([]);
			setIsDropdownOpen(true); // Mostrar spinner o mensaje vacío si cargó sin resultados
			return;
		}

		const filtered = courses.filter(
			(course) => typeof course.title === 'string' && course.title.toLowerCase().includes(trimmed.toLowerCase()),
		);

		setFilteredResults(filtered);
		setIsDropdownOpen(true);
	}, [debouncedSearchTerm, courses, loading]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleInputFocus = () => {
		if (courses.length === 0 && !loading) {
			fetchCourses(); // 👈 solo busca si aún no cargó
		}

		if (searchTerm.trim() !== '' && filteredResults.length > 0) {
			setIsDropdownOpen(true);
		}
	};

	const handleItemClick = (course: any) => {
		const rawUrl: string | undefined = course.url || course.link;

		if (!rawUrl || typeof rawUrl !== 'string') {
			console.warn('Course without valid url/link', course);
			return;
		}

		// Ensure leading slash for consistent regex handling
		const normalized = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;

		const coursePath = normalized.replace(/^\/?(course|curso)/, '');

		const storeUrl = getLocalizedUrl(lang, `/curso${coursePath}`);

		window.location.href = urlFormat(storeUrl);
		setSearchTerm('');
		setIsDropdownOpen(false);
	};

	const handleSearchRedirect = () => {
		const trimmedSearch = searchTerm.trim();
		if (trimmedSearch !== '') {
			const query = encodeURIComponent(trimmedSearch);
			const searchPath = `/tienda?page=1&search=${query}`;
			window.location.href = urlFormat(searchPath);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchRedirect();
		}
	};

	const uniqueResults = Array.from(new Map(filteredResults.map((item) => [`${item.id}-${item.title}`, item])).values());

	return (
		<div className={`relative ${className}`} ref={searchContainerRef}>
			<div className='rounded-full border border-[#DBDDE2]-100 overflow-hidden relative flex items-center'>
				<input
					type='search'
					placeholder={placeholder}
					value={searchTerm}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onKeyDown={handleKeyDown}
					className={`bg-transparent w-full text-sm py-3 pl-4 pr-12 border-transparent focus:border-transparent focus:ring-0 focus:outline-none ${inputTextStyle}`}
				/>
				<button className='absolute right-1 bg-[#9200AD] p-3 rounded-full' onClick={handleSearchRedirect} type='button'>
					<Search className='text-white w-4 h-4' />
				</button>
			</div>

			{isDropdownOpen && searchTerm && (
				<div className='absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto'>
					{loading ? (
						<div className='p-4 text-gray-500 flex items-center justify-center'>
							<svg
								className='animate-spin h-5 w-5 mr-2 text-[#9200AD]'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
							>
								<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
								<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
							</svg>
							Buscando cursos...
						</div>
					) : uniqueResults.length > 0 ? (
						<ul>
							{uniqueResults.map((course) => (
								<li
									key={`${course.id}-${course.title}`}
									className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
									onClick={() => handleItemClick(course)}
								>
									{course.title}
								</li>
							))}
						</ul>
					) : (
						<div className='p-4 text-gray-500'>No se encontraron resultados.</div>
					)}
				</div>
			)}

			{isDropdownOpen && searchTerm && !loading && filteredResults.length === 0 && (
				<div className='absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md p-4 text-gray-500'>
					No se encontraron resultados.
				</div>
			)}
		</div>
	);
};

export default SearchBar;
