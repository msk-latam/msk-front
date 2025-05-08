'use client';

import Image from 'next/image';
import { useCourseInstitutions } from '../../hooks/useCourseInstitutions';
import SkeletonCourseInstitutions from '../../skeletons/SkeletonCourseInstitutions'; // Importa el Skeleton
import InfoIcon from './InfoIcon';

interface CourseInstitutionProps {
	slug: string;
	lang: string;
}

export default function CourseInstitutions({ slug, lang }: CourseInstitutionProps) {
	const { data: institutions, loading, error } = useCourseInstitutions(slug, lang);

	if (!loading && !institutions) return null;

	// Mostrar Skeleton cuando los datos estén cargando
	if (loading) return <SkeletonCourseInstitutions />;

	return (
		<section className='md:py-3 text-left h-fit'>
			<h2 className='text-xl md:text-left text-center md:text-2xl text-[#1A1A1A] font-medium mb-6 w-fit'>
				Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
			</h2>

			<div className='overflow-x-auto md:overflow-visible scrollbar-none'>
				<div className='flex md:gap-3 gap-4 md:flex-row flex-wrap items-center justify-center md:px-0 px-2'>
					{error && <p>{error}</p>}
					{institutions?.map((inst) => (
						<div
							key={inst.id}
							className='bg-[#f7f9ff] rounded-[30px] p-7 h-32 flex items-center justify-center md:w-[23%] relative'
						>
							<Image
								src={inst.image}
								alt={inst.title}
								width={200}
								height={80}
								className='object-cover object-center mix-blend-multiply max-h-[80px] overflow-visible'
							/>
							{inst.description && (
								<div className='absolute bottom-2 right-2 group'>
									<InfoIcon />
									<div className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2 bg-[#3B476C] text-white text-sm rounded-lg p-3 text-center pointer-events-none w-max max-w-[200px] z-10'>
										{inst.description}
										<div className='absolute w-3 h-3 bg-[#3B476C] transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-6px] z-[-1]'></div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
