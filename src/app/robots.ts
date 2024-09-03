import { IS_PROD } from '@/contains/constants';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  console.log(IS_PROD);
  return {
    rules: IS_PROD
      ? {
          userAgent: '*',
          allow: '/',
        }
      : {
          userAgent: '*',
          disallow: '/',
        },
    sitemap: IS_PROD ? 'https://msklatam.com/sitemap.xml' : '',
  };
}
