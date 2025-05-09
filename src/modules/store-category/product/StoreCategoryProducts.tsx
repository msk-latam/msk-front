'use client';

import { FC } from 'react';
import Link from 'next/link';
import { FetchCourseType } from '@/data/types';

interface TiendaProductosProps {
	category: string;
	country: string;
	courses: FetchCourseType[];
}

const TiendaProductos: FC<TiendaProductosProps> = ({ category, country, courses }) => {
	if (!courses.length) {
		return <p className='text-center py-10'>No se encontraron cursos para esta especialidad.</p>;
	}

	return (
		<div className='px-4 w-full flex justify-center'>
			<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px] py-8'>
				{courses.map((course) => {
					const tags = Array.isArray(course.tags) ? course.tags.map((tag) => tag.name) : [];

					return (
						<div key={course.id} className='bg-white rounded-xl shadow-md overflow-hidden'>
							<img
								src={course.image || '/images/default-course.jpg'}
								alt={course.title}
								className='w-full h-40 object-cover'
							/>
							<div className='p-4'>
								<div className='flex gap-2 text-xs mb-1'>
									{tags.map((tag) => (
										<span key={tag} className='bg-blue-100 text-blue-800 px-2 rounded'>
											{tag}
										</span>
									))}
								</div>
								<h3 className='font-semibold text-sm leading-snug mb-1'>{course.title}</h3>
								<p className='text-xs text-neutral-500'>{course.excerpt || 'Curso destacado'}</p>
								<div className='flex justify-between items-center mt-4'>
									<span className='text-xs text-neutral-500'>⏳ {course.duration || 0} horas</span>
									<Link
										href={`/es/tienda/${course.slug}`}
										className='text-sm font-semibold text-white bg-black rounded-full px-4 py-1 hover:bg-neutral-800'
									>
										Descubrir
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default TiendaProductos;
