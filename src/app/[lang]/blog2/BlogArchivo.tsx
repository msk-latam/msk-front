import BlogSummary from '@/components/MSK/BlogSummary';
import { TABS_BLOG } from '@/data/MSK/blog';
import ssr from '@/services/ssr';
import React from 'react';

const BlogArchivo = async () => {
	const allPosts = await ssr.getPosts();
	return (
		<section id='archivo' className='py-8'>
			<h2 className='!font-raleway text-4xl font-medium text-[#392C35]'>Artículos</h2>
			<p className='!font-inter text-[#6474A6] text-xl font-light'>
				Encuentra aquí la información y los testimonios más importantes
			</p>

			<BlogSummary posts={allPosts} tabs={TABS_BLOG} className='py-12' desc='' heading='' showTitle forSingleNote={false} />
		</section>
	);
};

export default BlogArchivo;
