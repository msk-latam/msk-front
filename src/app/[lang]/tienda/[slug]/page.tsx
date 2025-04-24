import { generateCourseStructuredData } from '@/SEO/tienda/courseStructuredData';
import ProductPageComponent from '@/modules/products/ProductPage';
import { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const IS_PROD = SITE_URL.includes('msklatam.com') && !SITE_URL.includes('tech');

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

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
	const lang = params.lang || 'ar';
	const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${params.slug}`, {
		cache: 'no-cache',
	});
	const course = await res.json();

	const baseUrl = IS_PROD ? 'https://msklatam.com' : SITE_URL;
	const canonical = `${baseUrl}${lang === 'ar' ? '' : `/${lang}`}/tienda/${params.slug}`;

	const hreflangs = Object.fromEntries(
		Object.keys(countries).map((code) => [
			`es-${code}`,
			`${baseUrl}${code === 'ar' ? '' : `/${code}`}/tienda/${params.slug}`,
		]),
	);

	return {
		title: `${course.title} | MSK - Cursos de medicina`,
		description: course.description,
		alternates: {
			canonical,
			languages: IS_PROD ? hreflangs : undefined,
		},
		robots: `${IS_PROD ? 'index, follow' : 'noindex, nofollow'}`,
	};
}

export default async function ProductPage({ params }: { params: { lang: string; slug: string } }) {
	const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${params.slug}`, {
		cache: 'no-cache',
	});

	const course = await res.json();
	const structuredData = generateCourseStructuredData(course); // <-- ya no necesitás los p0, p1 vacíos

	return (
		<main className='bg-white text-neutral-900'>
			<ProductPageComponent course={course} />
			<Script
				type='application/ld+json'
				id='course-structured-data'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
		</main>
	);
}
