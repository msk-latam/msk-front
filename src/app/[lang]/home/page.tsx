import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getHomeMetadata } from '@/SEO/home/metaData/homeMetaData';
import HomeWithPopUp from '@/modules/home/HomeWithPopUp';

type Props = {
	params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const lang = params.lang ?? 'ar';

	const headersList = headers();
	const host = headersList.get('host') ?? '';

	const metadata = getHomeMetadata(lang, host);

	return {
		title: metadata.title,
		description: metadata.description,
		alternates: {
			canonical: metadata.canonical,
			languages: metadata.hreflangs,
		},
		robots: `${metadata.robots.index ? 'index' : 'noindex'}, ${metadata.robots.follow ? 'follow' : 'nofollow'}`,
	};
}

export default function HomePage({ params }: Props) {
	return <HomeWithPopUp lang={params.lang} />;
}
