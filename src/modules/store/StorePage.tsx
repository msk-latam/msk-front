import React, { useEffect, useState } from 'react';
import StoreCourses from './components/StoreCourses';
import StoreFilters from './components/StoreFilters';
import StoreHeader from './components/StoreHeader';

const StorePage: React.FC = () => {
	// State to hold the count of active filters
	const [activeFilterCount, setActiveFilterCount] = useState<number>(0);

	// Handler function to receive filter count updates from StoreFilters
	const handleFilterCountChange = (count: number) => {
		console.log('⭐ Filter count updated:', count, typeof count);

		// Ensure count is a number
		const safeCount = typeof count === 'number' ? count : 0;
		setActiveFilterCount(safeCount);
	};

	// Debug useEffect to verify state is updating
	useEffect(() => {
		console.log('🔄 Active filter count in state:', activeFilterCount);
	}, [activeFilterCount]);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			{/* Header section */}
			<StoreHeader />

			<div className='mb-4 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md'>
				<p className='text-blue-800'>Debug: Active Filters Count: {activeFilterCount}</p>
			</div>

			{/* Main content grid with filters and courses */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-8'>
				{/* Filters sidebar - Pass the handler */}
				<StoreFilters onFilterCountChange={handleFilterCountChange} />

				{/* Courses content area - Pass the count */}
				<StoreCourses filterCount={activeFilterCount} />
			</div>
		</div>
	);
};

export default StorePage;
