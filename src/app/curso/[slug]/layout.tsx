import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-inter',
	display: 'swap',
	preload: true,
});

const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-raleway',
	display: 'swap',
	preload: true,
});

export const metadata: Metadata = {
	title: {
		template: '%s | MSK',
		default: 'Curso | MSK',
	},
	description: 'Tu curso en MSK para ver tus cursos y recursos recomendados',
	icons: {
		icon: [
			{ url: '/isotipo.svg', type: 'image/svg+xml' },
			{ url: '/icon-16x16.png', type: 'image/png', sizes: '16x16' },
			{ url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
		],
		apple: '/apple-icon.png',
	},
};

export default function CursoLayout({ children }: { children: React.ReactNode }) {
	return <section className={`${inter.variable} ${raleway.variable} font-inter`}>{children}</section>;
}
