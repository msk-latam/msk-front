export default function StoreFiltersSkeleton() {
	return (
		/* <div className={`mb-4 bg-white  ${className}`}> */
		<div className='bg-white rounded-[30px] p-[36px]  row-span-3'>
			<div className='h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse'></div>
			<div className='space-y-3'>
				{[...Array(3)].map((_, i) => (
					<div key={i} className='flex items-center gap-2 animate-pulse'>
						<div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
						<div className='space-y-2'>
							<div className='h-4 bg-gray-200 rounded w-full'></div>
							<div className='h-4 bg-gray-200 rounded w-5/6'></div>
						</div>
					</div>
				))}
				<div className='h-10 bg-gray-200 rounded w-full mt-6'></div>
			</div>
		</div>
	);
}
