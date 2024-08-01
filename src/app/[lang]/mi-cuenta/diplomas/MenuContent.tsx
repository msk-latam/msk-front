import { CSSProperties, forwardRef, useEffect, useState } from 'react';
import ver from '@/public/images/icons/ver.svg';
import linkedin from '@/public/images/icons/linkedin.svg';
import descargar from '@/public/images/icons/descargar.svg';
import Image from 'next/image';
import { FetchCourseType } from '@/data/types';
import ModalDescarga from '../ModalDescarga';

interface MenuContentProps {
  style: React.CSSProperties;
  closeMenu: () => void;
  course: FetchCourseType;
  user: any;
  badgeType: 'Diploma' | 'Certificación';
}

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ style, closeMenu, course, user, badgeType }, ref) => {
    const courseProgress = user.contact.courses_progress.find(
      (progress: any) => progress.Product_Code === course.product_code,
    );

    const getBadgeUrl = () => {
      return badgeType === 'Diploma'
        ? courseProgress?.Diploma
        : badgeType === 'Certificación'
        ? courseProgress?.Certificado
        : '';
    };

    const handleClickLinkedin = () => {
      const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        window.location.href,
      )}&title=${encodeURIComponent(course.title)}&summary=${encodeURIComponent(
        'Check out this course!',
      )}&source=${encodeURIComponent('YourWebsite')}`;
      window.open(url, '_blank');
      closeMenu();
    };

    const handleClickVer = () => {
      const badgeUrl = getBadgeUrl();
      if (badgeUrl) {
        window.open(badgeUrl, '_blank');
      }
      closeMenu();
    };

    const handleClickDownload = async () => {
      const diplomaUrl = courseProgress?.Diploma;
      if (diplomaUrl) {
        try {
          const response = await fetch(diplomaUrl, { mode: 'no-cors' });
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${badgeType}_${course.title.replace(
            /[^a-z0-9]/gi,
            '_',
          )}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading the image:', error);
        }
      }
      closeMenu();
    };

    return (
      <div
        ref={ref}
        style={style}
        className='bg-white border rounded-2xl shadow-md z-[99] absolute'
      >
        <ul>
          <li className='flex items-center px-4 py-2 text-[#6474A6] hover:text-[#FF5D5E] rounded-t-2xl cursor-pointer'>
            <button
              className='flex items-center w-full text-left'
              onClick={event => {
                event.stopPropagation();
                handleClickVer();
              }}
            >
              <Image
                src={ver}
                height={16}
                width={16}
                alt='Ver'
                className='mr-2'
              />
              Ver
            </button>
          </li>
          <li className='flex items-center px-4 py-2 text-[#6474A6] hover:text-[#FF5D5E] cursor-pointer'>
            <button
              className='flex items-center w-full text-left'
              onClick={event => {
                event.stopPropagation();
                handleClickDownload();
              }}
            >
              <Image
                src={descargar}
                height={16}
                width={16}
                alt='Descargar'
                className='mr-2'
              />
              Descargar
            </button>
          </li>
          <li className='flex items-center px-4 py-2 text-[#6474A6] hover:text-[#FF5D5E] rounded-b-2xl cursor-pointer'>
            <button
              className='flex items-center w-full text-left'
              onClick={event => {
                event.stopPropagation();
                handleClickLinkedin();
              }}
            >
              <Image
                src={linkedin}
                height={16}
                width={16}
                alt='Compartir en LinkedIn'
                className='mr-2'
              />
              Compartir en LinkedIn
            </button>
          </li>
        </ul>
      </div>
    );
  },
);

export default MenuContent;
