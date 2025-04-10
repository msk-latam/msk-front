import React, { FC } from 'react';
import NcImage from '@/components/NcImage/NcImage';
import { FetchCourseType, FetchPostType, UserCourse, UserCourseProgress } from '@/data/types';
import CardAuthor2 from '@/components/CardAuthor2/CardAuthor2';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import { compareByNameDescending } from '@/lib/compareByNameDescending';
import NcLink from '../NcLink/NcLink';
import { usePathname } from 'next/navigation';

export interface Card2Props {
	className?: string;
	post: FetchPostType | FetchCourseType | UserCourse | UserCourseProgress;
	size?: 'normal' | 'large';
	hideDesc?: boolean;
	redirectAccount?: boolean;
	hideAuthor?: boolean;
	badgeColor?: string;
	kind?: string;
	forSingleNote?: boolean;
}

const Card2: FC<Card2Props> = ({
	className = 'h-full',
	size = 'normal',
	post,
	redirectAccount,
	kind = 'curso',
	hideDesc,
	hideAuthor,
	forSingleNote,
}) => {
	const { title, image, slug, categories, father_post_type, excerpt, date, author, reading_time } = post;

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';

	const imageURL = image?.replace('mx.', '');
	// const url = redirectAccount ? `/mi-cuenta/cursos` : `/${kind}/${slug}`;
	const getFullUrl = (path: string) => {
		const domain = window.location.origin; // Obtiene el dominio actual (localhost, .com, .tech, etc.)
		return `${domain}${path.startsWith('/') ? path : `/${path}`}`;
	};

	const url = redirectAccount
		? country === ''
			? getFullUrl(`/mi-cuenta/cursos/`)
			: `/${country}/mi-cuenta/cursos/`
		: country === ''
		? getFullUrl(`/${kind}/${slug}/`)
		: `/${country}/${kind}/${slug}/`;
	const categoriesOrder = kind === 'blog' ? categories.sort(compareByNameDescending) : categories;

	return (
		<div
			className={`nc-Card2 group relative flex flex-col  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className} rounded-lg`}
			data-nc-id='Card2'
		>
			<span className='block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-lg overflow-hidden'>
				<NcImage
					containerClassName='absolute inset-0'
					src={imageURL || post.featured_image[0]}
					alt={title || ''}
					sizes='(max-width: 1280px) 100vw, 1536px'
					fill
				/>
			</span>
			<NcLink href={url} className='absolute inset-0' />
			<div className='flex flex-col p-4 sm:p-5'>
				<div className='space-y-3'>
					<CategoryBadgeList
						itemClass='relative'
						isCourse={father_post_type === 'course'}
						isPost={kind === 'blog'}
						categories={categoriesOrder}
					/>
					<h4
						className={`nc-card-title block font-medium text-neutral-900 dark:text-neutral-100 transition-colors h-4 sm:h-10 ${
							size === 'large' ? 'text-lg sm:text-2xl' : 'text-base'
						}`}
					>
						<NcLink href={url} className='block font-medium truncate line-clamp-2' colorClass=' text-black'>
							{title}
						</NcLink>
					</h4>
					<span className='block text-sm truncate text-neutral-500 dark:text-neutral-400 line-clamp-2'>{excerpt}</span>
				</div>
				{hideAuthor ? null : (
					<CardAuthor2
						className='relative my-4'
						date={date}
						author={author}
						readingTime={Number(reading_time)}
						forSingleNote={forSingleNote}
					/>
				)}
			</div>
		</div>
	);
};

export default Card2;
