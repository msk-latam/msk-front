'use client';

import Image from 'next/image';

interface ResourceCardProps {
	title: string;
	image: string;
	category: string;
	institute: string;
	buttonText: string;
	buttonType: 'primary' | 'secondary';
	tags?: string[];
}

export default function ResourceCard({
	title,
	image,
	category,
	institute,
	buttonText,
	buttonType,
	tags = [],
}: ResourceCardProps) {
	return (
		<div className='bg-white rounded-3xl shadow-sm overflow-hidden'>
			<div className='relative h-48'>
				<Image src={image} alt={title} layout='fill' objectFit='cover' />
				<div className='absolute top-4 left-4'>
					<span className='bg-white text-xs px-2 py-1 rounded-full text-gray-700'>{category}</span>
				</div>

				{tags.length > 0 && (
					<div className='absolute top-4 right-4'>
						<span className='bg-white text-xs px-2 py-1 rounded-full text-gray-700'>{tags[0]}</span>
					</div>
				)}
			</div>
			<div className='p-4'>
				<h3 className='text-base font-semibold text-gray-800 mb-1'>{title}</h3>
				<p className='text-xs text-gray-500 mb-3'>{institute}</p>
				<button
					className={`w-full ${
						buttonType === 'primary' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
					} text-sm rounded-full py-2`}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
}
