import { generateCourseStructuredData } from '@/SEO/tienda/courseStructuredData';
import { getProductMetadata } from '@/SEO/tienda/getProductMetadata';
import ProductPageComponent from '@/modules/products/ProductPage';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
	return getProductMetadata(params.lang, params.slug);
}

export default async function ProductPage({ params }: { params: { lang: string; slug: string } }) {
	const lang = params.lang;
	const slug = params.slug;

	const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}?lang=${lang}`, {
		cache: 'no-cache',
	});

	const course = await res.json();
	const structuredData = generateCourseStructuredData(course);

	console.log(structuredData);

	return (
		<main className='bg-[#F3F4F6] text-neutral-900'>
			<ProductPageComponent course={course} lang={lang} />
			<Script
				type='application/ld+json'
				id='course-structured-data'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
		</main>
	);
}
