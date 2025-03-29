import React from 'react';
import { Specialty } from '@/data/types';
import Image from 'next/image';
import breadcrumArrowIcon from '@/public/images/icons/breadcrum_arrow.svg';

import especialidadesIcon from '@/public/webp-images/icons/especialidadesIcon.svg';

const CategoriesList = ({
	categories,
	onCategoryClick,
}: {
	categories: Specialty[];
	onCategoryClick: (category: Specialty) => void;
}) => {
	const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div>
			<li className='flex gap-2 items-center lg:px-4 py-2 text-lg'>
				<Image src={especialidadesIcon} alt='icon' width={20} height={20} />
				<h2 className='!font-inter'>Especialidades</h2>
			</li>
			<ul>
				{sortedCategories.map((category, index) => (
					<li
						onClick={() => onCategoryClick(category)}
						key={index}
						className='flex justify-between items-center lg:px-4 py-1 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md w-80 lg:w-auto'
					>
						<span>{category.name}</span>
						<img src={`${breadcrumArrowIcon.src}`} className='w-3 h-3' alt='Arrow' />
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoriesList;
