'use client';
import InfoPageHeader from '@/components/InfoPageHeader/InfoPageHeader';
import SingleContent from '@/components/MSK/Privacy/SingleContent';
import { SinglePageType } from '@/data/types';
import React from 'react';

const CertificacionesPage = () => {
	const SINGLE: SinglePageType = {
		id: 'eae0212192f63287e0c212',
		featuredImage: '/webp-images/misc/certificado.png',
		title: 'Certificados digitales',
		desc: 'Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional.',
		date: 'May 20, 2021',
		href: '/single/this-is-single-slug',
		commentCount: 14,
		viewdCount: 2378,
		readingTime: 6,
		bookmark: { count: 3502, isBookmarked: false },
		like: { count: 773, isLiked: true },
		author: {
			id: 10,
			firstName: 'Mimi',
			lastName: 'Fones',
			displayName: 'Fones Mimi',
			email: 'mfones9@canalblog.com',
			avatar: '',
			count: 38,
			href: '/author/the-demo-author-slug',
			desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
			jobName: 'Author Job',
		},
		articles: [],
		categories: [
			{
				id: 1,
				name: 'Garden',
				href: '/archive/the-demo-archive-slug',
				thumbnail:
					'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
				count: 13,
				color: 'pink',
				taxonomy: 'category',
			},
			{
				id: 2,
				name: 'Jewelry',
				href: '/archive/the-demo-archive-slug',
				thumbnail:
					'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
				count: 16,
				color: 'red',
				taxonomy: 'category',
			},
		],
		postType: 'standard',
		tags: [],
		content: '',
		comments: [],
	};

	const data: Partial<SinglePageType> = {
		content: `
        <i>
<strong>
Un nuevo estándar en la validación académica
</strong>
</i>
<br />
<br />

En MSK, creemos que una capacitación de calidad no termina al finalizar un curso. También se expresa en cómo se acredita ese conocimiento. Por eso, a partir de 2025, sumamos un nuevo atributo que potencia tu experiencia académica: <strong>
certificados digitales con tecnología blockchain.
</strong> 
<br />
<br />

Este avance marca un diferencial en nuestra propuesta institucional, alineada con los principios de innovación, accesibilidad y excelencia que nos definen. Conoce más 
<a href="/nosotros" target="_blank" rel="noopener noreferrer">
sobre nosotros</a>
 y 
 <a href="/mision" target="_blank" rel="noopener noreferrer">
 nuestra misión educativa.</a>
<br />

<h3>
Qué es la tecnología blockchain y por qué la usamos
</h3>

<br />

Blockchain es una tecnología de registro digital que permite almacenar datos de forma segura, inviolable y transparente. Cada certificado emitido con esta tecnología puede verificarse online y no puede ser modificado ni falsificado.
<br />
<br />

Esto garantiza la validez internacional de tu capacitación y te permite compartir tus logros de manera confiable con instituciones, empleadores y redes profesionales como LinkedIn.
<br />
<h3>
Qué incluye tu certificado digital
</h3>
<ul style="list-style: disc; padding-left: 1.5rem;">
    <li>• Nombre y apellido</li>
    <li>• Título del curso aprobado</li>
    <li>• Fecha de finalización</li>
    <li>• Instituciones que avalan la capacitación</li>
    <li>• Código QR de validación</li>
  </ul>
<br />

<div>
    <img src="/webp-images/misc/certification.png" alt="Certificación" style="width: 100%; " />
  </div>

Mira un cerificado digital modelo. <a href="https://app.certika.co/certificate/OTgyMTg=" target="_blank" rel="noopener noreferrer">Haz click aquí.</a>
<br />
<h3>
Cómo obtener tu certificado digital
</h3>
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
 <a href="https://ayuda.msklatam.com/portal/es/kb/articles/mi-certificado-con-tecnologia-blockchain" target="_blank" rel="noopener noreferrer">
Mi certificado con tecnología blockchain</a>
 | <a href="https://ayuda.msklatam.com/portal/es/kb/articles/obtener-mi-certificado" target="_blank" rel="noopener noreferrer">
 Obtener mi certificado</a>
<br />
<br />

`,
	};
	return (
		<>
			<div className={`nc-PageSingleTemp3Sidebar  animate-fade-down  px `} data-nc-id='PageSingleTemp3Sidebar'>
				<InfoPageHeader pageData={SINGLE} />

				{/* SINGLE MAIN CONTENT */}
				<div className='flex flex-col my-10 lg:flex-row px'>
					<div className='w-full px-4 sm:px-6 lg:px-8'>
						<SingleContent data={data as SinglePageType} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CertificacionesPage;
