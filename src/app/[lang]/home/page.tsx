import type { Metadata } from 'next';
import { getHomeMetadata } from '@/SEO/home/metaData/homeMetaData';
import HomeWithPopUp from '@/modules/home/HomeWithPopUp';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang ?? 'ar';

  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' || 'msklatam.tech';

  // Solo es producción si el dominio es .com
  const isProd = baseURL.includes('msklatam.com');

  const metadata = getHomeMetadata(lang, isProd);

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: metadata.canonical,
      languages: metadata.hreflangs, // ✅ viene del helper
    },
    robots: `${metadata.robots.index ? 'index' : 'noindex'}, ${metadata.robots.follow ? 'follow' : 'nofollow'}`,
  };
}

export default function HomePage({ params }: Props) {
  return <HomeWithPopUp lang={params.lang} />;
}
