import { MetadataRoute } from 'next';

const baseUrl = 'https://msklatam.com';

export function getCategoryRoutes(categorySlugs: Set<string>): MetadataRoute.Sitemap {
	return Array.from(categorySlugs)
		.sort()
		.map((slug) => ({
			url: `${baseUrl}/tienda/${slug}/`,
			lastModified: new Date(),
		}));
}
