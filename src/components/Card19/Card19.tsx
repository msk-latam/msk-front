import React, { FC } from 'react';
import NcImage from '@/components/NcImage/NcImage';
import { FetchPostType } from '@/data/types';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import { compareByNameDescending } from '@/lib/compareByNameDescending';
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Card19Props {
	className?: string;
	ratio?: string;
	titleClass?: string;
	post: FetchPostType;
	hoverClass?: string;
	showCategories?: boolean;
	kind?: string;
	badgeColor?: string;
}

const Card19: FC<Card19Props> = ({
	className = 'h-full',
	titleClass = 'text-xl sm:text-2xl xl:text-4xl',
	ratio = 'aspect-w-4 sm:aspect-w-3 aspect-h-3',
	kind = 'blog',
	post,
	hoverClass = '',
	showCategories = true,
	badgeColor,
}) => {
	const { slug, title, image, categories, link } = post;

	const renderMeta = () => {
		return (
			<div className='inline-flex items-center text-xs text-neutral-300'>
				<h2 className={`block  font-semibold text-white ${titleClass}`}>{title}</h2>
			</div>
		);
	};

	const categoriesOrder = kind === 'blog' ? categories.sort(compareByNameDescending) : categories;

	return (
		<div
			className={`nc-Card19 relative flex flex-col group rounded-xl overflow-hidden ${hoverClass} ${className}`}
			data-nc-id='Card19'
		>
			{/* <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
        <PostCardLikeAndComment className="relative" postData={post} />
        <PostCardSaveAction className="relative" postData={post} />
      </div> */}
			<div className={`flex items-start relative w-full ${ratio}`}></div>(
			<Link href={`/${kind}/${slug}`}>
				<NcImage
					containerClassName='absolute inset-0 rounded-xl'
					className='object-cover w-full h-full rounded-xl'
					alt={title}
					src={(image as string | StaticImport) || post.featured_image[0]}
					width='400'
					height='400'
				/>
				{/* <PostTypeFeaturedIcon
          className="absolute top-3 left-3 group-hover:hidden"
          postType={postType}
          wrapSize="w-7 h-7"
          iconSize="w-4 h-4"
        /> */}
				<span className='absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity'></span>
			</Link>
			)
			<Link
				href={`/${kind}/${slug}`}
				className='absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-80'
			></Link>
			<div className='absolute bottom-0 inset-x-0 p-5 sm:p-10 flex flex-col flex-grow'>
				<Link href={`/${kind}/${slug}`} className='absolute inset-0'></Link>
				{showCategories && (
					<div className='mb-3'>
						<CategoryBadgeList categories={categoriesOrder} color={badgeColor} isPost={kind === 'blog'} />
					</div>
				)}
				{renderMeta()}
			</div>
		</div>
	);
};

export default Card19;
