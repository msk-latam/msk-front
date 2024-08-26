import './globals.css';
import '@/styles/index.scss';
import { Poppins, Lora } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import GoogleCaptchaWrapper from '@/context/google/Recaptcha';
import DataProvider from '@/context/data/DataProvider';
import UTMProvider from '@/context/utm/UTMProvider';
import CountryProvider from '@/context/country/CountryProvider';
import AuthProvider from '@/context/user/AuthProvider';
import { StoreProvider } from '@/context/storeFilters/StoreProvider';
import Header from '@/components/Header/Header';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/NavigationEvents';
import { SITE_URL } from '@/contains/constants';
import BotMaker from '@/scripts/BotMaker';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import EmblueScript from '@/components/EmblueScript/EmblueScript';
import { GlobalStateProvider } from './[lang]/mi-perfil/GlobalStateContext';

export const runtime = 'edge';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const loraItalic = Lora({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-lora-italic',
  weight: ['400', '500', '600', '700'],
});

export type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get('country')?.value;

  return {
    title: {
      default: 'MSK | Cursos de medicina para expandir tus metas profesionales',
      template: '%s',
    },
    description: 'Cursos de medicina para expandir tus metas profesionales',
    metadataBase: new URL(`${SITE_URL}/${currentCountry}`),
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface LayoutProps {
  params: { country: string };
  children: React.ReactNode;
}

export default async function RootLayout({ params, children }: LayoutProps) {
  return (
    <html lang='es' className={poppins.className + ' ' + loraItalic.variable}>
      {/* <script src='https://sdk.rebill.com/v2/rebill.min.js'></script> */}
      <head>
        <GoogleTagManager gtmId='GTM-NZ95R2P' />
        <Script src='https://sdk.rebill.com/v3/rebill.js' defer />
        <Script src='https://sdk.mercadopago.com/js/v2' defer />
        <EmblueScript />
      </head>

      <body>
        <div className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
          <GoogleCaptchaWrapper>
            <CountryProvider>
              <DataProvider>
                <UTMProvider>
                  <AuthProvider>
                    <StoreProvider>
                      <Header />
                      <GlobalStateProvider>{children}</GlobalStateProvider>
                      <BotMaker />
                      <Footer />

                      <Suspense fallback={null}>
                        <NavigationEvents />
                      </Suspense>
                    </StoreProvider>
                  </AuthProvider>
                </UTMProvider>
              </DataProvider>
            </CountryProvider>
          </GoogleCaptchaWrapper>
        </div>
      </body>
    </html>
  );
}
