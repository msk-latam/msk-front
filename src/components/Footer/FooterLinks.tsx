// src/components/FooterLinksSection.tsx

import Link from 'next/link';

interface LinkItem {
	title: string;
	url: string;
}

interface Category {
	title: string;
	links: LinkItem[];
}

const FooterLinksSection: React.FC = () => {
	const categories: Category[] = [
		{
			title: 'Cursos más elegidos',
			links: [
				{ title: 'Curso superior de cardiología', url: '/curso/accsap/' },
				{ title: 'Curso superior de emergentología', url: '/curso/medicina-de-urgencias/' },
				{ title: 'Curso superior de ginecología', url: '/curso/ginecologia/' },
				{ title: 'Curso superior de neonatología', url: '/curso/neonatologia/' },
				{ title: 'Curso superior de obstetricia', url: '/curso/obstetricia/' },
				{ title: 'Formación integral en medicina de urgencias para enfermeros', url: '/curso/enfermeria-en-urgencias/' },
				{ title: '', url: '' },
				{ title: '', url: '' },
				{ title: '', url: '' },
				// Agrega más enlaces aquí
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
				{ title: '', url: '' },
				{ title: '', url: '' },
				{ title: '', url: '' },
				// Agrega más enlaces aquí
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
				{ title: '', url: '' },

				// Agrega más enlaces aquí
			],
		},
		{
			title: 'Contenidos destacados',
			links: [
				{
					title: 'Cómo estudiantes de medicina se convierten en influences',
					url: '/blog/estudiantes-de-medicina-e-influencers/',
				},
				{
					title: 'Como evoluciona la cirugía robótica en pediatría',
					url: '/blog/evolucion-de-la-cirugia-robotica-en-pediatria/',
				},
				{
					title: 'Cuál es el fármaco llamado a prevenir el cáncer de mama',
					url: '/blog/farmaco-podria-prevenir-el-cancer-de-mama/',
				},
				{ title: '4 innovaciones para el tratamiento del dolor', url: '/blog/innovaciones-para-el-tratamiento-del-dolor/' },
				{ title: 'Realidad virtual vs. trastorno de estrés postraumático', url: '/blog/realidad-virtual-vs-tept/' },
				{
					title: 'Cómo avanza el tratamiento de las hemoglobinopatías',
					url: '/blog/como-avanza-el-tratamiento-de-las-hemoglobinopatias/',
				},
				{ title: '', url: '' },

				// Agrega más enlaces aquí
			],
		},
	];

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
			{categories.map((category, index) => (
				<div key={index} className='footer-column'>
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
