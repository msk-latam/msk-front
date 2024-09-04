import React, { FC } from 'react';
import PagePoliticaDeCookiesComponent from '@/components/MSK/politica-de-cookies/Page';

export async function generateMetadata() {
  const hostname = process.env.VERCEL_URL || '';
  const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
  return {
    title: 'Política de cookies | MSK',
    robots: IS_PROD
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
const PagePoliticaDeCookies: FC = () => {
  return <PagePoliticaDeCookiesComponent />;
};

export default PagePoliticaDeCookies;
