import SingleProductDetail from '@/components/SingleProductDetail/SingleProductDetail';
import React, { FC } from 'react';
import ssr from '@/services/ssr';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { generateCourseMetadata } from '@/SEO/curso/structuredData/cursoMetaData';
import { getJSONByCountry } from '@/app/products';

interface PageCourseProps {
	params: any;
}

type Props = {
	params: { slug: string; lang: string };
};

export async function generateMetadata({ params }: Props) {
	try {
		return await generateCourseMetadata({ params });
	} catch (error: any) {
		console.error('Error fetching course metadata:', error);
		notFound();
	}
}

const PageSingleProduct: FC<PageCourseProps> = async ({ params }) => {
	const { product } = await ssr.getSingleProduct(params.slug, params.lang);
	const JSONProduct = await getJSONByCountry(params.lang);
	const headersList = headers();
	const hostname = headersList.get('host');
	if (product?.total_price === '0' && hostname === 'msklatam.com' && product?.father_post_type === 'course') {
		notFound();
	}

	return (
		<div className={`nc-PageSubcription `} data-nc-id='PageSubcription'>
			<section className='text-neutral-600 text-sm md:text-base '>
				{product ? <SingleProductDetail product={product} country={params.country} /> : ''}
			</section>
		</div>
	);
};

export default PageSingleProduct;
