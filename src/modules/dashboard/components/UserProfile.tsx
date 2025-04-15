'use client';

import Image from 'next/image';

interface UserProfileProps {
	name: string;
	specialty: string;
	email: string;
	country: string;
	phone: string;
	profileImage: string;
	onEditProfile: () => void;
}

export default function UserProfile({
	name,
	specialty,
	email,
	country,
	phone,
	profileImage,
	onEditProfile,
}: UserProfileProps) {
	return (
		<div className='bg-white rounded-3xl shadow-sm p-6'>
			<div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
				<div className='relative'>
					<Image src={profileImage} alt={name} width={120} height={120} className='rounded-full border-4 border-[#9200AD]' />
					<button onClick={onEditProfile} className='absolute bottom-1 right-1 bg-[#9200AD] text-white p-1 rounded-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
							/>
						</svg>
					</button>
				</div>
				<div className='flex-1'>
					<h1 className='text-2xl font-semibold text-gray-800'>{name}</h1>
					<p className='text-violet-700 font-medium'>{specialty}</p>
					<div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3'>
						<div className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
								/>
							</svg>
							<span className='text-gray-700'>{email}</span>
						</div>
						<div className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
								/>
							</svg>
							<span className='text-gray-700'>{country}</span>
						</div>
						<div className='flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
								/>
							</svg>
							<span className='text-gray-700'>{phone}</span>
						</div>
					</div>
				</div>
				<button onClick={onEditProfile} className='text-violet-700 underline font-medium text-sm'>
					Cambiar datos personales
				</button>
			</div>
		</div>
	);
}
