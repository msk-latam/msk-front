'use client';
import React from 'react';

interface Feature {
	icon: React.ReactNode;
	title: string;
	description: string;
}

interface Props {
	features: Feature[];
}

export default function InfoCards({ features }: Props) {
	return (
		<div className='grid gap-4 md:grid-cols-3'>
			{features.map((item, index) => (
				<div key={index} className='rounded-[38px] border border-gray-200 py-6 px-6 shadow-sm bg-white'>
					<div className='flex justify-start pl-2 mb-3'>{item.icon}</div>
					<h3 className='font-raleway font-bold text-md text-[#1A1A1A] mb-2 break-words w-full text-left'>{item.title}</h3>
					<p className='text-sm font-inter font-normal text-[#1A1A1A] md:text-left text-center'>{item.description}</p>
				</div>
			))}
		</div>
	);
}
