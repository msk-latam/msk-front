import React, { FC, useContext } from 'react';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import { SinglePageType } from '@/data/types';
import { DataContext } from '@/context/data/DataContext';
import LoadingText from '../Loader/Text';
import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const {
    state: { allBestSellers },
  } = useContext(DataContext);

  return (
    <div className='nc-SingleContent space-y-10'>
      {/* ENTRY CONTENT */}

      {data?.content && (
        <div
          id='single-entry-content'
          className='prose lg:prose-lg !max-w-screen-lg mx-auto dark:prose-invert '
          dangerouslySetInnerHTML={{ __html: data.content as string }}
        />
      )}

      {!data && (
        <div className='flex flex-col gap-8 '>
          <LoadingText />
          <LoadingText />
          <LoadingText />
        </div>
      )}

      {data?.terminos &&
        data.terminos.map(t => (
          <div className=''>
            <h2 className='font-raleway text-2xl mb-7'>{t.titulo}</h2>
            <div dangerouslySetInnerHTML={{ __html: t.descripcion }} />
          </div>
        ))}

      {/* TAGS */}
      {/* <div className='max-w-[1700px] mx-auto'>
        <div className='relative py-16 mb-20'>
          <BackgroundSection />
          <SectionSliderBestSellers
            posts={allBestSellers}
            postCardName='card9'
            heading='Comienza tu experiencia aquí'
            subHeading='Estos son los cursos más elegidos entre profesionales de la salud'
            sliderStype='style2'
            uniqueSliderClass='pageHome-section6'
            className='mx-auto max-w-[85%]'
          />
        </div>
      </div> */}
      <div className='md:rounded-[40px] bg-neutral-100 dark:bg-black dark:bg-opacity-20 relative py-8 md:py-16 mb-[96px] md:w-[129%] left-1/2 transform -translate-x-1/2  w-screen '>
        <SectionSliderBestSellers
          posts={allBestSellers}
          // loading={loadingBestSellers}
          className='w-full section-slider-posts-container'
          postCardName='card9'
          heading='Comienza tu experiencia aquí'
          subHeading='Estos son los cursos más elegidos entre profesionales de la salud'
          sliderStype='style2'
          uniqueSliderClass='pageNewHome-section6'
        />
      </div>
    </div>
  );
};

export default SingleContent;
