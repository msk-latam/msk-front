import { baseUrl } from '@/data/api';
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
			const pathParts = pathname.split('/');
			let code = pathParts[1] || 'ar'; // Default to 'ar' if no country is specified

			// Verifica que el primer segmento sea un código de país válido
			const isValidCountry = /^[a-zA-Z]{2}$/.test(code);

			// Si el primer segmento no es un código de país válido, asigna 'ar'
			if (!isValidCountry) {
				code = 'ar';
			}
			if (code === 'mi') {
				code = 'ar';
			}

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
	function getUrl() {
		let host = window.location.hostname;
		let url = 'http://localhost:3000';
		if (host != 'localhost') {
			return `https://${host}`;
		}
		return url;
	}

	// console.log(countryCode);

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';

	useEffect(() => {
		const fetchFooterData = async () => {
			try {
				const replaceDomain = (url: string) => {
					const base = getUrl();

					// Si la URL pertenece a "msklatam.com", reemplazarla por la base correcta
					// if (url.startsWith('https://msklatam.com/')) {
					// 	url = url.replace('https://msklatam.com/', '/'); // Convertimos a una ruta relativa
					// }

					// Si la URL tiene tech
					if (base.indexOf('.tech')>-1) {
						url = url.replace('.com', '.tech'); // Convertimos en ruta de tech.
					}


					// Si la URL ya es absoluta (http o https de otro dominio), no modificarla
					if (url.startsWith('http://') || url.startsWith('https://')) {
						return url;
					}

					// Asegurar que la base y la URL están bien formateadas
					const formattedBase = base.endsWith('/') ? base.slice(0, -1) : base;
					const formattedUrl = url.startsWith('/') ? url : `/${url}`;

					// Si la URL ya tiene un código de país en la ruta, no agregar otro
					if (formattedUrl.match(/^\/[a-z]{2}\//)) {
						return `${formattedBase}${formattedUrl}`;
					}

					// Agregar el código de país si corresponde
					return country ? `${formattedBase}/${country}${formattedUrl}` : `${formattedBase}${formattedUrl}`;
				};

				const updateUrls = (data: any) => {
					return {
						...data,
						cursos_mas_elegidos: data.cursos_mas_elegidos.map((course: any) => ({
							...course,
							url: replaceDomain(course.url),
						})),
						cursos_mas_buscados: data.cursos_mas_buscados.map((course: any) => ({
							...course,
							url: replaceDomain(course.url),
						})),
						especialidades: data.especialidades.map((item: any) => ({
							especialidad: {
								...item.especialidad,
								url_especialidad: replaceDomain(item.especialidad.url_especialidad),
							},
						})),
						contenidos_destacados: data.contenidos_destacados.map((content: any) => ({
							...content,
							url: replaceDomain(content.url),
						})),
					};
				};
				const response = await fetch(`${getUrl()}/footerLinks/${countryCode}.json`);
				// console.log(response);

				if (!response.ok) {
					throw new Error('Error fetching footer data');
				}
				let data = await response.json();
				data = updateUrls(data);

				// console.log(data);

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
