// src/SEO/courseMetaData.ts

import { cookies } from 'next/headers';
import { SITE_URL } from '@/contains/constants';
import ssr from '@/services/ssr';
import schemaMap from './schemaMap';

type Props = {
	params: { slug: string; lang: string };
};

export async function generateCourseMetadata({ params }: Props) {
	const { product: courseMetaData } = await ssr.getSingleProduct(params.slug, params.lang);
	const currentCountry = params.lang || cookies().get('country')?.value;

	const hostname = process.env.VERCEL_URL || '';
	// const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
	const IS_PROD = true;

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
		do: 'República Dominicana',
		gt: 'Guatemala',
		hn: 'Honduras',
		sv: 'El Salvador',
		ni: 'Nicaragua',
		cu: 'Cuba',
		pr: 'Puerto Rico',
		es: 'España',
	};

	const hreflangUrls = Object.fromEntries(
		Object.keys(countries).map((country) => [
			`es-${country}`,
			`${siteUrl}${country === 'ar' ? '' : `/${country}`}/curso/${params.slug}/`,
		]),
	);

	const metadata: { [key: string]: any } = {
		title: courseMetaData?.ficha.meta_titulo?.trim() || 'MSK - Cursos de medicina',
		description: courseMetaData?.ficha.meta_description?.replace(/<\/?[^>]+(>|$)/g, ''),
		alternates: IS_PROD
			? {
					// canonical: `${SITE_URL}/${currentCountry}/curso/${params.slug}`,
					canonical: hreflangUrls['es-ar'], // Define cuál es la versión principal (puedes cambiarla si es otra)
					languages: hreflangUrls,
			  }
			: undefined,
		robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
		schemaJson: 'Course',
		schemaJsonData: courseMetaData,
	};

	// Verificar si hay un schema específico para este curso en schemaMap
	if (schemaMap[params.slug]) {
		metadata.schemaJson = 'Product';
		metadata.schemaJsonData = schemaMap[params.slug];
	}

	return metadata;
}
