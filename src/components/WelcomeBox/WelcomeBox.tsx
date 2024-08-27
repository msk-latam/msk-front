'use client';
import { FC } from 'react';
import Badge from '@/components/Badge/Badge';
import { WpContentData } from '@/data/types';
import { stripHtmlTags } from '@/lib/pageHeadUtils';

interface WelcomeBoxProps {
  content: WpContentData | null;
}

const WelcomeBox: FC<WelcomeBoxProps> = ({ content }) => {
  // @ts-ignore
  return (
    <div className='bg-[#F3F4F6]  py-16 md:px-32  md:mx-auto md:rounded-[40px] mb-8 relative  md:w-[120%] px-2  left-1/2 transform -translate-x-1/2 w-screen '>
      <Badge name={content?.sobre_mks.etiqueta} color='blue-home' />
      <h2 className='text-[20px] md:text-[32px] my-3 font-medium'>
        {stripHtmlTags(content?.sobre_mks.texto_1 as string)}
      </h2>
      <p className='text-[16px] md:text-[18px] text-violet-wash'>
        {stripHtmlTags(content?.sobre_mks.texto_2 as string)}
      </p>
    </div>
  );
};

export default WelcomeBox;
