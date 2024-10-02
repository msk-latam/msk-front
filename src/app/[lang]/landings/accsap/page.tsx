import ssr from '@/services/ssr';
import { cookies } from 'next/headers';
import React, { FC } from 'react';
import Landing from '../Landing';
import { redirect } from 'next/navigation';

const LandingPage: FC = async ({ params }: any) => {
  const currentCountry = params.lang || cookies().get('country')?.value;
  // const allowedCountries = ['co', 'cr', 'pe'];
  // if (!allowedCountries.includes(currentCountry)) {
  //   redirect('/');
  // }
  const { product } = await ssr.getSingleProduct('accsap', currentCountry);

  return <Landing product={product} country={currentCountry} />;
};

export default LandingPage;
