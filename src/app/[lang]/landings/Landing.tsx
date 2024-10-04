'use client';
import { FetchSingleProduct } from '@/data/types';
import React, { FC, useEffect } from 'react';
import LandingHeader from './LandingHeader';
import LandingBody from './LandingBody';
import LandingTemario from './LandingTemario';
import LandingFooter from './LandingFooter';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { paymentLink } from './LandingsVariables';

interface LandingProps {
  product: FetchSingleProduct;
  country: string;
}

const Landing: FC<LandingProps> = ({ product, country }) => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      const button = document.querySelector('#fixedButton');

      if (footer && button) {
        const scrollY = window.scrollY;
        if (scrollY < 250 || scrollY > 4700) {
          button.classList.add('hidden');
          button.classList.remove('block');
        } else {
          button.classList.remove('hidden');
          button.classList.add('block');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <LandingHeader product={product} country={country} />
      <LandingBody product={product} country={country} />
      <LandingTemario product={product} country={country} />
      <LandingFooter product={product} country={country} />

      <div id='fixedButton' className='fixed bottom-4 left-4 right-4 md:hidden'>
        <ButtonPrimary
          href={paymentLink(country, product.params.slug)}
          targetBlank={true}
          rel='noopener noreferrer'
          className='fixed bottom-16 left-0 right-0 md:hidden z-[9999] w-full shadow-xl shadow-black/25'
        >
          Prueba 7 días gratis
        </ButtonPrimary>
      </div>

      {/* Hecho por Ariel Eitner */}
    </>
  );
};

export default Landing;
