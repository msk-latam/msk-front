// import { Inter, Raleway } from 'next/font/google';
// import './globals.css';
// import LoaderLayout from './LoaderLayout';
// import { CountryProvider } from '@/context/country/CountryProvider';
// import Script from 'next/script';
// import LanguageCookieUpdater from '@/utils/LanguageCookieUpdater';
// import GoogleCaptchaWrapper from '@/context/google/Recaptcha';
// import UTMProvider from '@/context/utm/UTMProvider'; // ✅ Añadí este

// const inter = Inter({
// 	subsets: ['latin'],
// 	weight: ['200', '300', '400', '500', '600', '700'],
// 	variable: '--font-inter',
// 	display: 'swap',
// 	preload: true,
// });

// const raleway = Raleway({
// 	subsets: ['latin'],
// 	style: 'normal',
// 	variable: '--font-lora-italic',
// 	weight: ['400', '500', '600', '700'],
// });

// export const metadata = {
// 	title: 'MSK',
// 	description: 'Cursos de medicina online para toda Latinoamérica',
// 	icons: {
// 		icon: '/isotipo.svg',
// 	},
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
// 	return (
// 		<html lang='es'>
// 			<head>
// 				<meta name='robots' content='noindex, nofollow' />
// 				<Script src='https://sdk.rebill.com/v3/rebill.js' defer />
// 			</head>
// 			<body className={`${inter.variable} ${raleway.variable} font-inter`}>
// 				<LoaderLayout />
// 				<GoogleCaptchaWrapper>
// 					<CountryProvider>
// 						<UTMProvider>
// 							{' '}
// 							{/* ✅ UTM context para utm_state */}
// 							<LanguageCookieUpdater />
// 							{children}
// 						</UTMProvider>
// 					</CountryProvider>
// 				</GoogleCaptchaWrapper>
// 			</body>
// 		</html>
// 	);
// }

import { Inter, Raleway } from 'next/font/google';
import './globals.css';
import LoaderLayout from './LoaderLayout';
import { CountryProvider } from '@/context/country/CountryProvider';
import Script from 'next/script';
import LanguageCookieUpdater from '@/utils/LanguageCookieUpdater';
import GoogleCaptchaWrapper from '@/context/google/Recaptcha';
import UTMProvider from '@/context/utm/UTMProvider'; // ✅ Añadí este

const inter = Inter({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-inter',
	display: 'swap',
	preload: true,
});

const raleway = Raleway({
	subsets: ['latin'],
	style: 'normal',
	variable: '--font-lora-italic',
	weight: ['400', '500', '600', '700'],
});

export const metadata = {
	title: 'MSK',
	description: 'Cursos de medicina online para toda Latinoamérica',
	icons: {
		icon: '/isotipo.svg',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<head>
				<meta name='robots' content='noindex, nofollow' />
				<Script src='https://sdk.rebill.com/v3/rebill.js' defer />
			</head>
			<body className={`${inter.variable} ${raleway.variable} font-inter`}>
				<LoaderLayout />
				<GoogleCaptchaWrapper>
					<CountryProvider>
						<UTMProvider>
							{' '}
							{/* ✅ UTM context para utm_state */}
							<LanguageCookieUpdater />
							{children}
						</UTMProvider>
					</CountryProvider>
				</GoogleCaptchaWrapper>

				<Script id='fix-recaptcha-badge' strategy='afterInteractive'>
					{`
    const interval = setInterval(() => {
      const badge = document.querySelector('.grecaptcha-badge');
      if (badge) {
        badge.style.position = 'fixed';
        badge.style.left = '0';
        badge.style.right = 'auto';
        badge.style.bottom = '20px';
        badge.style.width = '70px';
        badge.style.overflow = 'hidden';
        badge.style.transition = 'all 0.3s ease';
        badge.style.zIndex = '-1';

        badge.addEventListener('mouseenter', () => {
          badge.style.width = '256px';
        });

        badge.addEventListener('mouseleave', () => {
          badge.style.width = '70px';
        });

        clearInterval(interval);
      }
    }, 300);
  `}
				</Script>
			</body>
		</html>
	);
}
