'use client';

import { useRouter, usePathname } from 'next/navigation';
import ArrowRightIcon from '@/store/assets/icons/ArrowRightIcon';
import HomeIcon from '@/store/assets/icons/DocumentIcon';
import { categoriesData } from '@/modules/store-category/data/categoriesData';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { useEffect, useState } from 'react';

interface StoreHeaderProps {
	category?: string;
}

const TiendaHeader = ({ category }: StoreHeaderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [lang, setLang] = useState('ar');

	// Detectar lang desde pathname
	useEffect(() => {
		const firstSegment = pathname?.split('/')?.[1];
		if (firstSegment?.length === 2) {
			setLang(firstSegment);
		}
	}, [pathname]);

	const categorySlug = category?.toLowerCase() || '';
	const categoryInfo = categoriesData[categorySlug];
	const headerTitle = categoryInfo?.headerTitle || 'Escoja una especialidad y comience su crecimiento personal';

	const handleGoToStore = () => {
		const storeUrl = getLocalizedUrl(lang, '/tienda');
		router.push(storeUrl);
	};

	return (
		<div className='flex flex-col items-center md:items-start justify-center h-full text-white md:mt-8 overflow-visible px-4 max-w-[1400px] mx-auto text-center md:text-left'>
			{/* Breadcrumb */}
			<div className='flex items-center text-sm mb-4'>
				<HomeIcon />
				<ArrowRightIcon />
				<button onClick={handleGoToStore} className='ml-2 hover:underline'>
					Tienda
				</button>
				<ArrowRightIcon />
				<span className='ml-2 font-raleway font-bold text-base leading-7 capitalize'>
					{categorySlug.replace(/-/g, ' ') || 'Especialidades'}
				</span>
			</div>

			{/* Title */}
			<h1 className='text-4xl font-raleway md:text-5xl lg:text-[51px] font-bold tracking-[0%]'>{headerTitle}</h1>
		</div>
	);
};

export default TiendaHeader;
