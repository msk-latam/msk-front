import { Metadata } from 'next';

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

export async function getProductMetadata(lang: string, slug: string): Promise<Metadata> {
	const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}`, {
		cache: 'no-cache',
	});
	const course = await res.json();

	const baseUrl = IS_PROD ? 'https://msklatam.com' : SITE_URL;
	const canonical = `${baseUrl}${lang === 'ar' ? '' : `/${lang}`}/tienda/${slug}`;

	const hreflangs = Object.fromEntries(
		Object.keys(countries).map((code) => [
			`es-${code}`,
			`${baseUrl}${code === 'ar' ? '' : `/${code}`}/tienda/${slug}`,
		])
	);

	return {
		title: `${course.title} | MSK - Cursos de medicina`,
		description:
			course.sections?.with_this_course ??
			course.description ??
			'Curso de medicina disponible en MSK.',
		alternates: {
			canonical,
			languages: IS_PROD ? hreflangs : undefined,
		},
		robots: IS_PROD ? 'index, follow' : 'noindex, nofollow',
	};
}
