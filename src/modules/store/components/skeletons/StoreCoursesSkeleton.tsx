import CourseCardSkeleton from '../CourseCardSkeleton';

export default function StoreCoursesSkeleton() {
	return (
		<div className='md:col-span-1 md:row-span-3 bg-white rounded-[30px] p-[36px] order-1 md:order-1'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{Array.from({ length: 12 }).map((_, index) => (
					<CourseCardSkeleton key={index} />
				))}
			</div>
		</div>
	);
}
