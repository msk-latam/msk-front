'use client';

import { FC, useState } from 'react';
import { categoriesData } from './data/categoriesData';
import SpecialtiesModal from './components/SpecialtiesModal';
import StoreCategoryCourses from './components/StoreCategoryCourses';

interface TiendaProps {
	category: string;
	country: string | undefined;
	lang: string;
}

const Tienda: FC<TiendaProps> = ({ category, country, lang }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const categoryInfo = categoriesData[category];

	return (
		<>
			{categoryInfo && (
				<div className='bg-[#F5F8FF] rounded-xl p-6 mb-6 overflow-visible px-4 max-w-[1400px] mx-auto'>
					<h2 className='text-[#6474A6] text-xl font-bold mb-2'>{categoryInfo.pageTitle}</h2>
					<p className='text-[#6474A6] font-medium' dangerouslySetInnerHTML={{ __html: categoryInfo.pageDescription }} />
				</div>
			)}
			<div className='pb-[120px] overflow-visible px-4 max-w-[1400px] mx-auto'>
				<div className='text-center my-10'>
					<button
						onClick={() => setIsModalOpen(true)}
						className='bg-[#9200AD] text-white text-xl font-medium rounded-[38px] px-8 py-4 whitespace-nowrap hover:bg-[#6d0082]'
					>
						Ver especialidades
					</button>
				</div>

				<SpecialtiesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fixed='fixed' />

				<StoreCategoryCourses lang={lang} category={category} country={country ?? 'ar'} />
			</div>
		</>
	);
};

export default Tienda;
