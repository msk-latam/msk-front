import React from 'react';

// Placeholder SearchIcon - Replace with your actual icon component/SVG
const SearchIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='currentColor'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
		/>
	</svg>
);

interface StoreCoursesHeadProps {
	// Make filterCount optional with default value
	filterCount?: number;
	// Add props for search/sort state and handlers from the parent
	// searchTerm: string;
	// onSearchChange: (term: string) => void;
	// sortKey: string;
	// onSortChange: (key: string) => void;
}

const StoreCoursesHead: React.FC<StoreCoursesHeadProps> = ({
	filterCount = 0, // Default to 0 if not provided
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
			<div className='flex items-center gap-4 flex-grow sm:flex-grow-0'>
				{/* Filter Button - Style to match image */}
				<button className='px-5 py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100'>
					Filtros {filterCount > 0 ? `(${filterCount})` : ''}
				</button>

				{/* Search Input - Style to match image */}
				<div className='relative flex-grow max-w-xs'>
					<input
						type='text'
						placeholder='Buscar'
						className='w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
						// value={searchTerm}
						// onChange={(e) => onSearchChange(e.target.value)}
					/>
					<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
						<SearchIcon className='w-5 h-5 text-gray-400' />
					</div>
				</div>
			</div>

			{/* Sort Dropdown - Style to match image */}
			<div className='flex items-center gap-2'>
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
