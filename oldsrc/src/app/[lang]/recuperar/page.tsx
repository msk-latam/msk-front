import React, { FC } from 'react';

import { Props } from '@/app/layout';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { SITE_URL } from '@/contains/constants';
import PageNewPassword from '@/components/MSK/PageNewPassword';
import PageForgotPass from '@/components/MSK/PageRecover';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get('country')?.value;
  const hostname = process.env.VERCEL_URL || '';
  const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
  return {
    title: 'Cambia tu contraseña | MSK',
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/recuperar`,
        }
      : undefined,
    robots: IS_PROD
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
const PagePoliticsPrivacy: FC = () => {
  return <PageForgotPass />;
};

export default PagePoliticsPrivacy;
