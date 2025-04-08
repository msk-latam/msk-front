import { MetadataRoute } from 'next';
import { getJSONTiendaByCountry } from './productsTienda';
import { getJSONPostByCountry } from './posts';
import { staticRoutes } from '@/SEO/sitemap/staticRoutes';
import { getBlogRoutes } from '@/SEO/sitemap/blogRoutes';
import { getCategoryRoutes } from '@/SEO/sitemap/categoryRoutes';
import { getProductRoutes } from '@/SEO/sitemap/productRoutes';
export const SUPPORTED_COUNTRIES = [
	// 'ar',
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
	// ar: 'es-AR',
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
	const productRoutes = await getProductRoutes(categorySlugs, country);

	return [...staticRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes];
}
