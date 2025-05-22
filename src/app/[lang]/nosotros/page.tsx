'use client';
import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import GenericHeader from '@/modules/generic/components/GenericHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PageData {
	ID: number;
	post_author: string;
	post_date: string;
	post_date_gmt: string;
	post_content: string;
	post_title: string;
	post_excerpt: string;
	post_status: string;
	comment_status: string;
	ping_status: string;
	post_password: string;
	post_name: string;
	to_ping: string;
	pinged: string;
	post_modified: string;
	post_modified_gmt: string;
	post_content_filtered: string;
	post_parent: number;
	guid: string;
	menu_order: number;
	post_type: string;
	post_mime_type: string;
	comment_count: string;
	filter: string;
}

// Placeholder data while loading or if fetch fails
const initialPageData = {
	title: 'Cargando...',
	description: '',
	tags: [],
	breadcrumbs: [],
};

export default function TerminosYCondiciones({ params }: { params: { slug: string } }) {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const country = params.slug ?? 'arg';

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/nosotros?lang=${country}&nocache=1`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data: PageData = await response.json();
				setPageData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unknown error occurred');
				console.error('Failed to fetch page data:', err);
			} finally {
				setLoading(false);
			}
		};

		if (country) {
			fetchData();
		}
	}, [country]);

	const acf = pageData?.acf;
	console.log(acf);

	const {
		titulo,
		imagen,
		titulo_para_convenios,
		descripcion_de_convenios,
		lista_de_avales,
		titulo_nuestro_equipo,
		descripcion_nuestro_equipo,
		staff,
		titulo_direccion_medica,
		direccion_medica,
	} = acf || {};

	if (loading) return <p className='py-10 text-center'>Cargando contenido...</p>;
	if (error) return <p className='py-10 text-center text-red-500'>Error: {error}</p>;

	return (
		<>
			<header
				className='w-full h-[400px] overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(180deg, rgba(0, 0, 0, 0) 32.33%, rgba(0, 0, 0, 0.4) 88.46%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) 43.69%, rgba(0, 0, 0, 0.2) 100%)`,
				}}
			>
				<Navbar />
				<GenericHeader title={'Quiénes somos'} description={initialPageData.description} />
			</header>

			<main className='bg-[#f3f4f6] px-4 sm:px-6 md:px-10 py-12'>
				<p className='font-lora  pb-2 pt-4 text-base sm:text-lg lg:text-xl text-[#392C35]'>
					Medical & Scientific Knowledge es un grupo español con más de ocho años de trayectoria en la industria pharma y en
					el desarrollo de cursos de medicina.
				</p>
				<p className='font-lora  py-2 text-base sm:text-lg lg:text-xl text-[#392C35]'>
					Nuestra misión es satisfacer las necesidades de los profesionales de la salud que buscan estudiar medicina a
					distancia, gestionando sus procesos de capacitación a través de una propuesta dinámica con cursos de actualización
					a la medida de sus posibilidades. Ofrecemos una experiencia exitosa, fluida y de mejora continua. Puedes conocer
					más sobre nuestra misión{' '}
					<Link
						className='text-[#9200AD] underline text-base sm:text-lg lg:text-xl'
						href={country === '' ? `${window.location.origin}/mision` : `${window.location.origin}/${country}/mision`}
						target='_blank'
						rel='noopener noreferrer'
					>
						ingresando aquí
					</Link>
					.
				</p>
				{/* Sección: Título e Imagen */}
				{titulo && (
					<section className='max-w-5xl mx-auto mb-12 text-center'>
						<h1 className='mb-6 text-4xl font-bold'>{titulo}</h1>
						{imagen && <img src={imagen} alt='Imagen nosotros' className='w-full max-w-4xl mx-auto rounded-xl' />}
					</section>
				)}

				{/* Sección: Convenios */}
				{(titulo_para_convenios || descripcion_de_convenios) && (
					<section className='bg-white rounded-[30px] p-8 max-w-5xl mx-auto mb-12'>
						<h2 className='mb-4 text-3xl font-semibold'>{titulo_para_convenios}</h2>
						<div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: descripcion_de_convenios }} />
						{lista_de_avales?.length > 0 && (
							<ul className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3'>
								{lista_de_avales.map((aval) => (
									<li key={aval.ID} className='bg-[#f9fafb] p-4 rounded-lg shadow-sm text-center text-lg'>
										{aval.post_title}
									</li>
								))}
							</ul>
						)}
					</section>
				)}

				{/* Sección: Nuestro equipo */}
				{(titulo_nuestro_equipo || descripcion_nuestro_equipo) && (
					<section className='bg-white rounded-[30px] p-8 max-w-5xl mx-auto'>
						<h2 className='mb-4 text-3xl font-semibold'>{titulo_nuestro_equipo}</h2>
						<div className='mb-6 prose max-w-none' dangerouslySetInnerHTML={{ __html: descripcion_nuestro_equipo }} />
						{staff?.length > 0 && (
							<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
								{staff.map((member, index) => (
									<div key={index} className='text-center'>
										<img
											src={member.foto}
											alt={member.titulo}
											className='object-cover w-32 h-32 mx-auto mb-4 rounded-full'
										/>
										<h3 className='text-xl font-bold'>{member.titulo}</h3>
										<p className='text-sm text-gray-600'>{member.descripcion}</p>
									</div>
								))}
							</div>
						)}
					</section>
				)}
				{titulo_direccion_medica && direccion_medica?.length > 0 && (
					<section className='bg-white rounded-[30px] p-8 max-w-5xl mx-auto mt-12'>
						<h2 className='mb-4 text-3xl font-semibold'>{titulo_direccion_medica}</h2>
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
							{direccion_medica.map((miembro, index) => (
								<div key={index} className='text-center'>
									<img
										src={miembro.foto}
										alt={miembro.titulo}
										className='object-cover w-32 h-32 mx-auto mb-4 rounded-full'
									/>
									<h3 className='text-xl font-bold'>{miembro.titulo}</h3>
									<p className='text-sm text-gray-600'>{miembro.descripcion}</p>
								</div>
							))}
						</div>
					</section>
				)}
			</main>

			<NewsLetter />
			<Footer />
		</>
	);
}
