// app/layout.tsx
import './globals.css';
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

<<<<<<< HEAD
export const metadata: Metadata = {
	title: 'MSK',
	description: 'Masterclass médica y formación profesional.',
=======
export const metadata = {
	title: 'MSK',
	description: 'Cursos de medicina para toda latinoamerica',
>>>>>>> d5f94bb402d5f1c68dbf452a16bef3ab14ae3128
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className={`${inter.variable} ${raleway.variable} font-inter`}>
				{children}
			</body>
		</html>
	);
}
