import { SITE_URL } from '@/contains/constants';
import { cookies } from 'next/headers';

export async function generateHomeMetadata({ params }: { params: { lang: string } }) {
	const hostname = process.env.VERCEL_URL || '';
	const currentCountry = params.lang || cookies().get('country')?.value;
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
	// const IS_PROD = true;
	// const siteUrl = 'http://localhost:3000';
	// const siteUrl = 'https://masklatam.tech'
	const siteUrl = 'https://msklatam.com';
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
		Object.keys(countries).map((country) => [`es-${country}`, `${siteUrl}${country === 'ar' ? '/' : `/${country}/`}`]),
	);
	return {
		title: 'Cursos de medicina para expandir tus metas profesionales | MSK',
		description: 'Una propuesta moderna para expandir tus metas profesionales',
		alternates: IS_PROD
			? {
					canonical: hreflangUrls[`es-${currentCountry === undefined ? 'ar' : currentCountry}`],
					languages: hreflangUrls,
			  }
			: undefined,
		robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
	};
}
