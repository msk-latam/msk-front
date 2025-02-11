import { cookies } from 'next/headers';
import { SITE_URL } from '@/contains/constants';
import ssr from '@/services/ssr';

type Props = {
	params: { slug: string; lang: string };
};

export async function generateBlogMetadata({ params }: Props) {
	const currentCountry = params.lang || cookies().get('country')?.value;

	try {
		const [postMetadata] = await ssr.getSinglePost(params.slug, currentCountry as string);
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
				`${siteUrl}${country === 'ar' ? '' : `/${country}`}/blog/${params.slug}/`,
			]),
		);

		return {
			title: `${postMetadata.title} | MSK`,
			description: postMetadata.excerpt,
			alternates: IS_PROD
				? {
						// canonical: `${SITE_URL}/${currentCountry}/blog/${postMetadata.slug}`,
						canonical: hreflangUrls['es-ar'],
						languages: hreflangUrls,
				  }
				: undefined,
			robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
		};
	} catch (error: any) {
		throw new Error('Metadata fetch failed');
	}
}
