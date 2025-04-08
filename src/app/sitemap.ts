import { MetadataRoute } from 'next';
import { getJSONTiendaByCountry } from './productsTienda';
import { getJSONPostByCountry } from './posts';
import { staticRoutes } from '@/SEO/sitemap/staticRoutes';
import { getBlogRoutes } from '@/SEO/sitemap/blogRoutes';
import { getCategoryRoutes } from '@/SEO/sitemap/categoryRoutes';
export const SUPPORTED_COUNTRIES = [
	'bo',
	'cl',
	'co',
	'cr',
	'ec',
	'es',
	'gt',
	'hn',
	'mx',
	'ni',
	'pa',
	'pe',
	'py',
	'sv',
	'uy',
	've',
];

export const LANGUAGES_HREFLANG: Record<string, string> = {
	bo: 'es-BO',
	cl: 'es-CL',
	co: 'es-CO',
	cr: 'es-CR',
	ec: 'es-EC',
	es: 'es-ES',
	gt: 'es-GT',
	hn: 'es-HN',
	mx: 'es-MX',
	ni: 'es-NI',
	pa: 'es-PA',
	pe: 'es-PE',
	py: 'es-PY',
	sv: 'es-SV',
	uy: 'es-UY',
	ve: 'es-VE',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://msklatam.com';
	const country = 'ar';
	let categorySlugs: Set<string> = new Set();
	const blogRoutes = await getBlogRoutes();
	const categoryRoutes = getCategoryRoutes(categorySlugs);

	let productRoutes: MetadataRoute.Sitemap = [];
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

	return [...staticRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes];
}
