import BlogSummary from '@/components/MSK/BlogSummary';
import { TABS_BLOG } from '@/data/MSK/blog';
import ssr from '@/services/ssr';
import React from 'react';

const BlogArchivo = async () => {
	const allPosts = await ssr.getPosts();
	return (
		<section id='archivo' className='py-8'>
			<h2 className='text-2xl font-bold mb-4'>Artículos</h2>
			<p>Encuentra aquí la información y los testimonios más importantes</p>

			<BlogSummary posts={allPosts} tabs={TABS_BLOG} className='py-16' desc='' heading='' showTitle forSingleNote={false} />
		</section>
	);
};

export default BlogArchivo;
