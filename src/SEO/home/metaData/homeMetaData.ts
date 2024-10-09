import { SITE_URL } from '@/contains/constants';

export async function generateHomeMetadata({ params }: { params: { lang: string } }) {
	const hostname = process.env.VERCEL_URL || '';
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
	return {
		title: 'Cursos de medicina para expandir tus metas profesionales | MSK',
		description: 'Una propuesta moderna para expandir tus metas profesionales',
		alternates: IS_PROD
			? {
					canonical: `${SITE_URL}`,
			  }
			: undefined,
		robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
	};
}
