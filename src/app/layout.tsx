import './globals.css';
import '@/styles/index.scss';
import { Poppins, Lora } from 'next/font/google';
import { StoreProvider } from '@/context/storeFilters/StoreProvider';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/NavigationEvents';
import { SITE_URL } from '@/contains/constants';
import { GoogleTagManager } from '@next/third-parties/google';
import { GlobalStateProvider } from './[lang]/mi-perfil/GlobalStateContext';
import { LoaderProvider, useLoader } from '@/context/loader/LoaderContext';
// import Footer from '@/components/Footer/Footer';
// import BotMaker from '@/scripts/BotMaker';
const Footer = React.lazy(() => import('@/components/Footer/Footer'));
const BotMaker = React.lazy(() => import('@/scripts/BotMaker'));

import GoogleCaptchaWrapper from '@/context/google/Recaptcha';
import DataProvider from '@/context/data/DataProvider';
import UTMProvider from '@/context/utm/UTMProvider';
import CountryProvider from '@/context/country/CountryProvider';
import AuthProvider from '@/context/user/AuthProvider';
import Header from '@/components/Header/Header';
import React from 'react';
import Script from 'next/script';
import EmblueScript from '@/components/EmblueScript/EmblueScript';
import { organizationDataSEO, reviewsDataSEO, websiteDataSEO } from '@/SEO/generales/structuredData';

// export const runtime = 'edge';

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

	const hostname = process.env.VERCEL_URL || '';
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');

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
		robots: IS_PROD ? { index: true, follow: true } : { index: false, follow: false },
	};
}

interface LayoutProps {
	params?: { country: string };
	children: React.ReactNode;
	showHeaderFooter?: boolean;
}

export default async function RootLayout({ params, children, showHeaderFooter = true }: LayoutProps) {
	return (
		<html lang='es' className={poppins.className + ' ' + loraItalic.variable}>
			{/* <script src='https://sdk.rebill.com/v2/rebill.min.js'></script> */}
			<head>
				<GoogleTagManager gtmId='GTM-NZ95R2P' />
				<Script src='https://sdk.rebill.com/v3/rebill.js' defer />
				<Script src='https://sdk.mercadopago.com/js/v2' defer />
				<EmblueScript />
				<Script defer type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationDataSEO) }} />
				<Script defer type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteDataSEO) }} />
				<Script defer type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsDataSEO) }} />
			</head>

			<body>
				<div className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 '>
					<GoogleCaptchaWrapper>
						<CountryProvider>
							<DataProvider>
								<UTMProvider>
									<AuthProvider>
										<StoreProvider>
											{showHeaderFooter && <Header />}
											<LoaderProvider>
												<GlobalStateProvider>
													<div className='container'>{children}</div>
												</GlobalStateProvider>
											</LoaderProvider>
											<BotMaker />
											{showHeaderFooter && <Footer />}

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
