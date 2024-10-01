'use client';
import { FetchSingleProduct } from '@/data/types';
import React, { FC } from 'react';
import LandingHeader from './LandingHeader';

// Definir la interfaz de las props del componente
interface LandingProps {
  product: FetchSingleProduct;
  country: string;
}

const Landing: FC<LandingProps> = ({ product, country }) => {
  console.log(product);
  console.log(country);
  return <LandingHeader product={product} country={country} />;
};

export default Landing;
