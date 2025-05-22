'use client';
import '@/app/globals.css';
import ContactForm from '@/components/MSK/ContactForm';
import ContactSidebar from '@/components/MSK/ContactSidebar';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import GenericHeader from '@/modules/generic/components/GenericHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandSlider from './BrandSlider';

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
	const [dataInicio, setDataInicio] = useState<any>([]);

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
	useEffect(() => {
		const fetchDatainicio = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${country}&nocache=1`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setDataInicio(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unknown error occurred');
				console.error('Failed to fetch page data:', err);
			} finally {
				setLoading(false);
			}
		};

		if (country) {
			fetchDatainicio();
		}
	}, [country]);

	const acf = pageData?.acf;

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
				<section className='w-full -mt-[120px] z-[10] relative overflow-visible max-w-[1600px] mx-auto'>
					<div className='mb-4 bg-white rounded-[30px] p-[36px] '>
						<p className='font-lora  pb-2 pt-4 text-base sm:text-lg lg:text-xl text-[#392C35] mx-44'>
							Medical & Scientific Knowledge es un grupo español con más de ocho años de trayectoria en la industria pharma y
							en el desarrollo de cursos de medicina.
						</p>
						<p className='font-lora  py-2 text-base sm:text-lg lg:text-xl text-[#392C35] mx-44'>
							Nuestra misión es satisfacer las necesidades de los profesionales de la salud que buscan estudiar medicina a
							distancia, gestionando sus procesos de capacitación a través de una propuesta dinámica con cursos de
							actualización a la medida de sus posibilidades. Ofrecemos una experiencia exitosa, fluida y de mejora continua.
							Puedes conocer más sobre nuestra misión{' '}
							<Link
								className='text-[#9200AD] underline text-base sm:text-lg lg:text-xl'
								href={country === 'arg' ? `${window.location.origin}/mision` : `${window.location.origin}/${country}/mision`}
								target='_blank'
								rel='noopener noreferrer'
							>
								ingresando aquí
							</Link>
							.
						</p>

						<div className='border border-[#DBDDE2] rounded-3xl mx-44 flex justify-between my-6'>
							{(dataInicio?.sections?.trustsection?.figures || []).map((item, index) => (
								<div key={index} className='flex flex-col px-8 py-6 space-y-4'>
									<p className='text-4xl font-medium font-lora'>{item.figure}</p>
									<p className='font-raleway'>{item.text}</p>
								</div>
							))}
						</div>

						{titulo && (
							<section className='mb-12 mx-44'>
								<h1 className='mb-6 text-4xl font-bold'>{titulo}</h1>
								{imagen && <img src={imagen} alt='Imagen nosotros' className='w-full max-w-4xl mx-auto rounded-xl' />}
							</section>
						)}

						{/* Sección: Convenios */}
						{(titulo_para_convenios || descripcion_de_convenios) && (
							<section className='bg-white rounded-[30px] p-8  mx-36 mb-12'>
								<h2 className='mb-4 text-3xl font-semibold'>{titulo_para_convenios}</h2>
								<div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: descripcion_de_convenios }} />
								{/* {lista_de_avales?.length > 0 && (
									<ul className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3'>
										{lista_de_avales.map((aval) => (
											<li key={aval.ID} className='bg-[#f9fafb] p-4 rounded-lg shadow-sm text-center text-lg'>
												{aval.post_title}
											</li>
										))}
									</ul>
								)} */}
								<div className='my-12 border border-[#DBDDE2] rounded-3xl px-5 py-16 '>
									<BrandSlider brands={dataInicio?.sections?.backups?.institutions} />
								</div>
							</section>
						)}

						{/* Sección: Nuestro equipo */}
						{(titulo_nuestro_equipo || descripcion_nuestro_equipo) && (
							<section className='bg-white rounded-[30px] p-8  mx-44'>
								<h2 className='mb-4 text-3xl font-semibold'>{titulo_nuestro_equipo}</h2>
								<div className='mb-6 prose max-w-none' dangerouslySetInnerHTML={{ __html: descripcion_nuestro_equipo }} />
								{staff?.length > 0 && (
									<div className='grid grid-cols-2 gap-6 '>
										{staff.slice(0, 2).map((member, index) => (
											<div key={index} className='flex justify-between'>
												<div className='flex gap-6'>
													<img src={member.foto} alt={member.titulo} className='object-cover w-32 h-32 rounded-md' />
													<div className='flex flex-col mt-6 space-y-2'>
														<h3 className='text-xl font-medium'>{member.titulo}</h3>
														<p className='font-normal text-gray-600'>{member.descripcion}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</section>
						)}
						{titulo_direccion_medica && direccion_medica?.length > 0 && (
							<section className='bg-white rounded-[30px] p-8  mx-44 mt-12 flex flex-col justify-center'>
								<h2 className='mb-16 text-3xl font-semibold'>{titulo_direccion_medica}</h2>
								<div className='grid grid-cols-2 gap-x-6 gap-y-12'>
									{direccion_medica.map((miembro, index) => (
										<div key={index} className='flex justify-between'>
											<div className='flex gap-6'>
												<img src={miembro.foto} alt={miembro.titulo} className='object-cover w-32 h-32 rounded-md' />
												<div className='flex flex-col mt-4 space-y-2'>
													<h3 className='text-xl font-medium'>{miembro.titulo}</h3>
													<p className='mr-2 font-normal text-gray-600'>{miembro.descripcion}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</section>
						)}
					</div>
				</section>
				<div className='flex justify-center mt-20'>
					<div className='flex justify-between w-[1600px]'>
						<div className='flex flex-col-reverse w-full gap-6 pt-12 overflow-visible lg:flex-row md:py-12  max-w-[1200px]'>
							<div className='w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-6 pt-9 h-full my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1700px] '>
								<h2 className='text-2xl font-medium text-center font-raleway'>¿Te gustaría recibir asesoría académica?</h2>
								<ContactForm hideHeader />
							</div>
						</div>
						<div className='flex flex-col   gap-8 md:py-12 pt-12 overflow-visible max-w-[1600px] md:pl-4  '>
							<div className=' bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-5 pt-9  my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1600px] w-[350px] '>
								<ContactSidebar variant={1} />
							</div>
							<div className='w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-12 pt-9  my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1600px] '>
								<ContactSidebar variant={2} />
							</div>
						</div>
					</div>
				</div>
			</main>

			<NewsLetter />
			<Footer />
		</>
	);
}
