'use client';

import { supportedLanguages } from '@/config/languages';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type ActionVariant = 'primary' | 'secondary' | 'tertiary';

interface BlogAction {
	label: string;
	variant: ActionVariant;
}

interface BlogCardProps {
	title: string;
	subtitle?: string;
	author: { name: string; image?: string }[];
	authorImage?: string;
	date: string;
	readTime?: string | null;
	tags: string[];
	image?: string;
	action: BlogAction;
	featured?: boolean;
	link: string;
	bgColor?: string;
}

interface ArticleMetaProps {
	authors: { name: string; image?: string }[];
	date: string;
	readTime?: string | null;
}

const BlogCard: React.FC<BlogCardProps> = ({
	title,
	subtitle,
	author,
	authorImage,
	date,
	readTime,
	tags,
	image,
	action,
	featured = false,
	link,
	bgColor,
}) => {
	const cardStyle = bgColor ? { backgroundColor: bgColor } : undefined;
	const pathname = usePathname();
	const firstSegment = pathname?.split('/')[1];
	const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';
	console.log(`readTime recibido para "${title}":`, readTime);

	function localizeExternalBlogUrl(lang: string, url: string): string {
		try {
			const parsed = new URL(url);
			const path = parsed.pathname;
			return lang === 'ar' ? `${parsed.origin}${path}` : `${parsed.origin}/${lang}${path}`;
		} catch {
			return url;
		}
	}
	console.log(`[BlogCard] "${title}" readTime recibido:`, readTime);

	return (
		<div
			onClick={() => (window.location.href = localizeExternalBlogUrl(lang, link))}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					window.location.href = localizeExternalBlogUrl(lang, link);
				}
			}}
			className='group focus:outline-none h-full'
		>
			<article
				className='rounded-2xl overflow-hidden h-full shadow-sm border border-gray-100 bg-[#F7F7F8] flex flex-col transform transition-transform duration-300 group-hover:scale-105 cursor-pointer'
				style={cardStyle}
			>
				<div className='relative w-full h-[320px]'>
					<Image
						src={image || '/images/blog-placeholder.jpg'}
						alt={`Imagen destacada: ${title}`}
						fill
						className='object-cover'
					/>
				</div>

				<div className='p-4 md:p-5 flex flex-col flex-1 justify-between'>
					<div>
						<TagList tags={tags} />
						<h3 className='font-semibold font-raleway text-lg mt-2 mb-1 line-clamp-2'>{title}</h3>

						{subtitle && <p className='text-gray-600 font-inter text-base mb-3 line-clamp-2'>{subtitle}</p>}

						<ArticleMeta authors={author} date={date} readTime={readTime} />
					</div>

					<div className='flex flex-row items-center justify-between mt-4 gap-2'>
						<div className='flex items-center gap-4'>
							<button
								className='flex items-center gap-1 p-2 bg-white rounded-full text-xs text-gray-500 shadow hover:text-gray-700'
								aria-label='Guardar artículo'
								type='button'
								onClick={(e) => e.preventDefault()}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-4 h-4'
									aria-hidden='true'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
									/>
								</svg>
							</button>

							<div className='flex items-center pt-1 gap-1 text-xs text-gray-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-4 h-4'
									aria-hidden='true'
								>
									<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
								</svg>
								<span>{readTime && !isNaN(Number(readTime)) ? `${readTime} min de lectura` : 'NO ME TOMA LA INFO'}</span>
							</div>
						</div>
						<div className='flex justify-end'>
							<div
								className={`px-4 py-2 rounded-full text-sm font-medium shadow-md ${
									action.variant === 'secondary'
										? 'bg-black text-white hover:bg-gray-800'
										: action.variant === 'tertiary'
										? 'bg-black text-white hover:bg-gray-800'
										: 'bg-[#1A1A1A] text-white'
								}`}
							>
								{action.label}
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
};

const TagList: React.FC<{ tags: string[] }> = ({ tags }) => (
	<div className='flex flex-wrap gap-2' aria-label='Categorías'>
		{tags.slice(0, 2).map((tag, i) => {
			let bgColor = 'bg-purple-50';
			let textColor = 'text-purple-700';

			if (tag.toLowerCase().includes('medicina')) {
				bgColor = 'bg-[#DFE6FF]';
				textColor = 'text-[#6474A6]';
			} else if (tag.toLowerCase().includes('actualidad') || tag.toLowerCase().includes('infografía')) {
				bgColor = 'bg-[#FFF0DF]';
				textColor = 'text-[#A69164]';
			} else if (tag.toLowerCase().includes('guía')) {
				bgColor = 'bg-[#DFE6FF]';
				textColor = 'text-[#6474A6]';
			}

			return (
				<span key={i} className={`text-xs px-2 py-1 rounded-full ${bgColor} ${textColor}`}>
					{tag}
				</span>
			);
		})}
	</div>
);

const ArticleMeta: React.FC<ArticleMetaProps> = ({ authors, date, readTime }) => {
	const formatDate = (dateString: string) =>
		new Intl.DateTimeFormat('es-ES', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).format(new Date(dateString));

	const mainAuthor = authors[0];

	return (
		<div className='flex items-center gap-2 mt-4 text-xs text-gray-500'>
			{mainAuthor && (
				<>
					<div className='w-5 h-5 rounded-full overflow-hidden bg-gray-200'>
						<Image
							src={mainAuthor.image || '/images/blog/doctor-with-stetoscope.png'}
							alt={`Foto de ${mainAuthor.name}`}
							width={20}
							height={20}
						/>
					</div>
					<span className='flex items-center gap-1 font-semibold'>
						<span className='w-1.5 h-1.5 bg-[#6474A6] rounded-full'></span>
						{mainAuthor.name}
					</span>
					<span className='text-gray-400'>•</span>
				</>
			)}
			<time dateTime={date}>{formatDate(date)}</time>
		</div>
	);
};
export default BlogCard;
