import React, { FC } from 'react';
import PageTerminosCondicionesComponent from '@/components/MSK/terminos-y-condiciones/Page';
import { IS_PROD, SITE_URL } from '@/contains/constants';
import { Props } from '@/app/layout';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import PageNosotrosComponent from '@/components/MSK/nosotros/Page';
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get('country')?.value;

  return {
    title: 'Nosotros | MSK',
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/nosotros`,
        }
      : undefined,
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
  };
}
const PageNosotros: FC = () => {
  // return <PageTerminosCondicionesComponent />;
  return <PageNosotrosComponent />;
};

export default PageNosotros;
