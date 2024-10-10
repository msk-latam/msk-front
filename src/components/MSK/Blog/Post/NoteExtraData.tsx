import { CustomLink } from '@/data/types';
import Link from 'next/link';
import React from 'react';

interface NoteExtraDataProps {
	excerpt?: string;
	featured_text?: string;
	suggest_content?: {
		description: string;
		link: {
			title: string;
			url: string;
		};
	};
}

const Excerpt: React.FC<NoteExtraDataProps> = ({ excerpt, featured_text, suggest_content }) => {
	const showSuggestContent = suggest_content?.description && suggest_content.description != '';

	return (
		<>
			{excerpt && (
				<div className='excerpt-container'>
					<div className='excerpt-divider' />
					<div className='font-lora'>{excerpt}</div>
				</div>
			)}
			{featured_text &&
				featured_text
					.replace(/<[^>]*>/g, '')
					.replace(/&nbsp;/g, '')
					.trim() && (
					<div className='featured-text-container'>
						<img src='/webp-images/vectors/megaphone.webp' alt='featured-text' />
						<div dangerouslySetInnerHTML={{ __html: featured_text }} />
					</div>
				)}
			{showSuggestContent && (
				<div className='my-10'>
					<div
						dangerouslySetInnerHTML={{
							__html: suggest_content?.description as string,
						}}
						className='mb-7 font-lora text-slate-500 text-xl'
					/>
					<Link
						target='_blank'
						rel='noopener noreferrer'
						href={suggest_content?.link.url as string}
						className='nc-Button  transition-colors rounded text-sm sm:text-base px-4 py-2 sm:px-5  ttnc-ButtonPrimary bg-primary-6000 text-neutral-50 hover:bg-red-500 hover:text-neutral-50 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 no-underline'
					>
						{suggest_content?.link.title || 'Quiero saber más'}
					</Link>
				</div>
			)}
		</>
	);
};

export default Excerpt;
