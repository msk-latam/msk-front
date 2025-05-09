'use client';

import Link from 'next/link';
import { Course } from '@/types/course';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname } from 'next/navigation';
import { supportedLanguages } from '@/config/languages';

interface Props {
	course: Course;
	lang: string;
}

const StoreCourseCard = ({ course }: Props) => {
	const pathname = usePathname();
	const langSegment = pathname.split('/')[1];
	const lang = supportedLanguages.includes(langSegment) ? langSegment : 'ar';

	const courseUrl = `/${lang}/curso/${course.slug}`;

	return (
		<Link
			href={courseUrl}
			key={course.id}
			className='border rounded-[30px] bg-white flex flex-col hover:shadow-lg transition'
		>
			<img
				src={course.image || course.featured_images?.medium || '/images/default-course.jpg'}
				alt={course.title}
				className='w-full h-48 object-cover rounded-t-[30px]'
			/>
			<div className='p-4 flex flex-col h-full'>
				<div className='flex flex-wrap gap-1 mb-2 text-xs'>
					{course.categories?.slice(0, 2).map((cat) => (
						<span
							key={cat.term_id || cat.slug}
							className={`px-2 py-1 rounded-full ${
								cat.is_primary ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
							}`}
						>
							{cat.name}
						</span>
					))}
				</div>
				<h3 className='font-bold text-lg mb-1'>{course.title}</h3>

				<div className='flex justify-between items-center text-sm text-gray-500 mt-auto'>
					{course.duration && <span className='flex items-center gap-1'>⏳ {course.duration} horas</span>}
					<Link
						href={courseUrl}
						className='bg-[#191919] text-white px-4 py-2 rounded-full hover:bg-[#474b53] transition-colors'
						onClick={(e) => e.stopPropagation()} // Opcional: evita conflictos si el Link está anidado
					>
						Descubrir
					</Link>
				</div>
			</div>
		</Link>
	);
};

export default StoreCourseCard;
