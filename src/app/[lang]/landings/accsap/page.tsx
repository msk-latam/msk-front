import ssr from '@/services/ssr';
import { cookies } from 'next/headers';
import React, { FC } from 'react';
import Landing from '../Landing';

const LandingPage: FC = async ({ params }: any) => {
  const currentCountry = params.lang || cookies().get('country')?.value;
  const { product } = await ssr.getSingleProduct('accsap', currentCountry);

  return <Landing product={product} country={currentCountry} />;
};

export default LandingPage;
