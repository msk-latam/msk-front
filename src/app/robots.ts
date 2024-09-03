import { MetadataRoute } from 'next';

export default function robots(req: any): MetadataRoute.Robots {
  // Obtener el dominio desde la cabecera 'host' del request
  const host = req?.headers?.host || '';
  const IS_PROD = host.includes('.com');

  console.log(host, 'HOST');
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
