import React from 'react';

// Placeholder SearchIcon - Replace with your actual icon component/SVG
const SearchIcon = ({ className }: { className?: string }) => (
	<svg width='17' height='18' viewBox='0 0 17 18' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
		<path
			d='M16.0723 16.5L12.4473 12.875M14.4056 8.16667C14.4056 11.8486 11.4208 14.8333 7.73893 14.8333C4.05703 14.8333 1.07227 11.8486 1.07227 8.16667C1.07227 4.48477 4.05703 1.5 7.73893 1.5C11.4208 1.5 14.4056 4.48477 14.4056 8.16667Z'
			stroke='#5A5F67'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

interface StoreCoursesHeadProps {
	filterCount: number;
	// Add props for search/sort state and handlers from the parent
	searchTerm: string;
	onSearchChange: (term: string) => void;
	// sortKey: string;
	// onSortChange: (key: string) => void;
	onOpenFilters?: () => void; // Función para abrir el modal de filtros
}

const StoreCoursesHead: React.FC<StoreCoursesHeadProps> = ({
	filterCount,
	searchTerm,
	onSearchChange,
	onOpenFilters = () => {},
	/*, ...other props */
}) => {
	// Mock sort options for now - move to parent or constants file if needed
	const sortOptions = [
		{ id: 'novedades', name: 'Novedades' },
		{ id: 'precio-asc', name: 'Precio (Menor a Mayor)' },
		{ id: 'precio-desc', name: 'Precio (Mayor a Menor)' },
		{ id: 'relevancia', name: 'Relevancia' },
	];

	return (
		<div className='flex flex-wrap items-center justify-between gap-4 mb-6 text-black dark:text-white'>
			{/* Filter Button and Search */}
			<div className='flex flex-col md:flex-row items-center gap-4 flex-grow sm:flex-grow-0'>
				{/* Filter Button - Style to match image */}
				<button
					onClick={onOpenFilters}
					className='px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 flex items-center justify-center w-full md:w-[142px]'
				>
					<span>Filtros {filterCount > 0 ? `(${filterCount})` : ''}</span>
					<svg
						className='md:hidden ml-2'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M3 7H21' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
						<path d='M6 12H18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
						<path d='M10 17H14' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
					</svg>
				</button>

				{/* Search Input - Style to match image */}
				<div className='relative flex-grow w-full md:max-w-xs'>
					<input
						type='text'
						placeholder='Buscar'
						className='w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
					<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
						<SearchIcon className='w-5 h-5 text-gray-400' />
					</div>
				</div>
			</div>

			{/* Sort Dropdown - Style to match image */}
			<div className='flex items-center gap-2 justify-between w-full md:w-auto'>
				<span className='text-sm text-gray-500'>Ordenar por</span>
				{/* Using standard select for now */}
				<select
					className='min-w-[150px] appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm'
					// value={sortKey}
					// onChange={(e) => onSortChange(e.target.value)}
				>
					{sortOptions.map((option) => (
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default StoreCoursesHead;
