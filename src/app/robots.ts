import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const IS_PROD = process.env.NODE_ENV === 'production';
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
