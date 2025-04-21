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
export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
	const formattedSlug = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ');

	return {
		title: `${formattedSlug} | MSK`,
		description: 'Cursos de medicina para expandir tus metas profesionales',
		icons: {
			icon: '/isotipo.ico',
			shortcut: '/isotipo.ico',
			apple: '/isotipo.ico',
			other: {
				rel: 'icon',
				url: '/isotipo.ico',
			},
		},
	};
};

export default function GenericLayout({ children }: { children: React.ReactNode }) {
	return <section className={`${inter.variable} ${raleway.variable} font-inter`}>{children}</section>;
}
