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
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');

	const metadata: { [key: string]: any } = {
		title: courseMetaData?.ficha.meta_titulo?.trim() || 'MSK - Cursos de medicina',
		description: courseMetaData?.ficha.meta_description?.replace(/<\/?[^>]+(>|$)/g, ''),
		alternates: IS_PROD
			? {
					canonical: `${SITE_URL}/${currentCountry}/curso/${params.slug}`,
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
