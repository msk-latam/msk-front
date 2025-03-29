import React from 'react';
import { FetchCourseType, Specialty } from '@/data/types';

import Link from 'next/link';
import Image from 'next/image';
import arrowLeft from '@/public/images/icons/ArrowLeft.svg';
import { getCachedCourses } from './cacheCourses';

const SubCategoryCourses = ({ category, onClose }: { category: Specialty; onClose: () => void }) => {
	const cachedCourses = getCachedCourses();
	const filteredCourses = cachedCourses?.filter((course: FetchCourseType) =>
		course.categories.some((c) => c.name === category.name),
	);

	return (
		<div>
			<button onClick={onClose}>
				<Image src={arrowLeft} alt='Back' width={10} height={10} />
				Volver
			</button>
			<h2>{category.name}</h2>
			<ul>
				{filteredCourses?.map((course: any) => (
					<li key={course.id}>
						<Link href={`/curso/${course.slug}`}>
							<div>
								<Image src={course.thumbnail.low} alt={course.title} width={100} height={100} />
								<h3>{course.title}</h3>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SubCategoryCourses;
