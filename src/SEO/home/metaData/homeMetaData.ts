// SEO/home/metaData/homeMetaData.ts

const siteUrl = 'https://msklatam.com';

const countries = {
  ar: 'Argentina',
  mx: 'México',
  cl: 'Chile',
  cr: 'Costa Rica',
  co: 'Colombia',
  pe: 'Perú',
  uy: 'Uruguay',
  py: 'Paraguay',
  bo: 'Bolivia',
  ec: 'Ecuador',
  ve: 'Venezuela',
  pa: 'Panamá',
  gt: 'Guatemala',
  hn: 'Honduras',
  sv: 'El Salvador',
  ni: 'Nicaragua',
  es: 'España',
};

export function getHomeMetadata(lang: string = 'ar', isProd = true) {
  const hreflangUrls = Object.fromEntries(
    Object.keys(countries).map((country) => [
      `es-${country}`,
      `${siteUrl}${country === 'ar' ? '/' : `/${country}/`}`
    ])
  );

  return {
    title: 'Cursos de medicina para expandir tus metas profesionales | MSK',
    description: 'Una propuesta moderna para expandir tus metas profesionales',
    canonical: hreflangUrls[`es-${lang}`] || siteUrl,
    hreflangs: hreflangUrls, // ✅ SIEMPRE presentes
    robots: isProd
      ? { index: true, follow: true }
      : { index: false, follow: false }, // ❌ solo index si es producción real
  };
}
