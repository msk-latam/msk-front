import type { Metadata } from 'next';
import { getHomeMetadata } from '@/SEO/home/metaData/homeMetaData';
import HomeWithPopUp from '@/modules/home/HomeWithPopUp';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang ?? 'ar';

  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Evalúa si es un entorno productivo (no incluye "localhost" ni "tech")
  const isProd =
    baseURL.includes('msklatam.com') &&
    !baseURL.includes('localhost') &&
    !baseURL.includes('tech');

  const meta = getHomeMetadata(lang, isProd);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: meta.hreflangs,
    },
    robots: `${meta.robots.index ? 'index' : 'noindex'}, ${meta.robots.follow ? 'follow' : 'nofollow'}`,
  };
}

export default function HomePage({ params }: Props) {
  return <HomeWithPopUp lang={params.lang} />;
}
