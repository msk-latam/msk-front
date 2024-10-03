import SingleProductDetail from '@/components/SingleProductDetail/SingleProductDetail';
import React, { FC } from 'react';
import ssr from '@/services/ssr';
import { SITE_URL } from '@/contains/constants';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';

import schemaMap from '@/SEO/curso/schemaMap';

interface PageCourseProps {
  params: any;
}
export const runtime = 'edge';

type Props = {
  params: { slug: string; lang: string };
};
export async function generateMetadata({ params }: Props) {
  const { product: courseMetaData } = await ssr.getSingleProduct(
    params.slug,
    params.lang,
  );
  const currentCountry = params.lang || cookies().get('country')?.value;

  const hostname = process.env.VERCEL_URL || '';
  const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');

  const metadata: { [key: string]: any } = {
    title: `${courseMetaData?.ficha.title} | MSK - Cursos de medicina.`,
    description: courseMetaData?.excerpt,
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/curso/${params.slug}`,
        }
      : undefined,
    robots: IS_PROD
      ? { index: true, follow: true }
      : { index: false, follow: false },
    schemaJson: 'Course',
    schemaJsonData: courseMetaData,
  };
  console.log(courseMetaData.excerpt);
  // Verificar si hay un schema específico para este curso en schemaMap
  if (schemaMap[params.slug]) {
    metadata.schemaJson = 'Product';
    metadata.schemaJsonData = schemaMap[params.slug];
  }

  return metadata;
}

const PageSingleProduct: FC<PageCourseProps> = async ({ params }) => {
  const { product } = await ssr.getSingleProduct(params.slug, params.lang);
  const headersList = headers();
  const hostname = headersList.get('host');
  if (
    product?.total_price === '0' &&
    hostname === 'msklatam.com' &&
    product?.father_post_type === 'course'
  ) {
    notFound();
  }

  return (
    <div className={`nc-PageSubcription `} data-nc-id='PageSubcription'>
      <section className='text-neutral-600 text-sm md:text-base '>
        {product ? (
          <SingleProductDetail product={product} country={params.country} />
        ) : (
          ''
        )}
      </section>
    </div>
  );
};

export default PageSingleProduct;
