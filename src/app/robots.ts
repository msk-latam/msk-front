import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const hostname = process.env.VERCEL_URL || '';
  const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech'); // Considera producción solo si contiene 'msklatam' y no 'tech'.

  console.log(hostname, 'hostname');
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
