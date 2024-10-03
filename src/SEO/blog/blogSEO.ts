import { cookies } from 'next/headers';
import { SITE_URL } from '@/contains/constants';
import ssr from '@/services/ssr';

type Props = {
  params: { slug: string; lang: string };
};

export async function generateBlogMetadata({ params }: Props) {
  const currentCountry = params.lang || cookies().get('country')?.value;

  try {
    const [postMetadata] = await ssr.getSinglePost(
      params.slug,
      currentCountry as string,
    );
    const hostname = process.env.VERCEL_URL || '';
    const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');

    return {
      title: `${postMetadata.title} | MSK`,
      description: postMetadata.excerpt,
      alternates: IS_PROD
        ? {
            canonical: `${SITE_URL}/${currentCountry}/blog/${postMetadata.slug}`,
          }
        : undefined,
      robots: IS_PROD
        ? { index: true, follow: true }
        : { index: false, follow: false },
    };
  } catch (error: any) {
    throw new Error('Metadata fetch failed');
  }
}
