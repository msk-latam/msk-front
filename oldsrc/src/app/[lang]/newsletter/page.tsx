'use client';
import FooterNewsletter from '@/components/Footer/Newsletter';
import LayoutPage from '@/components/MSK/LayoutPage';
import { FC } from 'react';
const newsletter: FC = () => {
  return (
    <>
      <div className=''>
        <LayoutPage
          subHeading='Suscrí­bete para acceder a descuentos exclusivos, becas
                  completas y contenido personalizado'
          heading='Nuestro Newsletter'
        >
          <FooterNewsletter email='' setShow={() => {}} />
        </LayoutPage>
      </div>
    </>
  );
};

export default newsletter;
