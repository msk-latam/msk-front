// src/modules/store/components/CourseCardSkeleton.tsx
import React from 'react';

const CourseCardSkeleton: React.FC = () => {
	return (
		<div className='border rounded-[30px] bg-white animate-pulse'>
			{/* Image Skeleton */}
			<div className='w-full h-48 bg-gray-300 rounded-t-[30px] mb-2'></div>
			<div className='p-4'>
				{/* Category Skeletons */}
				<div className='flex flex-wrap gap-2 mb-2 text-xs'>
					<span className='px-8 py-2 bg-gray-300 rounded-full'></span>
					<span className='px-6 py-2 bg-gray-300 rounded-full'></span>
				</div>
				{/* Title Skeleton */}
				<div className='h-6 bg-gray-300 rounded mb-1 w-3/4'></div>
				{/* Cedente Skeleton */}
				<div className='h-4 bg-gray-300 rounded mb-3 w-1/4'></div>
				{/* Bottom Row Skeleton */}
				<div className='flex justify-between items-center'>
					{/* Duration Skeleton */}
					<div className='h-4 bg-gray-300 rounded w-1/5'></div>
					{/* Button Skeleton */}
					<div className='bg-gray-300 px-10 py-4 rounded-full'></div>
				</div>
			</div>
		</div>
	);
};

export default CourseCardSkeleton;
