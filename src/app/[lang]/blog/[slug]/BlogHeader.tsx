'use client';
import Breadcrum from '@/components/Breadcrum/Breadcrum';
import SingleHeader from '@/components/MSK/Blog/Post/PostSingleHeader';
import NcImage from '@/components/NcImage/NcImage';
import { useEffect, useState } from 'react';

const BlogHeader = ({ post }: any) => {
  const [headerHeight, setHeaderHeight] = useState(700); // Altura predeterminada

  useEffect(() => {
    // Asegúrate de que esto solo se ejecute en el cliente
    if (typeof window !== 'undefined') {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.clientHeight - 90);
      }
    }
  }, [post]); // Se recalcula cuando cambie `post`

  return (
    <header className='relative pt-10 z-10 md:py-20 lg:py-14 dark:bg-black background-note-blog animate-fade-down'>
      {/* SINGLE HEADER */}
      <div
        className='note-header-background'
        style={{ height: `${headerHeight}px` }}
      />
      <div className='dark relative z-10'>
        <div className={''}>
          <Breadcrum onBlog={post} />
          <SingleHeader
            hiddenDesc={false}
            metaActionStyle='style2'
            pageData={post}
            className={''}
            excerptClassName={'color-light-white-text'}
          />
        </div>
      </div>
      {/* FEATURED IMAGE */}
      <div className=''>
        {post.featured_image?.length > 0 && (
          <div className='w-full rounded-lg md:rounded-[40px] relative overflow-hidden top-8 header-image-container'>
            <NcImage
              containerClassName='absolute inset-0'
              src={post.featured_image[0]}
              alt={post.title}
              className='object-cover w-full h-full'
              height={500}
              width={1080}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default BlogHeader;
