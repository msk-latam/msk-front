import React from 'react';

interface Hability {
	name: string;
}

interface Props {
	habilities: Hability[];
}

export default function CourseHabilities({ habilities }: Props) {
	return (
		<>
			<h2 className='text-2xl whitespace-nowrap font-medium md:text-[34px] text-[#1A1A1A] font-raleway mb-6 text-center md:text-left'>
				Desarróllate en lo importante
			</h2>
			<div className='flex flex-wrap gap-3 md:justify-start md:items-center justify-center items-center mb-8'>
				{habilities.map((item, index) => (
					<span key={index} className='bg-[#f7f9ff] text-[#29324f] text-sm font-inter font-normal md:px-4 px-2 py-2 rounded-full shadow-sm'>
						{item.name}
					</span>
				))}
			</div>
		</>
	);
}
