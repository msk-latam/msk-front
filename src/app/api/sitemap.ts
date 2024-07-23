import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Función para obtener rutas dinámicas desde una API (simulada aquí)
async function fetchDynamicRoutes(): Promise<string[]> {
  const response = await fetch('https://api.mysite.com/products');
  const products = await response.json();
  return products.map(
    (product: { slug: string }) => `/products/${product.slug}`,
  );
}

// Función para obtener rutas estáticas del sistema de archivos
const getStaticRoutes = (dir: string, basePath = ''): string[] => {
  const files = fs.readdirSync(dir);
  let routes: string[] = [];

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      routes = routes.concat(
        getStaticRoutes(fullPath, path.join(basePath, file)),
      );
    } else if (
      stat.isFile() &&
      ['.tsx', '.ts'].includes(path.extname(file)) &&
      file !== '_app.tsx' &&
      file !== '_document.tsx'
    ) {
      const route = path.join(
        basePath,
        path.basename(file, path.extname(file)),
      );
      routes.push(route === '/index' ? '' : route);
    }
  });

  return routes;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const baseUrl = 'https://msklatam.com';

  const pagesDir = path.join(process.cwd(), 'pages');
  const staticRoutes = getStaticRoutes(pagesDir);
  const dynamicRoutes = await fetchDynamicRoutes();
  const routes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          route => `
        <url>
          <loc>${baseUrl}${route}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
