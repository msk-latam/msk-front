'use client';

import Questions from '@/components/Questions/Questions';

import { DataContext } from '@/context/data/DataContext';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { DurationFilter, FetchCourseType, Profession, ResourceFilter, Specialty } from '@/data/types';
import { pageHomeWpContent } from '@/lib/allData';
import { removeAccents } from '@/lib/removeAccents';
import { useSearchParams } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { FAQS } from '../../page';

import TiendaHeader from './TiendaHeader';
import TiendaProductos from './TiendaProductos';
import ssr from '@/services/ssr';
import { getJSONByCountry } from '@/app/products';

interface TiendaProps {
	category: string;
	country: string | undefined;
}

const Tienda: FC<TiendaProps> = ({ category, country }) => {
	const { state: dataState } = useContext(DataContext);
	const { storeCourses, allStoreProfessions } = dataState;
	const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);
	const [courses, setCourses] = useState<any[]>([]);
	const searchParams = useSearchParams();
	let JSONProduct: any;
	const fetchProducts = async () => {
		try {
			JSONProduct = await getJSONByCountry(country);
			return JSONProduct;
		} catch (error) {
			console.error('Error al obtener los productos:', error);
			return { products: [] }; // Evita fallos si JSONProduct es undefined
		}
	};

	// Llamada a la función
	fetchProducts().then((JSONProduct) => {
		console.log(JSONProduct);
	});

	useEffect(() => {
		const fetchCourses = async () => {
			const coursesData = await ssr.getAllCourses(country);
			setCourses(JSONProduct.products);
		};

		fetchCourses();
	}, [country]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
	const itemsPerPage = 18;

	function resetPage() {
		setCurrentPage(1);
		//Remove parameter "page" from the url
		if (typeof window !== 'undefined') {
			const url = new URL(window.location.href);
			url.searchParams.delete('page');
			window.history.pushState({}, '', url);
		}
	}

	let { storeFilters, addFilter, removeFilter, updateFilter, clearSpecialties } = useStoreFilters();

	// useEffect(() => {
	// 	const filterCourses = () => {
	// 		let filteredCourses = courses;

	// 		// Filtra por categoría
	// 		console.log(filteredCourses);
	// 		if (category && courses) {
	// 			filteredCourses = courses.filter((course: any) => course.categories.some((cat: any) => cat.slug === category));
	// 		}

	// 		filteredCourses = filteredCourses.filter((course: any) => course.father_post_type === 'course');

	// 		setCurrentItems(filteredCourses);
	// 	};

	// 	filterCourses();
	// 	console.log(filterCourses);
	// }, [category, country, courses, currentPage]);

	useEffect(() => {
		const filterCourses = () => {
			if (!courses.length) return; // Salir si courses está vacío

			let filteredCourses = courses;

			// Filtrar por categoría
			if (category) {
				filteredCourses = filteredCourses.filter((course: any) =>
					course.categories.some((cat: any) => cat.slug === category),
				);
			}

			// Filtrar por tipo de curso
			filteredCourses = filteredCourses.filter((course: any) => course.father_post_type === 'course');

			setCurrentItems(filteredCourses); // Actualizar los cursos filtrados
		};

		filterCourses();
	}, [category, courses]);

	const onChangeProfession = (profession: Profession) => {
		resetPage();
		const professionExists = storeFilters.professions.filter((item: Profession) => {
			return item.slug == profession.slug;
		});
		if (professionExists.length) removeFilter('professions', profession);
		else addFilter('professions', profession);
	};

	const onChangeResource = (resource: ResourceFilter, action: string) => {
		resetPage();
		// console.log('onChangeResource running');
		// console.log('Resource', resource);
		if (action !== 'add') {
			removeFilter('resources', resource);
		} else addFilter('resources', resource);
	};

	const onChangeDuration = (duration: DurationFilter, action: string) => {
		resetPage();
		// console.log('Duration', duration);
		if (action !== 'add') {
			removeFilter('duration', duration);
		} else addFilter('duration', duration);
	};

	// const triggerSearch = (event: any) => {
	// 	if (event) {
	// 		const filteredProducts = currentItems.filter((product: any) =>
	// 			removeAccents(product.title.toLowerCase()).includes(removeAccents(event.toLowerCase())),
	// 		);
	// 		// console.log('SEARCH TRIGGERED', event, {
	// 		//   filteredProducts,
	// 		// });

	// 		setCurrentItems(filteredProducts);
	// 	} else {
	// 		let filteredByCategory = storeCourses;

	// 		if (category) {
	// 			filteredByCategory = storeCourses.filter((course: any) =>
	// 				course.categories.some((cat: any) => cat.slug === category),
	// 			);
	// 		}

	// 		setCurrentItems(filteredByCategory);
	// 	}
	// };

	const generateSlug = (name: string) => {
		return name
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '');
	};
	let specialties: Specialty[] = useStoreFilters().specialties;

	const matchedSpecialty = specialties.find((specialty) => generateSlug(specialty.name) === category);

	const listaDeCedentes = currentItems.flatMap((item: any) => item.lista_de_cedentes || []);
	const cedentesTitulos = Array.from(new Set(listaDeCedentes.map((cedente: any) => cedente.post_title))).join(', ');

	let content = {
		texto: 'Preguntas Frecuentes',
		items: [
			{
				titulo: `¿Quiénes desarrollan los cursos de ${matchedSpecialty?.name || 'esta especialidad'}?`,
				parrafo: `<p>Estos cursos tienen como cedentes a: ${cedentesTitulos}</p>`,
			},
			{
				titulo: '¿Quienes pueden realizarlo?',
				parrafo:
					'<p>Nuestros cursos están orientados al personal médico, personal de enfermería, auxiliares y otros profesionales de la salud.</p>',
			},
			{
				titulo: `¿Cómo es la modalidad de aprendizaje?`,
				parrafo: `<p>¡Es 100% a distancia! Realizar los cursos de ${
					matchedSpecialty?.name || 'esta especialidad'
				} en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
			},
			{
				titulo: `¿Cuántas horas de duración estimada tienen los cursos de ${matchedSpecialty?.name || 'esta especialidad'}?`,
				parrafo: `<p>Nuestros cursos tienen una duración estimada de entre 50 a 600 horas. </p>`,
			},
			{
				titulo: `¿Cuánto tiempo están disponibles para cursar? `,
				parrafo: `<p>Los cursos están disponibles de 12 a 18 meses, dependiendo de cada uno.</p>`,
			},
		],
	};

	return (
		<>
			<TiendaHeader category={category} />

			<TiendaProductos category={category} country={country} />

			<Questions content={content as FAQS} />
		</>
	);
};

export default Tienda;
