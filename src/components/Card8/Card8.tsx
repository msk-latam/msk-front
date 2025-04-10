import React, { FC } from 'react';
import { FetchCourseType } from '@/data/types';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import NcLink from '../NcLink/NcLink';
import NcImage from '../NcImage/NcImage';
import { removeFirstSubdomain } from '@/utils/removeFirstSubdomain';
import Showing from '@/components/Showing/Showing';
import moduleIcon from '/public/images/icons/moduleIcon.svg';
import timeIcon from '/public/images/icons/timeIcon.svg';
import { usePathname } from 'next/navigation';

export interface Card8Props {
	className?: string;
	post: FetchCourseType;
	badgeColor?: string;
	kind: 'curso' | 'guia' | 'blog';
}

const Card8: FC<Card8Props> = ({ className = 'h-full', post, badgeColor = 'yellow', kind }) => {
	const { title, categories, id, slug, image } = post;
	const imageURL = removeFirstSubdomain(image);

	const filteredCategory = categories && categories.length > 0 ? [categories[0]] : [];

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';

	return (
		<div
			className={`nc-Card8 group relative [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden z-0 ${className} rounded-none`}
			data-nc-id='Card8'
		>
			<NcLink
				href={country === '' ? `${window.location.origin}/curso/${slug}/` : `/${country}/curso/${slug}/`}
				className='block w-full h-0 pt-[100%] sm:pt-[55%] overflow-hidden'
			>
				<NcImage containerClassName='absolute inset-0' src={imageURL} alt={title} width='100' height='100' />
				<span className='absolute inset-0 transition-opacity opacity-100 bg-gradient-to-b from-transparent to-black md:opacity-80 group-hover:opacity-100'></span>
			</NcLink>
			<NcLink
				href={country === '' ? `${window.location.origin}/curso/${slug}/` : `/${country}/curso/${slug}/`}
				className='absolute inset-x-0 bottom-0 opacity-50 h-1/2 bg-gradient-to-t from-black'
			></NcLink>
			<div className='absolute inset-x-0 bottom-0 flex flex-col p-4 sm:p-6'>
				<NcLink
					href={country === '' ? `${window.location.origin}/curso/${slug}/` : `/${country}/curso/${slug}/`}
					className='absolute inset-0'
				/>
				<CategoryBadgeList
					color={badgeColor}
					categories={filteredCategory}
					isCourse={kind === 'curso'}
					isPost={kind === 'blog'}
					isEbook={kind === 'guia'}
				/>
				<h2 className={`mt-3 mb-2 relative block font-semibold text-neutral-50 text-lg sm:text-2xl `}>
					<NcLink
						href={country === '' ? `${window.location.origin}/curso/${slug}/` : `/${country}/curso/${slug}/`}
						className='text-2xl font-bold line-clamp-3 font-raleway'
						colorClass='text-white hover:text-white'
					>
						{title}
					</NcLink>
				</h2>

				{post.cantidad_modulos && <Showing title={`${post.cantidad_modulos} temas`} icon={moduleIcon.src} />}
				{post.duration && <Showing title={`${post.duration} horas estimadas`} icon={timeIcon.src} />}

				{post.lista_de_cedentes ? (
					<div className='mt-2 sm:block'>
						<span className='text-sm text-neutral-300 line-clamp-1'>{post.lista_de_cedentes[0].post_title}</span>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Card8;
