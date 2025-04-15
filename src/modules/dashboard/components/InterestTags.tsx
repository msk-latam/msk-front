'use client';

import Link from 'next/link';

interface Interest {
	name: string;
	url: string;
}

interface AdditionalButton {
	name: string;
	onClick?: () => void;
}

interface InterestTagsProps {
	interests: Interest[];
	additionalButtons?: AdditionalButton[];
}

export default function InterestTags({ interests, additionalButtons = [] }: InterestTagsProps) {
	return (
		<div className='bg-white rounded-3xl shadow-sm p-6'>
			<h2 className='text-xl font-semibold text-gray-800 mb-4'>Tus intereses</h2>
			<div className='flex flex-wrap gap-2 mb-4'>
				{interests.map((interest, index) => (
					<Link
						key={index}
						href={interest.url}
						className='px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200'
					>
						{interest.name}
					</Link>
				))}
			</div>

			{additionalButtons.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					{additionalButtons.map((button, index) => (
						<button
							key={index}
							onClick={button.onClick}
							className='px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200'
						>
							{button.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
