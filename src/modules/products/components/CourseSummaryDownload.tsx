'use client';

// import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
// import { Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useCourseSummary } from '../hooks/useCourseSummary';
import SkeletonCourseSummaryCard from '../skeletons/SkeletonCourseSummaryCard';
import DownloadSyllabusModal from './DownloadSyllabusModal'; // 👈 Asegúrate de importar esto

interface CourseSummaryProps {
	slug: string;
	lang: string;
}

export default function CourseSummaryDownload({ slug, lang }: CourseSummaryProps) {
	const { data, loading } = useCourseSummary(slug, lang);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const enrolledFormatted = data?.enrolled;
	// const modules = data?.modules;
	// const duration = data?.duration + ' horas estimadas';
	// const certification = data?.certification;
	// const max_installments = data?.max_installments;
	// const showPrice = lang.toLowerCase() !== 'es';
	const files = data?.files

	if (loading) return <SkeletonCourseSummaryCard />;

	const handleDownloadClick = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<div className='bg-white rounded-[38px] p-6 md:p-8 sticky top-10 w-full' style={{ backgroundColor: '#FFFFFF' }}>
			<Image
				src={data?.featured_images.medium ?? ''}
				alt='Curso'
				className='rounded-xl w-full object-cover mb-6'
				width={420}
				height={300}
			/>

			<ul className='text-sm text-[#4F5D89] font-inter font-medium space-y-3 mb-6'>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/graduate.svg' alt='' className='w-4 h-4' />
					Contenido de nivel académico
				</li>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/account.svg' alt='' className='w-4 h-4' />
					Acceso a tu cuenta de MSK
				</li>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/access.svg' alt='' className='w-4 h-4' />
					Acceso a contenidos personalizados
				</li>
			</ul>


			{/* Botones CTA */}
			<div className='space-y-3'>
				<button
					onClick={handleDownloadClick}
					className='bg-[#9200AD] hover:bg-[#6b1679] text-white w-full py-3 rounded-full font-inter font-medium text-base transition'
				>
					Descargar ahora
				</button>
			</div>

			{isModalOpen && data?.files && (
				<DownloadSyllabusModal slug={slug} fileUrl={data.files} onClose={handleCloseModal} isDownloadable={true}/>
			)}
		</div>
	);
}
