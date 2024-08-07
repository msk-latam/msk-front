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
    const badgeUrl = getBadgeUrl();

    const handleClickLinkedin = () => {
      const title = encodeURIComponent(course.title);
      const summary = encodeURIComponent('Check out this course!');
      const source = encodeURIComponent('YourWebsite');

      const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        badgeUrl,
      )}&title=${title}&summary=${summary}&source=${source}`;

      window.open(linkedinShareUrl, '_blank');
      closeMenu();
    };

    const handleClickVer = () => {
      if (badgeUrl) {
        const fileExtension = badgeUrl.split('.').pop().toLowerCase();
        const popupWindow = window.open(
          '',
          '_blank',
          'width=800,height=600,scrollbars=no,resizable=no',
        );
        document.body.classList.add('blur-sm', 'pointer-events-none');

        const removeBlur = () => {
          document.body.classList.remove('blur-sm', 'pointer-events-none');
        };
        const closePopupOnClickOutside = (event: any) => {
          if (
            popupWindow &&
            !popupWindow.closed &&
            event.target !== popupWindow
          ) {
            popupWindow.close();
          }
        };

        document.addEventListener('click', closePopupOnClickOutside);

        const cleanUp = () => {
          removeBlur();
          document.removeEventListener('click', closePopupOnClickOutside);
        };

        try {
          if (fileExtension === 'pdf') {
            if (popupWindow) {
              const encodedUrl = encodeURIComponent(badgeUrl);
              const viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
              popupWindow.document.write(`
                <html>
                  <head>
                    <title>Vista de PDF</title>
                  </head>
                  <body>
                    <iframe src="${viewerUrl}" style="width:100%; height:100%;" frameborder="0"></iframe>
                  </body>
                </html>
              `);
              popupWindow.document.close();
            }
          } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            if (popupWindow) {
              popupWindow.document.write(`
                <html>
                  <head>
                    <title>Vista de Imagen</title>
                  </head>
                  <body>
                    <img src="${badgeUrl}" alt="Badge" style="width:100%; height:100%;" />
                  </body>
                </html>
              `);
              popupWindow.document.close();
            }
          }
        } finally {
          if (popupWindow) {
            popupWindow.onbeforeunload = cleanUp;
          }
          cleanUp();
        }
      }
      closeMenu();
    };

    const handleClickDownload = async () => {
      if (badgeUrl) {
        console.log('Badge URL:', badgeUrl);
        try {
          const response = await fetch(badgeUrl, { mode: 'cors' });
          console.log('Fetch response:', response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const blob = await response.blob();
          console.log('Blob size:', blob.size);

          const fileExtension = badgeUrl.split('.').pop().toLowerCase();
          const fileName = `${badgeType}_${course.title.replace(
            /[^a-z0-9]/gi,
            '_',
          )}.${fileExtension}`;
          console.log('File name:', fileName);

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading the file:', error);
        }
      } else {
        console.error('No badge URL found');
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
