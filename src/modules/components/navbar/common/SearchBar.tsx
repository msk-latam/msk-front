import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { useSpecialtyDetailView } from '../hooks/useSpecialtyDetailView';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname, useRouter } from 'next/navigation';
import { supportedLanguages } from '@/config/languages';
import { urlFormat } from '@/utils/urlFormat';

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
	const { data, loading } = useSpecialtyDetailView();
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredResults, setFilteredResults] = useState<any[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const searchContainerRef = useRef<HTMLDivElement>(null);

	const router = useRouter();
	const pathname = usePathname();
	const firstSegment = pathname?.split('/')[1];
	const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';

	const inputTextStyle =
		isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
			? ''
			: isInstitutionsView
			? 'text-[#838790] border-[#989ca4]'
			: '';

	// 🔁 Buscar por nombre de curso
	useEffect(() => {
		if (searchTerm.trim() === '') {
			setFilteredResults([]);
			setIsDropdownOpen(false);
		} else {
			const allCourses = data.flatMap((item) => item.courses);
			const filtered = allCourses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()));
			setFilteredResults(filtered);
			setIsDropdownOpen(true);
		}
	}, [searchTerm, data]);

	// Event listener para cerrar el dropdown al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		// Añadir event listener cuando el dropdown está abierto
		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		// Cleanup function para remover el event listener
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleInputFocus = () => {
		if (searchTerm.trim() !== '' && filteredResults.length > 0) {
			setIsDropdownOpen(true);
		}
	};

	// ✅ Redirige a /tienda/curso.url
	const handleItemClick = (course: any) => {
		const coursePath = course.url.replace(/^\/(course|curso)/, '');
		const storeUrl = getLocalizedUrl(lang, `/curso${coursePath}`);
		// Use window.location.href for consistent navigation across all pages
		
		window.location.href = urlFormat(course.url);
		setSearchTerm('');
		setIsDropdownOpen(false);
	};

	const handleSearchRedirect = () => {
		const trimmedSearch = searchTerm.trim();
		if (trimmedSearch !== '') {
			const query = encodeURIComponent(trimmedSearch);
			// Fix: Ensure the search query is properly included in the URL using absolute path
			const searchPath = `/tienda?page=1&search=${query}`;
			const storeUrl = getLocalizedUrl(lang, searchPath);
			console.log('Redirecting to:', storeUrl);
			// Make sure we're using the complete URL
			window.location.href = storeUrl;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchRedirect();
		}
	};

	const uniqueResults = Array.from(new Map(filteredResults.map((item) => [`${item.id}-${item.name}`, item])).values());

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

			{isDropdownOpen && searchTerm && filteredResults.length > 0 && (
				<ul className='absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto'>
					{uniqueResults.map((course) => (
						<li
							key={`${course.id}-${course.name}`}
							className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
							onClick={() => handleItemClick(course)}
						>
							{course.name}
						</li>
					))}
				</ul>
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
