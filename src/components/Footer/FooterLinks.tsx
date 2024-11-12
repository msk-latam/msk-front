import ssr from '@/services/ssr';
import Link from 'next/link';

import { useEffect, useState } from 'react';

interface LinkItem {
	title: string;
	url: string;
}

interface Category {
	title: string;
	links: LinkItem[];
}

const FooterLinksSection: React.FC = () => {
	const [countryCode, setCountryCode] = useState<string>();
	const [categories, setCategories] = useState<Category[]>([
		{
			title: 'Cursos más elegidos',
			links: [
				{ title: 'Curso superior de cardiología', url: '/curso/accsap/' },
				{ title: 'Curso superior de emergentología', url: '/curso/medicina-de-urgencias/' },
				{ title: 'Curso superior de ginecología', url: '/curso/ginecologia/' },
				{ title: 'Curso superior de neonatología', url: '/curso/neonatologia/' },
				{ title: 'Curso superior de obstetricia', url: '/curso/obstetricia/' },
				{ title: 'Formación integral en medicina de urgencias para enfermeros', url: '/curso/enfermeria-en-urgencias/' },
			],
		},
		{
			title: 'Cursos más buscados',
			links: [
				{ title: 'Curso superior de cardiología', url: '/curso/accsap/' },
				{ title: 'Curso superior de emergentología', url: '/curso/medicina-de-urgencias/' },
				{ title: 'Curso superior de ginecología', url: '/curso/ginecologia/' },
				{ title: 'Curso superior de neonatología', url: '/curso/neonatologia/' },
				{ title: 'Curso superior de obstetricia', url: '/curso/obstetricia/' },
				{ title: 'Formación integral en medicina de urgencias para enfermeros', url: '/curso/enfermeria-en-urgencias/' },
			],
		},
		{
			title: 'Especialidades',
			links: [
				{ title: 'Cursos de cardiología', url: '/tienda/cardiologia/' },
				{ title: 'Cursos de administración y gestión', url: '/tienda/administracion-y-gestion/' },
				{ title: 'Cursos de ginecología', url: '/tienda/ginecologia/' },
				{ title: 'Cursos de medicina familiar', url: '/tienda/medicina-familiar/' },
				{ title: 'Cursos de emergentología', url: '/tienda/emergentologia/' },
				{ title: 'Cursos de medicina general', url: '/tienda/medicina-general/' },
			],
		},
	]);

	useEffect(() => {
		// Detecta el país desde la URL en el lado del cliente
		if (typeof window !== 'undefined') {
			const path = window.location.pathname;
			const country = path.split('/')[1]; // Extrae el primer segmento de la URL
			setCountryCode(country); // Guarda el país en el estado
			console.log(country);
		}
	}, []);

	const fetchPosts = async () => await ssr.getPosts(countryCode);

	const parseDate = (dateStr: any) => {
		const months = {
			Enero: 'January',
			Febrero: 'February',
			Marzo: 'March',
			Abril: 'April',
			Mayo: 'May',
			Junio: 'June',
			Julio: 'July',
			Agosto: 'August',
			Septiembre: 'September',
			Octubre: 'October',
			Noviembre: 'November',
			Diciembre: 'December',
		};

		// Separar día, mes y año
		const [mes, dia, año] = dateStr.split(' ').map((part: any) => part.trim());

		// Reemplazar el mes en español por inglés
		const monthEnglish = months[mes as keyof typeof months];
		return new Date(`${dia} ${monthEnglish} ${año}`);
	};

	useEffect(() => {
		const processPosts = async () => {
			const posts = await fetchPosts();

			const sortedPosts = posts
				.map((post: any) => ({
					...post,
					date: parseDate(post.date),
				}))
				.sort((a: any, b: any) => b.date - a.date)
				.slice(0, 6);

			const dynamicCategory = {
				title: 'Contenidos destacados',
				links: sortedPosts.map((post: any) => ({
					title: post.title,
					url: `/blog/${post.slug}/`,
				})),
			};

			setCategories((prevCategories) => {
				const exists = prevCategories.some((category) => category.title === 'Contenidos destacados');
				return exists ? prevCategories : [...prevCategories, dynamicCategory];
			});
		};

		processPosts();
	}, []);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
			{categories.map((category, index) => (
				<div key={index} className='footer-column px-8 lg:px-0'>
					<h4 className='text-lg font-semibold mb-4 text-white !font-inter'>{category.title}</h4>
					<ul className='space-y-2'>
						{category.links.map((link, linkIndex) => (
							<li key={linkIndex}>
								<Link href={link.url} className='text-sm text-[#95A295] hover:underline'>
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
