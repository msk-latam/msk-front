'use client';

import { supportedLanguages } from '@/config/languages';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { urlFormat } from '@/utils/urlFormat';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'react-feather';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchCourses } from '../hooks/useSearchCourses';

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

	const firstSegment = pathname?.split('/')[1];
	const lang: string = firstSegment && supportedLanguages.includes(firstSegment) ? firstSegment : 'ar';

	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const { courses, loading } = useSearchCourses(lang, debouncedSearchTerm);

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
			setIsDropdownOpen(false);
			return;
		}

		// Show the dropdown whenever there is a search term (spinner or results will be handled below)
		setIsDropdownOpen(true);
	}, [debouncedSearchTerm]);

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
		if (searchTerm.trim() !== '') {
			setIsDropdownOpen(true);
		}
	};

	const handleItemClick = (course: any) => {
		const rawUrl: string | undefined = course.link;

		if (!rawUrl || typeof rawUrl !== 'string') {
			console.warn('Course without valid url/link', course);
			return;
		}

		/* mantener el idioma en el url */
		const storeUrl = getLocalizedUrl(lang, rawUrl);

		window.location.href = storeUrl;
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

	const uniqueResults = Array.from(new Map(courses.map((item) => [`${item.id}-${item.title}`, item])).values());

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
					<Search className='w-4 h-4 text-white' />
				</button>
			</div>

			{isDropdownOpen && searchTerm && (
				<div className='absolute z-10 w-full mt-2 overflow-y-auto bg-white border rounded-lg shadow-md max-h-60'>
					{loading ? (
						<div className='flex items-center justify-center p-4 text-gray-500'>
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
									className='px-4 py-2 cursor-pointer hover:bg-gray-100'
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

			{isDropdownOpen && searchTerm && !loading && uniqueResults.length === 0 && (
				<div className='absolute z-10 w-full p-4 mt-2 text-gray-500 bg-white border rounded-lg shadow-md'>
					No se encontraron resultados.
				</div>
			)}
		</div>
	);
};

export default SearchBar;
