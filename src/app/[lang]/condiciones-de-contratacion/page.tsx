import { FC } from 'react';
import { Props } from '@/app/layout';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  redirect(`/terminos-y-condiciones`);
}
const PageTerminosCondiciones: FC = () => {
  redirect(`/terminos-y-condiciones`);

  //return <PageTerminosCondicionesComponent />;
};

export default PageTerminosCondiciones;
