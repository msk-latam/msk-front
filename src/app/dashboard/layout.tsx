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
	title: 'Dashboard | MSK',
	description: 'Tu panel de control en MSK para ver tus cursos y recursos recomendados',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <section className={`${inter.variable} ${raleway.variable} font-inter`}>{children}</section>;
}
