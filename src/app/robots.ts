import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const IS_PROD = process.env.PROD || process.env.NODE_ENV === 'production';
  console.log(process.env.PROD, 'PROD');
  console.log(process.env.NODE_ENV, 'NODE_ENV');
  console.log(IS_PROD, 'IS_PROD');
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
