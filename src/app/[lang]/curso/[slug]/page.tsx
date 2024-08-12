import SingleProductDetail from '@/components/SingleProductDetail/SingleProductDetail';
import React, { FC } from 'react';
import ssr from '@/services/ssr';
import { IS_PROD, SITE_URL } from '@/contains/constants';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';

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

  /*  if (courseMetaData.total_price === "0" && courseMetaData.details?.['detail-1']?.value?.includes("Ebook gratuito")) {
    notFound();
  }  */

  return {
    title: `${courseMetaData?.ficha.title} | MSK`,
    description: courseMetaData?.excerpt,
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/curso/${params.slug}`,
        }
      : undefined,
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
    schemaJson: 'Course',
    schemaJsonData: courseMetaData,
  };
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
      <section className='text-neutral-600 text-sm md:text-base overflow-hidden'>
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
