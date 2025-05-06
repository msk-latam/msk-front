import { Metadata } from 'next';
import { headers } from 'next/headers';

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

function getBaseUrlFromHost(host?: string): string {
	if (!host) return 'https://msklatam.com'; // Fallback por seguridad

	if (host.includes('.tech')) return 'https://msklatam.tech';
	if (host.includes('.com')) return 'https://msklatam.com';
	return 'https://msklatam.tech'; // Default
}

export async function getProductMetadata(lang: string, slug: string): Promise<Metadata> {
	const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}`, {
		cache: 'no-cache',
	});
	const course = await res.json();

	const host = headers().get('host') || '';
	const baseUrl = getBaseUrlFromHost(host);
	const isProd = baseUrl.includes('.com');

	const canonical = `${baseUrl}${lang === 'ar' ? '' : `/${lang}`}/curso//${slug}`;

	const hreflangs = Object.fromEntries(
		Object.keys(countries).map((code) => [`es-${code}`, `${baseUrl}${code === 'ar' ? '' : `/${code}`}/curso/${slug}`]),
	);

	return {
		title: `${course.title} | MSK - Cursos de medicina`,
		description: course.sections?.with_this_course ?? course.description ?? 'Curso de medicina disponible en MSK.',
		alternates: {
			canonical,
			languages: hreflangs, // siempre presentes, no condicional
		},
		robots: isProd ? 'index, follow' : 'noindex, nofollow',
	};
}
