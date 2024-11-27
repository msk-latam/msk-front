import ssr from '@/services/ssr';
import Link from 'next/link';

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
	const [countryCode, setCountryCode] = useState<string>('ar');
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchFooterData = async () => {
			try {
				const response = await fetch(`https://wp.msklatam.com/wp-json/wp/api/footer?country=${countryCode}`);
				// console.log(response);

				if (!response.ok) {
					throw new Error('Error fetching footer data');
				}
				const data = await response.json();

				// console.log(data);

				// Mapeamos la estructura del API a nuestro estado
				const parsedCategories: Category[] = [
					{
						title: 'Cursos más elegidos',
						links: data.cursos_mas_elegidos || [], // Usa un array vacío si no hay datos
					},
					{
						title: 'Cursos más buscados',
						links: data.cursos_mas_buscados || [],
					},
					{
						title: 'Especialidades',
						links:
							data.especialidades.map((item: any) => ({
								title: item.especialidad.especialidad,
								url: item.especialidad.url_especialidad,
							})) || [],
					},
					{
						title: 'Contenidos destacados',
						links: data.contenidos_destacados || [],
					},
				];

				setCategories(parsedCategories);
			} catch (error) {
				console.error('Error fetching footer data:', error);
			}
		};

		fetchFooterData();
	}, [countryCode]);

	// useEffect(() => {
	// 	// Detecta el país desde la URL en el lado del cliente
	// 	if (typeof window !== 'undefined') {
	// 		const path = window.location.pathname;
	// 		const country = path.split('/')[1]; // Extrae el primer segmento de la URL
	// 		setCountryCode(country); // Guarda el país en el estado
	// 		console.log(country);
	// 	}
	// }, []);

	// const fetchPosts = async () => await ssr.getPosts(countryCode);

	// const parseDate = (dateStr: any) => {
	// 	const months = {
	// 		Enero: 'January',
	// 		Febrero: 'February',
	// 		Marzo: 'March',
	// 		Abril: 'April',
	// 		Mayo: 'May',
	// 		Junio: 'June',
	// 		Julio: 'July',
	// 		Agosto: 'August',
	// 		Septiembre: 'September',
	// 		Octubre: 'October',
	// 		Noviembre: 'November',
	// 		Diciembre: 'December',
	// 	};

	// 	// Separar día, mes y año
	// 	const [mes, dia, año] = dateStr.split(' ').map((part: any) => part.trim());

	// 	// Reemplazar el mes en español por inglés
	// 	const monthEnglish = months[mes as keyof typeof months];
	// 	return new Date(`${dia} ${monthEnglish} ${año}`);
	// };

	// useEffect(() => {
	// 	const processPosts = async () => {
	// 		const posts = await fetchPosts();

	// 		const sortedPosts = posts
	// 			.map((post: any) => ({
	// 				...post,
	// 				date: parseDate(post.date),
	// 			}))
	// 			.sort((a: any, b: any) => b.date - a.date)
	// 			.slice(0, 6);

	// 		const dynamicCategory = {
	// 			title: 'Contenidos destacados',
	// 			links: sortedPosts.map((post: any) => ({
	// 				title: post.title,
	// 				url: `/blog/${post.slug}/`,
	// 			})),
	// 		};

	// 		setCategories((prevCategories) => {
	// 			const exists = prevCategories.some((category) => category.title === 'Contenidos destacados');
	// 			return exists ? prevCategories : [...prevCategories, dynamicCategory];
	// 		});
	// 	};

	// 	processPosts();
	// }, []);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:pb-6'>
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
