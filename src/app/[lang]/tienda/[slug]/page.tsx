import { generateCourseStructuredData } from '@/SEO/tienda/courseStructuredData';
import { getProductMetadata } from '@/SEO/tienda/getProductMetadata';
import ProductPageComponent from '@/modules/products/ProductPage';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  return getProductMetadata(params.lang, params.slug);
}

export default async function ProductPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${params.slug}`, {
    cache: 'no-cache',
  });

  const course = await res.json();
  const structuredData = generateCourseStructuredData(course);

  return (
    <main className="bg-white text-neutral-900">
      <ProductPageComponent course={course} />
      <Script
        type="application/ld+json"
        id="course-structured-data"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
