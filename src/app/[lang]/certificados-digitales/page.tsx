'use client';
import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import GenericHeader from '@/modules/generic/components/GenericHeader';
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

	const country = params.slug ?? 'ar';

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`https://cms1.msklatam.com/wp-json/msk/v1/page/condiciones-de-contratacion?lang=${country}`,
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data: PageData = await response.json();
				setPageData(data);
				console.log(data);
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

	// Display values, use placeholders if loading or error
	const displayTitle = loading || error ? initialPageData.title : pageData?.post_title || 'Título no disponible';
	// const displayContent = loading
	// 	? '<p>Cargando contenido...</p>'
	// 	: error
	// 	? `<p>Error al cargar el contenido: ${error}</p>`
	// 	: pageData?.post_content || '<p>Contenido no disponible.</p>';

	const displayContent = `
        
<strong style="font-size: 24px">
Un nuevo estándar en la validación académica
</strong>

<br />
<br />

En MSK, creemos que una capacitación de calidad no termina al finalizar un curso. También se expresa en cómo se acredita ese conocimiento. Por eso, a partir de 2025, sumamos un nuevo atributo que potencia tu experiencia académica: <strong>
certificados digitales con tecnología blockchain.
</strong> 
<br />
<br />

Este avance marca un diferencial en nuestra propuesta institucional, alineada con los principios de innovación, accesibilidad y excelencia que nos definen. Conoce más 
<a href="/nosotros" target="_blank" rel="noopener noreferrer" style="color: #9200AD;"
>
sobre nosotros</a>
 y 
 <a href="/mision" target="_blank" rel="noopener noreferrer" style="color: #9200AD;">
 nuestra misión educativa.</a>

 <br /><br />

<h3 style="font-size: 24px">
Qué es la tecnología blockchain y por qué la usamos
</h3>
<br />
<br />

Blockchain es una tecnología de registro digital que permite almacenar datos de forma segura, inviolable y transparente. Cada certificado emitido con esta tecnología puede verificarse online y no puede ser modificado ni falsificado.
<br />
<br />

Esto garantiza la validez internacional de tu capacitación y te permite compartir tus logros de manera confiable con instituciones, empleadores y redes profesionales como LinkedIn.
<br />
<br />
<h3 style="font-size: 24px">
Qué incluye tu certificado digital
</h3>
<br />
<ul style="list-style: disc; padding-left: 1.5rem;">
    <li>Nombre y apellido</li>
    <li>Título del curso aprobado</li>
    <li>Fecha de finalización</li>
    <li>Instituciones que avalan la capacitación</li>
    <li>Código QR de validación</li>
  </ul>
<br />

<div>
    <img src="/misc/certification.png" alt="Certificación" style="width: 100%; " />
  </div>
<br />
Mira un cerificado digital modelo. <a href="https://app.certika.co/certificate/OTgyMTg=" target="_blank" rel="noopener noreferrer" style="color: #9200AD;">Haz click aquí.</a>
<br />
<br />
<h3 style="font-size: 24px">
Cómo obtener tu certificado digital
</h3>
<br />
<br />


Para acceder a tu certificado digital de MSK con tecnología blockchain, necesitas cumplir <strong>
tres requisitos:
</strong>
<br />
<br />
<ol>
<li><strong>
1. Finalizar la cursada
</strong>
 del programa elegido.</li>
<li><strong>
2. Aprobar todas las evaluaciones obligatorias
</strong>
 establecidas para obtener el certificado.</li>
<li><strong>
3. Haber abonado el 100% del valor total
</strong>
 de la capacitación.</li>
</ol>

<br />

Una vez cumplidos, recibirás tu certificado digital por correo, listo para descargar, imprimir o compartir en línea.
<br />
<br />

Accede a estos artículos del Centro de ayuda para más información.
<br />
 <a href="https://ayuda.msklatam.com/portal/es/kb/articles/mi-certificado-con-tecnologia-blockchain" target="_blank" rel="noopener noreferrer" style="color: #9200AD;">
Mi certificado con tecnología blockchain</a>
 | <a href="https://ayuda.msklatam.com/portal/es/kb/articles/obtener-mi-certificado" target="_blank" rel="noopener noreferrer" style="color: #9200AD;">
 Obtener mi certificado</a>
<br />
<br />

`;

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
				<GenericHeader title={'Certificados digitales'} description={initialPageData.description} />
			</header>

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20  md:mb-0'>
				<section className='w-full -mt-[40px] z-[10] relative overflow-visible max-w-[1720px] mx-auto'>
					<div className='mb-4 bg-white rounded-[30px] p-[36px]'>
						{/* Render the HTML content from the API */}
						<div className='mx-32 mt-12 space-y-5 text-xl' dangerouslySetInnerHTML={{ __html: displayContent }} />
					</div>
				</section>
			</main>

			{/* <NewsLetter /> */}
			<Footer />
		</>
	);
}
