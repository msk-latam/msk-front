// import { IS_PROD } from '@/contains/constants';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const IS_PROD = false;
	return {
		rules: IS_PROD
			? [
					{
						userAgent: '*',
						allow: '/',
					},
					{
						userAgent: '*',
						disallow: '/wp/', // Bloqueo de  /wp/
					},
					{
						userAgent: '*',
						disallow: '/*?*utm_*', // Bloqueo de UTM (?)
					},
					{
						userAgent: '*',
						disallow: '/*&utm_*', // Bloqueo de UTM (&)
					},
					{
						userAgent: '*',
						disallow: '/dev/', // Bloqueo de /dev/
					},
					{
						userAgent: '*',
						disallow: '/*archivo*', // Bloqueo de "archivo"
					},
					{
						userAgent: '*',
						disallow: '/*page*', // Bloqueo de "page"
					},
			  ]
			: {
					userAgent: '*',
					disallow: ' ',
					// disallow: '/',
					allow: '/_next/static/',
			  },
		sitemap: IS_PROD ? 'https://msklatam.com/sitemap.xml' : 'https://msklatam.com/sitemap.xml',
	};
}
