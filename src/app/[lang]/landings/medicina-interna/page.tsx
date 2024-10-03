import ssr from '@/services/ssr';
import { cookies, headers } from 'next/headers';
import React, { FC } from 'react';
import Landing from '../Landing';
import { redirect } from 'next/navigation';

const LandingPage: FC = async ({ params }: any) => {
  const currentCountry = params.lang || cookies().get('country')?.value;
  const allowedCountries = ['co', 'cr', 'pe'];

  const reqHeaders = headers();
  const currentHost = reqHeaders.get('host') || '';

  console.log(currentHost, 'currentHost');
  // const isProduction = currentHost.includes('localhost');
  const isProduction = currentHost.includes('msklatam.com');

  // Lógica de redirección solo en producción
  if (isProduction && !allowedCountries.includes(currentCountry)) {
    // aca estaria bueno agregar un modal de que vas a ser redireccionado o curso bloqueado en el pais
    redirect('/');
  }

  const { product } = await ssr.getSingleProduct(
    'medicina-interna',
    currentCountry,
  );
  return <Landing product={product} country={currentCountry} />;
};

export default LandingPage;
