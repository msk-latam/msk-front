// app/layout.tsx
import { Inter, Raleway } from 'next/font/google';
import './globals.css';

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

const ralewayItalic = Raleway({
	subsets: ['latin'],
	style: 'italic',
	variable: '--font-lora-italic',
	weight: ['400', '500', '600', '700'],
});

const interItalic = Inter({
	subsets: ['latin'],
	style: 'italic',
	variable: '--font-lora-italic',
	weight: ['400', '500', '600', '700'],
});

export const metadata = {
	title: 'MSK',
	description: 'Cursos de medicina online para toda Latinoamérica',
	icons: {
		icon: '/isotipo.svg', // o '/favicon.ico'
		// apple: '/apple-touch-icon.png' // opcional
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<head>
				<meta name='robots' content='noindex, nofollow' />
			</head>
			<body className={`${inter.variable} ${raleway.variable} font-inter`}>{children}</body>
		</html>
	);
}
