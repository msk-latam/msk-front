import { NextResponse } from 'next/server';
import { sanitizeBlogPost, BlogPost, Category } from '@/modules/home/types';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const lang = url.searchParams.get('lang') || 'int';

	try {
		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
			next: { revalidate: 0 },
		});

		if (!res.ok) throw new Error('Error al obtener los datos del blog');

		const json = await res.json();
		const blogSection = json?.sections?.blog || {};

		const mapPosts = (posts: any[], isFeatured = false): BlogPost[] => {
			return posts.map((post: any, index: number) => {
				const categories: Category[] = Array.isArray(post.categories)
					? post.categories.map((cat: any) => ({
							id: cat.id || 0,
							name: cat.name || '',
							slug: cat.slug || '',
					  }))
					: [];

				let featuredImage = '/images/default-image.jpg';
				if (typeof post.featured_image === 'string') {
					featuredImage = post.featured_image.replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com');
				}

				const rawPost: BlogPost = {
					id: post.id || 0,
					title: post.title || '',
					subtitle: post.subtitle || '',
					author: post.author || '',
					date: post.date || '',
					readTime: post.readTime || post.time_to_read || null,
					tags: Array.isArray(post.tags) ? post.tags : [],
					featured_image: featuredImage,
					link: post.link || '',
					categories,
					featured: isFeatured && index === 0 ? '1' : '0',
				};

				console.log(`readTime recibido para "${rawPost.title}":`, rawPost.readTime); // ✅ LOG

				return sanitizeBlogPost(rawPost);
			});
		};

		const featured_blog_articles = mapPosts(blogSection.featured_blog_articles || [], true);
		const featured_blog_guides = mapPosts(blogSection.featured_blog_guides || []);
		const featured_blog_infographies = mapPosts(blogSection.featured_blog_infographies || []);

		return NextResponse.json({
			title: blogSection.title || '',
			subtitle: blogSection.subtitle || '',
			featured_blog_articles,
			featured_blog_guides,
			featured_blog_infographies,
		});
	} catch (error) {
		console.error('Error al obtener los datos del blog:', error);
		return NextResponse.json(
			{
				title: '',
				subtitle: '',
				featured_blog_articles: [],
				featured_blog_guides: [],
				featured_blog_infographies: [],
			},
			{ status: 500 },
		);
	}
}
