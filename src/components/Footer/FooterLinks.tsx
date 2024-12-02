import ssr from '@/services/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

interface LinkItem {
	title: string;
	url: string;
	target?: string;
}

interface Category {
	title: string;
	links: LinkItem[];
}

const FooterLinksSection: React.FC = ({ params }: any) => {
	const pathname = usePathname(); // Obtén el pathname de la URL
	const [countryCode, setCountryCode] = useState<string>('ar');

	useEffect(() => {
		if (pathname) {
			const pathParts = pathname.split('/'); // Divide la ruta por '/'
			const code = pathParts[1]; // El primer segmento después del dominio
			setCountryCode(code);
		}
	}, [pathname]);
	const [categories, setCategories] = useState<Category[]>([]);
	const countryToLangMap = {
		ar: 'arg',
		us: 'us',
		mx: 'mx',
		co: 'co',
		ve: 've',
		es: 'es',
		bo: 'bo',
		cr: 'cr',
		cl: 'cl',
	};

	function getLangCode(countryCode: any) {
		return countryToLangMap[countryCode.toLowerCase()];
	}
	function mapCategories(data: any) {
		return [
			{
				title: 'Cursos más elegidos',
				links: data.cursos_mas_elegidos
					.filter((curso: any) => curso.url) // Filtra elementos sin URL
					.map((curso: any) => ({
						title: curso.title,
						url: curso.url,
					})),
			},
			{
				title: 'Cursos más buscados',
				links: data.cursos_mas_buscados
					.filter((curso: any) => curso.url) // Filtra elementos sin URL
					.map((curso: any) => ({
						title: curso.title,
						url: curso.url,
					})),
			},
			{
				title: 'Especialidades',
				links: data.especialidades
					.filter((item: any) => item.especialidad.url_especialidad) // Filtra elementos sin URL
					.map((item: any) => ({
						title: item.especialidad.especialidad.trim(),
						url: item.especialidad.url_especialidad,
					})),
			},
			{
				title: 'Contenidos destacados',
				links: data.contenidos_destacados
					.filter((contenido: any) => contenido.url) // Filtra elementos sin URL
					.map((contenido: any) => ({
						title: contenido.title,
						url: contenido.url,
					})),
			},
		];
	}

	const langCode = getLangCode(countryCode);

	useEffect(() => {
		const fetchFooterData = async () => {
			try {
				const response = await fetch(
					`https://wp.msklatam.com/wp-json/wp/api/footer?country=${countryCode}&lang=${langCode}`,
				);
				// console.log(response);

				if (!response.ok) {
					throw new Error('Error fetching footer data');
				}
				const data = await response.json();

				console.log(data);

				const mappedCategories = mapCategories(data);
				setCategories(mappedCategories);
			} catch (error) {
				console.error('Error fetching footer data:', error);
			}
		};

		fetchFooterData();
	}, [countryCode]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:pb-6'>
			{categories.map((category, index) => (
				<div key={index} className='footer-column px-8 lg:px-0 mb-4'>
					<h4 className='text-lg font-semibold mb-2 text-white !font-inter'>{category.title}</h4>
					<ul className='space-y-2'>
						{category.links.map((link, linkIndex) => (
							<li key={linkIndex}>
								<Link href={link.url || '#'} className='text-sm text-[#95A295] hover:underline'>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default FooterLinksSection;
