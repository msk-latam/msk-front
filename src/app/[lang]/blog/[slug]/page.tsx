import React, { FC } from 'react';
import ssr from '@/services/ssr';
import SingleContent from '@/components/MSK/Blog/Post/SingleContent';
import { cookies } from 'next/headers';
import { SITE_URL } from '@/contains/constants';
import { notFound } from 'next/navigation';

import BlogHeader from './BlogHeader';

interface PageCourseProps {
  params: any;
}
export const runtime = 'edge';

type Props = {
  params: { slug: string; lang: string };
};

export async function generateMetadata({ params }: Props) {
  const currentCountry = params.lang || cookies().get('country')?.value;
  try {
    const [postMetadata] = await ssr.getSinglePost(
      params.slug,
      currentCountry as string,
    );
    //console.log(postMetadata);
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
    notFound();
  }
}

const PageNota: FC<PageCourseProps> = async ({ params }) => {
  const currentCountry = params.lang ?? cookies().get('country')?.value;

  const [post] = await ssr.getSinglePost(params.slug, params.lang);
  const allBestSellers = await ssr.getBestSellers(currentCountry);
  const { fiveSpecialtiesGroup } = await ssr.fetchPostsSpecialities();
  const fuentes = post?.fuentes || [];

  return (
    <>
      <div
        className={`nc-PageSingleTemp3¸Sidebar`}
        data-nc-id='PageSingleTemp3Sidebar'
      >
        <BlogHeader post={post} />
        <div className=' flex flex-col col-span-12 w-full lg:flex-row note-container '>
          <div className='w-full  md:mt-0'>
            <SingleContent
              data={post}
              sources={fuentes}
              bestSellers={allBestSellers}
              fiveSpecialtiesGroup={fiveSpecialtiesGroup}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNota;
