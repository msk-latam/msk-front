import { getJSONPostByCountry } from '@/app/posts';
import { MetadataRoute } from 'next';

const baseUrl = 'https://msklatam.com';
const defaultCountry = 'ar';

export async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
	const blogRoutes: MetadataRoute.Sitemap = [];

	try {
		const data = await getJSONPostByCountry(defaultCountry);

		if (data?.posts) {
			const monthMapping: Record<string, string> = {
				Enero: '01',
				Febrero: '02',
				Marzo: '03',
				Abril: '04',
				Mayo: '05',
				Junio: '06',
				Julio: '07',
				Agosto: '08',
				Septiembre: '09',
				Octubre: '10',
				Noviembre: '11',
				Diciembre: '12',
			};

			const cutoffDate = new Date('2023-10-01');

			const validPosts = data.posts.filter((post: { date: string }) => {
				const rawDate = post.date;
				if (!rawDate) return false;

				const [month, day, year] = rawDate.split(' ');
				if (!day || !month || !year) return false;

				const formattedDate = `${year}-${monthMapping[month]}-${day.replace(',', '')}`;
				const postDate = new Date(formattedDate);

				return postDate >= cutoffDate;
			});

			for (const post of validPosts) {
				blogRoutes.push({
					url: `${baseUrl}/blog/${post.slug}`,
					lastModified: new Date(),
				});
			}
		}
	} catch (error) {
		console.error('Error al obtener los blogs:', error);
	}

	return blogRoutes;
}
