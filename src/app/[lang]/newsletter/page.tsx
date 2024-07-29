'use client';
import FooterNewsletter from '@/components/Footer/Newsletter';
import { FC } from 'react';
const newsletter: FC = () => {
  return (
    <>
      <div className=''>
        <div className='bg-content-msk nc-HeadBackgroundCommon'>
          <div className='container relative pt-10 pb-16 lg:pt-20 lg:pb-28'>
            <header className='text-center max-w-2xl mx-auto'>
              <h2 className='flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-neutral-900 dark:text-neutral-100 justify-center'>
                Nuestro Newsletter
              </h2>
              <span className='block text-sm mt-2 text-[#6474a6] sm:text-base dark:text-neutral-200 max-w-[70%] md:max-w-[90%] mx-auto'>
                Suscrí­bete para acceder a descuentos exclusivos, becas
                completas y contenido personalizado
              </span>
            </header>
            <div className='p-5 mx-auto bg-white rounded-[12px] sm:rounded-[40px] shadow-lg sm:p-10 mt-10 lg:mt-20 lg:p-16 dark:bg-neutral-900'>
              <FooterNewsletter email='' setShow={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default newsletter;
