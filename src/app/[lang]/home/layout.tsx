import type { Metadata } from 'next';
import { Inter, Raleway, Lora } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-inter',
	display: 'swap',
	preload: true,
});

const lora = Lora({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-lora',
	display: 'swap',
	preload: true,
});
const loraItalic = Lora({
	subsets: ['latin'],
	style: 'italic',
	variable: '--font-lora-italic',
	weight: ['400', '500', '600', '700'],
});
const interItalic = Inter({
	subsets: ['latin'],
	style: 'italic',
	variable: '--font-lora-italic',
	weight: ['200', '300', '400', '500', '600', '700'],
});

const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-raleway',
	display: 'swap',
	preload: true,
});

export const metadata: Metadata = {
	title: 'Home | MSK',
	description: 'Tu panel de control en MSK para ver tus cursos y recursos recomendados',
	icons: {
		icon: [
			{ url: '/isotipo.svg', type: 'image/svg+xml' },
			{ url: '/icon-16x16.png', type: 'image/png', sizes: '16x16' },
			{ url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
		],
		apple: '/apple-icon.png',
	},
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <section className={`${inter.variable} ${raleway.variable} ${lora.variable} ${loraItalic.variable} font-inter`}>{children}</section>;
}
