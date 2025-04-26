'use client';

import Image from 'next/image';
import { useCourseInstitutions } from '../hooks/useCourseInstitutions';
import InfoIcon from './InfoIcon';

interface CourseInstitutionProps {
	slug: string;
}

export default function CourseInstitutions({ slug }: CourseInstitutionProps) {
	const { data: institutions, loading, error } = useCourseInstitutions(slug);

	if (!loading && !institutions) return null;
	

	return (
		<section className='md:py-3 text-left h-fit'>
			<h2 className='text-xl md:text-2xl font-medium mb-6 w-fit'>
				Estas instituciones respaldan tu aprendizaje y revalorizan tu perfil profesional
			</h2>

			{/* Scroll horizontal en mobile */}
			<div className='overflow-x-auto md:overflow-visible scrollbar-none '>
				<div className='flex gap-4 md:flex-row flex-wrap items-center justify-center px-2'>
					{loading && <p>Cargando instituciones...</p>}
					{error && <p>{error}</p>}
					{institutions?.map((inst) => (
						<div
							key={inst.id}
							className='bg-[#f7f9ff] rounded-[30px] p-7 h-32 flex items-center justify-center md:w-1/4 relative'
						>
							<Image
								src={inst.image}
								alt={inst.title}
								width={200}
								height={80}
								className='object-cover object-center mix-blend-multiply max-h-[80px]'
							/>
							{/* {inst.title && (
								<div className='absolute bottom-2 right-2 group'>
									<InfoIcon />
									<div className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2 bg-[#3B476C] text-white text-sm rounded-lg p-3 text-center pointer-events-none w-max max-w-[200px] z-10'>
										{inst.title}
										<div className='absolute w-3 h-3 bg-[#3B476C] transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-6px] z-[-1]'></div>
									</div>
								</div>
							)} */}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
