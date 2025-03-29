'use client';
import { FC, ReactNode } from 'react';
import { stripHtmlTags } from '@/lib/pageHeadUtils';

interface ContainerSecondaryProps {
  contentAttribute: { texto_1: string; texto_2: string };
  children?: ReactNode | null;
}

const ContainerSecondary: FC<ContainerSecondaryProps> = ({
  contentAttribute,
  children = null,
}) => {
  // @ts-ignore
  return (
    <div className='bg-[#F3F4F6] mt-1 md:mt-8 md:px-32 md:py-12 md:pb-32 py-8  text-center rounded-[10px] md:rounded-[40px] mb-[96px]'>
      <h2 className='text-[20px] md:text-[36px] mx-2 my-3 raleway font-normal text-[#392C35] px-1'>
        {stripHtmlTags(contentAttribute.texto_1)}
      </h2>
      <p className='text-[14px] md:text-[20px] mx-2 text-violet-wash px-1'>
        {stripHtmlTags(contentAttribute.texto_2)}
      </p>
      {children}
    </div>
  );
};

export default ContainerSecondary;
