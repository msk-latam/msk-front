import BlogSummary from '@/components/MSK/BlogSummary';
import { TABS_BLOG } from '@/data/MSK/blog';
// import ssr from '@/services/ssr';
import React from 'react';
import { getJSONPostByCountry } from '../posts';

const BlogArchivo = async () => {
	// const allPosts = await ssr.getPosts();
	const allPosts = getJSONPostByCountry('ar');
	return (
		<section id='articulos' className='py-8'>
			<h2 className='!font-raleway text-3xl font-medium text-[#392C35] mb-1'>Artículos</h2>
			<p className='!font-inter text-[#6474A6] text-lg font-light'>
				Encuentra aquí la información y los testimonios más importantes
			</p>

			<BlogSummary
				posts={allPosts.posts}
				tabs={TABS_BLOG}
				className='py-12'
				desc=''
				heading=''
				showTitle
				forSingleNote={false}
			/>
		</section>
	);
};

export default BlogArchivo;
