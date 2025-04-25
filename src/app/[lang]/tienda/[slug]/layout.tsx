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

// ❌ Eliminado el export const metadata (eso es lo que bloquea la metadata dinámica)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <section className={`${inter.variable} ${raleway.variable} font-inter`}>{children}</section>;
}