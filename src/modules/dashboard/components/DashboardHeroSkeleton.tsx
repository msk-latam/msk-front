import React from 'react';

const DashboardHeroSkeleton: React.FC = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-[468px_1fr] lg:grid-cols-[468px_3fr_3fr] gap-5 animate-pulse'>
			{/* User Profile Section - skeleton */}
			<div className='md:col-span-1 md:row-span-3 bg-white rounded-[30px] p-[36px]'>
				{/* Profile Picture skeleton */}
				<div className='relative w-[126px] h-[126px] mx-auto mb-6'>
					<div className='w-full h-full overflow-hidden rounded-full bg-gray-200'></div>
					<div className='absolute bottom-0 right-0'>
						<div className='w-10 h-10 rounded-full bg-gray-200'></div>
					</div>
				</div>

				{/* User Info skeleton */}
				<div className='mb-5 pb-4 border-b border-gray-100'>
					<div className='h-8 bg-gray-200 rounded-md w-3/4 mx-auto mb-4'></div>
					<div className='flex items-center justify-center'>
						<div className='h-6 bg-gray-200 rounded-md w-1/2'></div>
					</div>
				</div>

				{/* User Details skeleton */}
				<div className='space-y-4'>
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className='flex justify-between items-center mb-4 pb-4 border-b border-gray-100'>
							<div className='h-6 bg-gray-200 rounded-md w-3/4'></div>
							<div className='w-8 h-8 rounded-full bg-gray-200'></div>
						</div>
					))}
				</div>

				{/* Profile Completion skeleton */}
				<div className='mt-6 bg-[#F7F9FF] rounded-[30px] p-[36px]'>
					<div className='relative h-8 w-full bg-gray-200 rounded-full'></div>
					<div className='mt-4 text-center'>
						<div className='h-4 bg-gray-200 rounded-md w-3/4 mx-auto'></div>
					</div>
				</div>
			</div>

			{/* Course Section - skeleton */}
			<div className='md:col-span-2 rounded-[30px] overflow-hidden'>
				<div className='bg-gray-200 h-[300px]  rounded-[30px]  relative flex flex-col justify-center p-[36px]'>
					<div className='relative z-10 flex justify-between items-center'>
						<div className='flex flex-col items-start gap-5'>
							<div className='h-6 bg-gray-300 rounded-full w-32 px-3 py-1.5'></div>
							<div className='h-12 bg-gray-300 rounded-md w-full max-w-md'></div>
						</div>
						<div className='h-12 bg-gray-300 rounded-full w-32'></div>
					</div>
				</div>
			</div>

			{/* Interests Section - skeleton */}
			<div className='md:col-span-2 bg-white rounded-[30px] p-[36px]'>
				<div className='h-10 bg-gray-200 rounded-md w-1/4 mb-3'></div>
				<div className='flex flex-wrap gap-2 mb-4 items-center'>
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className='h-10 bg-gray-200 rounded-full w-32'></div>
					))}
				</div>
			</div>

			{/* Action Cards Section - skeleton */}
			<div className='md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5'>
				{[1, 2].map((i) => (
					<div key={i} className='bg-white border border-[#DBDDE2] rounded-[30px] p-[36px]'>
						<div className='flex items-center'>
							<div className='w-[26px] h-[26px] bg-gray-200 rounded-full mr-4'></div>
							<div className='w-full'>
								<div className='h-6 bg-gray-200 rounded-md w-1/2 mb-1'></div>
								<div className='h-4 bg-gray-200 rounded-md w-3/4'></div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Recommended Resources Section - skeleton */}
			<div className='md:col-span-2 lg:col-span-3 bg-white rounded-[30px] p-[36px]'>
				<div className='h-10 bg-gray-200 rounded-md w-2/5 mb-6'></div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					{[1, 2].map((i) => (
						<div
							key={i}
							className='bg-white rounded-[30px] overflow-hidden flex flex-col md:flex-row border border-[#DBDDE2]'
						>
							<div className='relative w-full md:w-[200px] h-[180px] md:h-auto flex-shrink-0 bg-gray-200'></div>
							<div className='p-6 flex flex-col justify-between flex-grow'>
								<div>
									<div className='flex flex-wrap gap-2 mb-3'>
										{[1, 2].map((j) => (
											<div key={j} className='h-5 bg-gray-200 rounded-full w-16'></div>
										))}
									</div>
									<div className='h-6 bg-gray-200 rounded-md w-5/6 mb-2'></div>
									<div className='h-4 bg-gray-200 rounded-md w-1/3 mb-4'></div>
								</div>
								<div className='h-10 bg-gray-200 rounded-full w-32 self-start md:self-end'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardHeroSkeleton;
