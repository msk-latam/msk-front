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
	country: string;
}

const CertificadosWidget: React.FC<CertificadosWidgetProps> = ({ product, country }) => {
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

	const courses = localStorage.getItem('all-courses');
	if (!courses) {
		// console.log('No hay cursos en el localStorage');
		return; // Salir si no hay datos
	}

	let parsedCourses;
	try {
		// Parsear el string de courses
		const parsedData = JSON.parse(courses);
		// console.log(parsedData);

		// Verificar que existe la clave 'value' y que es un array
		if (!parsedData.value || !Array.isArray(parsedData.value)) {
			// console.log('No se encontraron cursos en la clave "value" o no es un array', parsedData);
			return; // Salir si no se encuentra el array en 'value'
		}

		parsedCourses = parsedData.value;
		// console.log(parsedCourses);
	} catch (error) {
		console.error('Error al parsear los cursos:', error);
		return; // Salir si no se puede parsear
	}

	// Filtrar los cursos donde father_post_type no sea "downloadable"
	const filteredCourses = parsedCourses.filter(
		(course: any) =>
			course.father_post_type !== 'downloadable' && course.regular_price !== '0' && course.cantidad_modulos !== 0,
	);

	// console.log(filteredCourses);

	const linksCursos = filteredCourses.map((course: any) => `https://msklatam.com/curso/${course.slug}`);
	const precioCursos = filteredCourses.map((course: any) => `Precio Total ${course.regular_price}`);
	const cuotasCursos = filteredCourses.map((course: any) => `Precio Cuotas ${course.price_installments}`);
	const modulosCursos = filteredCourses.map((course: any) => `Cantidad de modulos ${course.cantidad_modulos}`);
	const titleCursos = filteredCourses.map((course: any) => `Titulo ${course.title}`);
	const horasCursos = filteredCourses.map((course: any) => `Horas ${course.duration}`);
	const descriptionCursos = filteredCourses.map((course: any) => {
		const tempElement = document.createElement('div');
		tempElement.innerHTML = course.why_course;
		return `Descripcion ${tempElement.innerText.trim()}`;
	});
	const categoriasCursos = filteredCourses.flatMap((course: any) => course.categories.map((category: any) => category.name));

	const cursosOrganizados = filteredCourses.map((course: any) => {
		// console.log(course);
		// Extraer descripción sin etiquetas HTML
		const tempElement = document.createElement('div');
		tempElement.innerHTML = course.why_course;
		const descripcion = tempElement.innerText.trim();

		// Extraer nombres de categorías
		const categorias = course.categories.map((category: any) => category.name).join(', ');

		// Construir el texto del curso con formato mejorado
		return `Título: ${course.title} \nLink: https://msklatam.com/curso/${course.slug} \nPrecio Total: ${course.regular_price} \nPrecio Cuotas: ${course.price_installments} \nCantidad de Módulos: ${course.cantidad_modulos} \nHoras: ${course.duration} \nCategorías: ${categorias} \nDescripción: \n${descripcion}`.trim();
	});

	// Unir todos los textos con un separador entre cada bloque
	const textoFinal = cursosOrganizados.join(
		'\n\n-------------------------------------------------------------------------------------------------------------------------------\n\n',
	);

	const countryMapping = {
		ar: 'Argentina',
		bo: 'Bolivia',
		br: 'Brasil',
		cl: 'Chile',
		co: 'Colombia',
		cr: 'Costa Rica',
		cu: 'Cuba',
		do: 'República Dominicana',
		ec: 'Ecuador',
		sv: 'El Salvador',
		gt: 'Guatemala',
		hn: 'Honduras',
		mx: 'México',
		ni: 'Nicaragua',
		pa: 'Panamá',
		py: 'Paraguay',
		pe: 'Perú',
		pr: 'Puerto Rico',
		uy: 'Uruguay',
		ve: 'Venezuela',
	};
	function getFullCountryName(code) {
		return countryMapping[code.toLowerCase()] || 'País desconocido';
	}
	// console.log(` País: ${getFullCountryName(country)}\n\n`, textoFinal);

	// console.log(linksCursos.join('\n'));
	// console.log(precioCursos.join('\n'));
	// console.log(cuotasCursos.join('\n'));
	// console.log(modulosCursos.join('\n'));
	// console.log(titleCursos.join('\n'));
	// console.log(horasCursos.join('\n'));
	// console.log(descriptionCursos.join('\n'));
	// console.log(categoriasCursos.join('\n'));

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
