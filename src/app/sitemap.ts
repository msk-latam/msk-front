import { MetadataRoute } from 'next';
import { getJSONTiendaByCountry } from './productsTienda';
import { getJSONPostByCountry } from './posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://msklatam.com';
	const country = 'ar';

	const staticRoutes = [
		'/',
		'/bases-promocionales',
		'/contacto',
		'/nosotros',
		'/mision',
		'/politica-de-cookies',
		'/politica-de-privacidad',
		'/terminos-y-condiciones',
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString(),
	}));

	let productRoutes: MetadataRoute.Sitemap = [];
	let categorySlugs: Set<string> = new Set();
	try {
		const data = await getJSONTiendaByCountry(country);

		if (data?.products) {
			productRoutes = data.products.map((product: { slug: string; categories: { slug: string }[] }) => {
				product.categories?.forEach((category) => categorySlugs.add(category.slug));

				return {
					url: `${baseUrl}/curso/${product.slug}`,
					lastModified: new Date().toISOString(),
				};
			});
		}
	} catch (error) {
		console.error('Error al obtener los productos:', error);
	}

	let blogRoutes: MetadataRoute.Sitemap = [];
	try {
		const data = await getJSONPostByCountry(country);

		if (data?.posts) {
			const monthMapping: { [key: string]: string } = {
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

			blogRoutes = data.posts
				.filter((post: { date: string }) => {
					const rawDate = post.date;
					if (!rawDate) return false;

					const [month, day, year] = rawDate.split(' ');
					if (!day || !month || !year) return false;

					const formattedDate = `${year}-${monthMapping[month]}-${day.replace(',', '')}`;
					const postDate = new Date(formattedDate);

					return postDate >= cutoffDate;
				})
				.map((post: { slug: string }) => ({
					url: `${baseUrl}/blog/${post.slug}`,
					lastModified: new Date().toISOString(),
				}));
		}
	} catch (error) {
		console.error('Error al obtener los blogs:', error);
	}

	const categoryRoutes: MetadataRoute.Sitemap = Array.from(categorySlugs)
		.sort()
		.map((slug) => ({
			url: `${baseUrl}/tienda/${slug}/`,
			lastModified: new Date().toISOString(),
		}));

	return [...staticRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes];
}
