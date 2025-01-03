import React, { FC } from 'react';
import PageArchiveComponent from '@/components/MSK/Archive/Page';
import { getAllPosts, setAllPosts } from '@/lib/allData';
import ssr from '@/services/ssr';
import { cookies } from 'next/headers';
import { Props } from '@/app/layout';
import { Metadata } from 'next';
import { SITE_URL } from '@/contains/constants';
// export const runtime = 'edge';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const currentCountry = params.lang || cookies().get('country')?.value;
	const hostname = process.env.VERCEL_URL || '';
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
	return {
		title: 'Archivo | MSK',
		description:
			'Revisa los artículos archivados de nuestro blog, así como las infografías, guías profesionales y otros recursos de interés que publicamos. ',
		alternates: IS_PROD
			? {
					canonical: `${SITE_URL}/${currentCountry}/blog/archivo`,
			  }
			: undefined,
		robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
	};
}

const PageArchive: FC<{ params: { lang: string } }> = async ({ params }) => {
	const currentCountry = params.lang || cookies().get('country')?.value;
	if (!getAllPosts() || !getAllPosts().length) {
		const fetchedPosts = await ssr.getPosts(currentCountry);
		setAllPosts(fetchedPosts);
	}
	const posts = getAllPosts();
	const filteredPosts = posts.filter((post) => {
		const rawDate = post.date; // e.g., "Octubre 1, 2023"

		// Mapa de meses en español a números
		const monthMapping = {
			Enero: '01',
			Febrero: '02',
			Marzo: '03',
			Abril: '04',
			Mayo: '05',
			Junio: '06',
			Julio: '07',
			Agosto: '08',
			Septiembre: '09',
			Octubre: '10',
			Noviembre: '11',
			Diciembre: '12',
		};

		// Convertir la fecha del post al formato estándar
		const [month, day, year] = rawDate.split(' ');
		const formattedDate = `${year}-${monthMapping[month]}-${day.replace(',', '')}`;
		const postDate = new Date(formattedDate);

		// Fecha límite (1 octubre 2023)
		const cutoffDate = new Date('2023-10-01');

		// Retornar posts posteriores o iguales a la fecha límite
		return postDate >= cutoffDate;
	});
	return <PageArchiveComponent posts={filteredPosts} />;
};

export default PageArchive;
