import { SITE_URL } from '@/contains/constants';

export async function generateBasesPromocionalesMetadata({ params }: { params: { lang: string } }) {
	const hostname = process.env.VERCEL_URL || '';
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
	return {
		title: 'Bases promocionales | MSK',
		description: 'Consulta las bases promocionales de MSK para conocer todos los detalles de nuestras promociones.',
		alternates: IS_PROD
			? {
					canonical: `${SITE_URL}/curso/bases-promocionales`,
			  }
			: undefined,
		robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
	};
}
