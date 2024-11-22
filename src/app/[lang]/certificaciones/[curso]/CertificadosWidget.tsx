'use client';
import { FetchSingleProduct } from '@/data/types';
import React from 'react';

// Función para decodificar entidades HTML
const decodeHtmlEntities = (str: string) => {
	const parser = new DOMParser();
	const decodedString = parser.parseFromString(str, 'text/html').body.textContent || '';
	return decodedString;
};

// Palabras clave para identificar los países
const countryKeywords: Record<string, string[]> = {
	Argentina: ['Argentina', 'Buenos Aires', 'Colegio de Médicos', 'Consejo Superior Médico de La Pampa'],
	Ecuador: ['Ecuador', 'Cuenca', 'Facultades Ecuatorianas', 'Asociación Nacional de Médicos Rurales', 'ANAMER'],
	Chile: ['Chile', 'Andros', 'MSK ANDROS OTEC'],
	Colombia: ['Colombia', 'Federación Médica Colombiana', 'FMC'],
	México: ['México', 'Hospital General de México', 'Sociedad Médica del Hospital General de México', 'Saxum University'],
	USA: ['ACC', 'American College of Cardiology'],
	España: ['España', 'European University Gasteiz', 'EUNEIZ', 'Madrid '],
	Perú: ['Perú', 'Sociedad Peruana de Medicina Interna'],
};

const detectCountry = (title: string, description: string): string => {
	for (const [country, keywords] of Object.entries(countryKeywords)) {
		if (keywords.some((keyword) => title.includes(keyword) || description.includes(keyword))) {
			return country;
		}
	}
	return 'Desconocido';
};

interface CertificadosWidgetProps {
	product: FetchSingleProduct;
}

const CertificadosWidget: React.FC<CertificadosWidgetProps> = ({ product }) => {
	// Agrupar los avales por país
	const groupedByCountry = product.avales.reduce<Record<string, typeof product.avales>>((acc, aval) => {
		const country = detectCountry(decodeHtmlEntities(aval.title), decodeHtmlEntities(aval.description));
		if (!acc[country]) {
			acc[country] = [];
		}
		acc[country].push(aval);
		return acc;
	}, {});

	const sortedCountries = Object.entries(groupedByCountry)
		.filter(([country]) => country !== 'USA') // Excluir USA
		.sort(([countryA], [countryB]) => countryA.localeCompare(countryB))
		.map(([country, avales]) => ({
			country,
			avales: avales.sort((a, b) => decodeHtmlEntities(a.title).localeCompare(decodeHtmlEntities(b.title))),
		}));

	// const courses = localStorage.getItem('all-courses');
	// if (!courses) {
	// 	console.log('No hay cursos en el localStorage');
	// 	return; // Salir si no hay datos
	// }

	// let parsedCourses;
	// try {
	// 	// Parsear el string de courses
	// 	const parsedData = JSON.parse(courses);
	// 	console.log(parsedData);

	// 	// Verificar que existe la clave 'value' y que es un array
	// 	if (!parsedData.value || !Array.isArray(parsedData.value)) {
	// 		console.log('No se encontraron cursos en la clave "value" o no es un array', parsedData);
	// 		return; // Salir si no se encuentra el array en 'value'
	// 	}

	// 	parsedCourses = parsedData.value;
	// 	console.log(parsedCourses);
	// } catch (error) {
	// 	console.error('Error al parsear los cursos:', error);
	// 	return; // Salir si no se puede parsear
	// }

	// // Filtrar los cursos donde father_post_type no sea "downloadable"
	// const filteredCourses = parsedCourses.filter((course: any) => course.father_post_type !== 'downloadable');

	// console.log(filteredCourses);

	// // Filtrar solo los cursos de tipo 'course' y extraer el 'slug'
	// const certificateUrls = filteredCourses.map((course: any) => `https://msklatam.com/certificaciones/${course.slug}`);

	// console.log(certificateUrls.join('\n'));

	return (
		<div>
			<h1 className='!font-inter font-semibold text-lg py-4'>{decodeHtmlEntities(product.ficha.title)}</h1>

			<div>
				{sortedCountries.map(({ country, avales }) => (
					<div key={country} className='py-4'>
						<h2 className='font-bold text-lg text-[#6474A6] !font-inter'>{country.toUpperCase()}</h2>
						<ul className='list-disc ml-6'>
							{avales.map((aval) => (
								<li key={aval.id} className='py-2'>
									<h3 className='font-semibold !font-inter text-[#575757] text-base'>{decodeHtmlEntities(aval.title)}</h3>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default CertificadosWidget;
