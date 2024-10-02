'use client';
import { FetchSingleProduct } from '@/data/types';
import React, { FC } from 'react';
import LandingHeader from './LandingHeader';
import LandingBody from './LandingBody';
import LandingTemario from './LandingTemario';
import LandingFooter from './LandingFooter';

interface LandingProps {
  product: FetchSingleProduct;
  country: string;
}

const Landing: FC<LandingProps> = ({ product, country }) => {
  return (
    <>
      <LandingHeader product={product} country={country} />
      <LandingBody product={product} country={country} />
      <LandingTemario product={product} country={country} />
      <LandingFooter product={product} country={country} />
    </>
  );
};

export default Landing;
