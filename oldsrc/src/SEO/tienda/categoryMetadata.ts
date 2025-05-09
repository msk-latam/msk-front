import { Metadata } from 'next';
import { cookies } from 'next/headers';

interface GenerateCategoryMetadataProps {
	category: string;
	lang: string;
}

export function generateCategoryMetadata({ category, lang }: GenerateCategoryMetadataProps): Metadata {
	const currentCountry = lang || cookies().get('country')?.value;
	const hostname = process.env.VERCEL_URL || 'localhost';
	const IS_TECH = hostname.includes('.tech');

	const siteUrl = IS_TECH ? 'https://masklatam.tech' : 'https://msklatam.com';
	const canonicalUrl = `${siteUrl}${lang === 'ar' ? '' : `/${lang}`}/tienda/${category}/`;

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

	const hreflangUrls = Object.fromEntries(
		Object.keys(countries).map((country) => [
			`es-${country}`,
			`${siteUrl}${country === 'ar' ? '' : `/${country}`}/tienda/${category}/`,
		]),
	);

	const slugs = [
		/* ... */
	];
	const titles = [
		/* ... */
	];
	const descriptions = {
		/* ... */
	};

	const categoryTitlesMap = slugs.reduce((acc, slug, index) => {
		acc[slug] = titles[index];
		return acc;
	}, {} as Record<string, string>);

	const title = `Cursos de ${categoryTitlesMap[category] || category} | MSK`;
	const description =
		descriptions[category] ||
		'Descubre nuestro catálogo de cursos, entradas de blog y guías profesionales diseñados para impulsarte en tu carrera y profundizar en tus conocimientos.';

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: hreflangUrls,
		},
		robots: IS_TECH ? { index: false, follow: false } : { index: true, follow: true },
	};
}
