'use client';
import React, { FC, ReactNode, useContext } from 'react';
import { PostDataType, TaxonomyType } from '@/data/types';
import { CountryContext } from '@/context/country/CountryContext';
import { CommentType } from '@/components/CommentCard/CommentCard';
import useCookiesTerms from '@/hooks/useCookieTerms';
import SingleHeader from '@/components/MSK/Privacy/SingleHeader';
import SingleContent from '@/components/MSK/Privacy/SingleContent';
import Image from 'next/image';
import InfoPageHeader from '@/components/InfoPageHeader/InfoPageHeader';

const SINGLE: SinglePageType = {
  id: 'eae0212192f63287e0c212',
  featuredImage: '/webp-images/misc/mission.webp',
  title: 'Política de cookies',
  desc: 'Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional.',
  date: 'May 20, 2021',
  href: '/single/this-is-single-slug',
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: 'Mimi',
    lastName: 'Fones',
    displayName: 'Fones Mimi',
    email: 'mfones9@canalblog.com',
    avatar: '',
    count: 38,
    href: '/author/the-demo-author-slug',
    desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
    jobName: 'Author Job',
  },
  articles: [],
  categories: [
    {
      id: 1,
      name: 'Garden',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      count: 13,
      color: 'pink',
      taxonomy: 'category',
    },
    {
      id: 2,
      name: 'Jewelry',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      count: 16,
      color: 'red',
      taxonomy: 'category',
    },
  ],
  postType: 'standard',
  tags: [],
  content: '',
  comments: [],
};

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface ThemesToSeeType {
  id?: string;
  title?: string;
  type?: string;
  content?: string;
  introduction?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  articles: { title: string | null; content: string }[];
  comments: CommentType[];
  excerpt?: string;
  contenido?: string;
  themes_to_se?: ThemesToSeeType[];
  authors?: any[];
}

const PageCookies: FC<PageSingleTemp3SidebarProps> = ({ className = '' }) => {
  const { countryState } = useContext(CountryContext);
  const { data, loading, error } = useCookiesTerms(countryState.country);

  return (
    <>
      <div
        className={`nc-PageSingleTemp3Sidebar  animate-fade-down ${className}`}
        data-nc-id='PageSingleTemp3Sidebar'
      >
        {/* <header className='relative  pt-16 z-10 md:py-20 lg:py-14  md:w-[141.5%] left-1/2 transform -translate-x-1/2  w-screen '>
          <div className='dark  relative z-10 ml-0 sm:ml-6 md:ml-12 lg:ml-24 max-w-screen-lg '>
            <div className='max-w-screen-md container'>
              <SingleHeader
                hiddenDesc
                metaActionStyle='style2'
                pageData={SINGLE}
              />
            </div>
          </div>

          <div className=''>
            <div className=' block absolute top-0 left-0 bottom-0 from-neutral-900 dark:from-black bg-gradient-to-r w-screen'></div>
            <img
              className='absolute top-0 left-1/2 transform -translate-x-1/2 w-screen md:w-[98.7vw] h-full object-cover '
              style={{ maxWidth: '100vw' }}
              src='/images/misc/quienes-somos.jpg'
              alt=''
            />
          </div>
        </header> */}
        <InfoPageHeader pageData={SINGLE} />

        {/* SINGLE MAIN CONTENT */}
        <div className=' flex flex-col my-10 lg:flex-row container'>
          <div className='w-full px-4 sm:px-6 lg:px-8'>
            <SingleContent data={data as SinglePageType} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCookies;
