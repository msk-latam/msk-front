import React, { FC } from 'react';
import PageBasesPromocionalesComponent from '@/components/MSK/bases-promocionales/Page';

export async function generateMetadata() {
  const hostname = process.env.VERCEL_URL || '';
  const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
  return {
    title: 'Bases promocionales | MSK',
    robots: IS_PROD
      ? { index: true, follow: true }
      : { index: false, follow: false },
    description:
      'Consulta las bases promocionales de MSK para conocer todos los detalles de nuestras promociones.',
  };
}
const PageContractConditions: FC = () => {
  return <PageBasesPromocionalesComponent />;
};

export default PageContractConditions;
