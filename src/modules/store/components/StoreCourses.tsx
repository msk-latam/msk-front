import React, { useEffect } from 'react';
import StoreCoursesHead from './StoreCoursesHead';

interface StoreCoursesProps {
	filterCount?: number;
}

const StoreCourses: React.FC<StoreCoursesProps> = ({ filterCount = 0 }) => {
	// Debug log when filterCount changes
	useEffect(() => {
		console.log('📚 StoreCourses received filterCount:', filterCount);
	}, [filterCount]);

	return (
		<div className='md:col-span-3 md:row-span-3 bg-white rounded-[30px] p-[36px] order-2 md:order-2'>
			{/* Debug info (can be removed in production) */}
			<div className='mb-4 text-xs text-gray-500'>StoreCourses filter count: {filterCount}</div>

			{/* Pass the count to the header component */}
			<StoreCoursesHead filterCount={filterCount} />

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				<div className='border rounded p-4 bg-white'>Course Card Placeholder</div>
				<div className='border rounded p-4 bg-white'>Course Card Placeholder</div>
				<div className='border rounded p-4 bg-white'>Course Card Placeholder</div>
			</div>
		</div>
	);
};

export default StoreCourses;
