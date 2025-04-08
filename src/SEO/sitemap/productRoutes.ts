// src/SEO/sitemap/productRoutes.ts
import { MetadataRoute } from 'next';
import { getJSONTiendaByCountry } from '@/app/productsTienda';
import { LANGUAGES_HREFLANG, SUPPORTED_COUNTRIES } from '@/app/sitemap';
const baseUrl = 'https://msklatam.com';

export async function getProductRoutes(categorySlugs: Set<string>, country: string): Promise<MetadataRoute.Sitemap> {
	let productRoutes: MetadataRoute.Sitemap = [];

	try {
		const data = await getJSONTiendaByCountry(country);

		if (data?.products) {
			productRoutes = data.products.map((product: { slug: string; categories: { slug: string }[] }) => {
				product.categories?.forEach((category) => categorySlugs.add(category.slug));
				const currentUrl = `${baseUrl}/${country}/curso/${product.slug}`;

				const alternates = {
					languages: Object.fromEntries(
						SUPPORTED_COUNTRIES.map((countryCode) => {
							const langCode = LANGUAGES_HREFLANG[countryCode] || countryCode;
							return [langCode, `${baseUrl}/${countryCode}/curso/${product.slug}`];
						}),
					),
				};

				return {
					url: `${baseUrl}/curso/${product.slug}`,
					lastModified: new Date(),
					alternates,
				};
			});
		}
	} catch (error) {
		console.error('Error al obtener los productos:', error);
	}

	return productRoutes;
}
