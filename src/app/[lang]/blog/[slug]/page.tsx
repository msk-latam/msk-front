import React, { FC, useEffect, useState } from 'react';
import ssr from '@/services/ssr';
import SingleHeader from '@/components/MSK/Blog/Post/PostSingleHeader';
import NcImage from '@/components/NcImage/NcImage';
import SingleContent from '@/components/MSK/Blog/Post/SingleContent';
import { cookies } from 'next/headers';
import { IS_PROD, SITE_URL } from '@/contains/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Breadcrum from '@/components/Breadcrum/Breadcrum';
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

    return {
      title: `${postMetadata.title} | MSK`,
      description: postMetadata.excerpt,
      alternates: IS_PROD
        ? {
            canonical: `${SITE_URL}/${currentCountry}/blog/${postMetadata.slug}`,
          }
        : undefined,
      robots: IS_PROD
        ? {
            index: true,
            follow: true,
          }
        : undefined,
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

        {/* SINGLE MAIN CONTENT */}
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

        {/* RELATED POSTS */}
        {/* <SingleRelatedPosts /> */}
      </div>
    </>
  );
};

export default PageNota;
