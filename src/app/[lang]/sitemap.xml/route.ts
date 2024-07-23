import ssr from '@/services/ssr';
import { NextRequest, NextResponse } from 'next/server';

interface SitemapProps {
  path: string;
  changefreq: string;
  priority: number;
  lastmod?: Date;
}

const staticRoutes: SitemapProps[] = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/tienda/', changefreq: 'weekly', priority: 0.9 },
  { path: '/archivo/', changefreq: 'monthly', priority: 0.7 },
  { path: '/crear-cuenta/', changefreq: 'monthly', priority: 0.8 },
  { path: '/iniciar-sesion/', changefreq: 'monthly', priority: 0.8 },
  { path: '/politica-de-privacidad/', changefreq: 'yearly', priority: 0.6 },
  { path: '/terminos-y-condiciones/', changefreq: 'yearly', priority: 0.6 },
  { path: '/politica-de-cookies/', changefreq: 'yearly', priority: 0.6 },
  { path: '/mision/', changefreq: 'monthly', priority: 0.7 },
  { path: '/contacto/', changefreq: 'monthly', priority: 0.8 },
  { path: '/bases-promocionales/', changefreq: 'yearly', priority: 0.6 },
];

async function fetchProductRoutes(country: string): Promise<SitemapProps[]> {
  const products = await ssr.getStoreCourses(country);
  return products.map((product: { slug: string }) => ({
    path: `/curso/${product.slug}/`,
    changefreq: 'weekly',
    priority: 0.9,
  }));
}

async function fetchBlogRoutes(country: string): Promise<SitemapProps[]> {
  const posts = await ssr.getPosts(country);
  return posts.map((post: { slug: string }) => ({
    path: `/blog/${post.slug}/`,
    changefreq: 'daily',
    priority: 0.7,
  }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: { lang: string } },
) {
  return new NextResponse(null, { status: 204 });

  const url = new URL(request.url);
  const host = url.host;

  if (host !== 'msklatam.com') {
    return new NextResponse(null, { status: 204 }); // No Content
  }

  const lang = params.lang;
  const baseUrl = `https://msklatam.com/${lang}`;
  const routes = [
    ...staticRoutes,
    ...(await fetchProductRoutes(lang)),
    ...(await fetchBlogRoutes(lang)),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        ({ path, changefreq, priority, lastmod }) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${lastmod ?? new Date().toISOString()}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `,
      )
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
