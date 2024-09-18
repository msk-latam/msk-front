'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { StaticImageData } from 'next/image';
import React, { FC, useEffect } from 'react';
import NcImage from '../NcImage/NcImage';
import { removeFirstTag } from '@/lib/removeFirstTag';
import { useRouter } from 'next/navigation';

export interface SectionHeroProps {
  className?: string;
  redirectUrl?: string;
  rightImg: string | StaticImageData;
  heading: string;
  subHeading?: string;
  btnText: string;
  btnOnClick?: () => void;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = '',
  redirectUrl = '',
  rightImg,
  heading,
  subHeading,
  btnText,
  btnOnClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (redirectUrl.length > 1) {
      router.push(redirectUrl);
    }

    typeof btnOnClick === 'function' && btnOnClick();
  };

  // useEffect(() => {
  //   // Verificar si el script ya está cargado
  //   if (!document.getElementById('EmbedSocialHashtagScript')) {
  //     const script = document.createElement('script');
  //     script.id = 'EmbedSocialHashtagScript';
  //     script.src = 'https://embedsocial.com/cdn/ht.js';
  //     script.async = true;
  //     document.head.appendChild(script);
  //   }
  // }, []);

  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id='SectionHero'
    >
      {/* <div
        className='embedsocial-hashtag'
        data-ref='d1d3da558a418ee93bb873db94bd5f1f3d1297ef'
      ></div> */}
      <div className='flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left'>
        <div className='w-screen max-w-full space-y-5 lg:space-y-7 flex-1'>
          <h1
            className='!leading-tight text-neutral-900 section-hero-title dark:text-neutral-100 font-bold text-[24px] sm:text-[42px]'
            dangerouslySetInnerHTML={{ __html: removeFirstTag(heading) }}
          />

          {subHeading ? (
            <span className='block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400'>
              {subHeading}
            </span>
          ) : null}
          {!!btnText && (
            <ButtonPrimary onClick={handleClick} className='rounded-lg'>
              {btnText}
            </ButtonPrimary>
          )}
        </div>
        <div className='hero-img flex justify-end'>
          {' '}
          <NcImage
            className='max-w-[725px] lg:max-w-[500px] xl:max-w-[725px] w-full'
            src={rightImg}
            alt='arrow next'
            width='1200'
            height='400'
          />
        </div>{' '}
      </div>
    </div>
  );
};

export default SectionHero;
