import { API_URL, IP_API, NOTE_SPECIALITIES, baseUrl } from '@/data/api';
import { countries } from '@/data/countries';
import { setAllCourses, setLoadingBestSellers, setLoadingCourses, setStoreCourses } from '@/lib/allData';
import { FetchSingleProduct, SignUp, UserProfile } from '@/data/types';
import { BASE_URL, IS_PROD, SITE_URL } from '@/contains/constants';
import { BodyNewPassword } from '@/components/MSK/PageNewPassword';
import { notFound } from 'next/navigation';
import { getJSONByCountry } from '@/app/products';

let validCountries = countries.map((item) => item.id);

const PROD = IS_PROD;

const apiProfileUrl = `${BASE_URL}/api/profile`;

class ApiSSRService {
	token = typeof window !== 'undefined' ? localStorage.getItem('tokenLogin') : null;

	async getCountryCode() {
		try {
			const ipResponse = await fetch('https://api.ipify.org/?format=json');
			const ipData = await ipResponse.json();
			const ip = ipData.ip;

			let response;
			if (PROD) {
				response = await fetch(`${IP_API}?ip=${ip}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
			} else {
				response = await fetch(`https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`);
			}

			if (!response.ok) {
				throw new Error(`Failed to fetch country code. HTTP status ${response.status}`);
			}

			const data = await response.json();

			if (PROD) {
				return data.data;
			}

			return data.countryCode ? data.countryCode.toLowerCase() : '';
		} catch (error) {
			console.error('Network error:', error);
			return '';
		}
	}

	// async getAllCourses(country?: string, tag?: string, withAll: boolean = false, currentUrl = '') {
	// 	setLoadingCourses(true);

	// 	// Validar países
	// 	let validCountries = countries.map((item) => item.id);
	// 	let onValidCountry = country && validCountries.includes(country);
	// 	const countryParam = onValidCountry ? `&country=${country}` : '&country=int';

	// 	// Obtener el tag de la URL si no se pasa como argumento
	// 	if (!tag) {
	// 		let tagFromURL = new URLSearchParams(currentUrl).get('tag');
	// 		tag = tagFromURL ? tagFromURL : '';
	// 	}
	// 	let tagParam = tag ? `&tag=${tag}` : '';
	// 	const withAllParam = withAll ? '&filter=all' : '';

	// 	// const queryParams = [countryParam, tagParam, withAllParam].filter(Boolean).join('');
	// 	const queryParams = [countryParam, withAllParam].filter(Boolean).join('');

	// 	const cacheKey = 'all-courses';
	// 	// const TTL = 2 * 60 * 60 * 1000; // 24 horas
	// 	const TTL = 0; // 24 horas

	// 	try {
	// 		// Verificar si estamos en un entorno donde `window` está disponible
	// 		const isServer = typeof window === 'undefined';

	// 		if (!isServer) {
	// 			// Verificar si ya tenemos datos guardados en `localStorage`
	// 			const cachedData = localStorage.getItem(cacheKey);
	// 			if (cachedData) {
	// 				const { value, timestamp } = JSON.parse(cachedData);
	// 				const now = new Date().getTime();

	// 				if (now - timestamp < TTL) {
	// 					console.log(`getallcourses obtenidos de localStorage para ${cacheKey}`);
	// 					setAllCourses(value);
	// 					setLoadingCourses(false);
	// 					return value;
	// 				}
	// 			}
	// 		}

	// 		// Si no hay datos válidos en `localStorage`, hacer la llamada a la API

	// 		const response = await fetch(`${API_URL}/products?limit=-1${queryParams}&asd=tes2`);

	// 		if (!response.ok) {
	// 			throw new Error(`Failed to fetch courses. HTTP status ${response.status}`);
	// 		}

	// 		const data = await response.json();

	// 		// Guardar los datos en `localStorage`
	// 		if (!isServer) {
	// 			localStorage.setItem(
	// 				cacheKey,
	// 				JSON.stringify({
	// 					value: data.products,
	// 					timestamp: new Date().getTime(),
	// 				}),
	// 			);
	// 			console.log(`getallcourses obtenidos de la API para ${cacheKey}`);
	// 		}

	// 		setAllCourses(data.products);
	// 		setLoadingCourses(false);
	// 		return data.products;
	// 	} catch (error) {
	// 		console.error('Network error:', error);
	// 		setLoadingCourses(false);
	// 		return error;
	// 	}
	// }
	// async getAllCourses1(country?: string, tag?: string, withAll: boolean = false, currentUrl = '') {
	// 	setLoadingCourses(true);

	// 	// Validar países
	// 	let validCountries = countries.map((item) => item.id);
	// 	let onValidCountry = country && validCountries.includes(country);
	// 	const countryParam = onValidCountry ? `&country=${country}` : '&country=int';

	// 	// Obtener el tag de la URL si no se pasa como argumento
	// 	if (!tag) {
	// 		let tagFromURL = new URLSearchParams(currentUrl).get('tag');
	// 		tag = tagFromURL ? tagFromURL : '';
	// 	}
	// 	let tagParam = tag ? `&tag=${tag}` : '';
	// 	const withAllParam = withAll ? '&filter=all' : '';
	// 	const queryParams = [countryParam, withAllParam].filter(Boolean).join('');

	// 	const cacheKey = 'all-courses';
	// 	const countryCacheKey = 'current-country';
	// 	const TTL = 0; // Ajusta el TTL si deseas usar caché por tiempo

	// 	try {
	// 		// Verificar si estamos en un entorno donde `window` está disponible
	// 		const isServer = typeof window === 'undefined';

	// 		if (!isServer) {
	// 			// Obtener país almacenado en `localStorage`
	// 			const cachedCountry = localStorage.getItem(countryCacheKey);

	// 			// Si el país es diferente, limpiar caché y guardar el nuevo país
	// 			if (cachedCountry !== country) {
	// 				console.log(`Cambio de país detectado: ${cachedCountry} -> ${country}`);
	// 				localStorage.removeItem(cacheKey);
	// 				localStorage.setItem(countryCacheKey, country || 'int');
	// 			} else {
	// 				// Verificar si ya tenemos datos guardados en `localStorage`
	// 				const cachedData = localStorage.getItem(cacheKey);
	// 				if (cachedData) {
	// 					const { value, timestamp } = JSON.parse(cachedData);
	// 					const now = new Date().getTime();

	// 					if (now - timestamp < TTL) {
	// 						console.log(`getAllCourses obtenidos de localStorage para ${cacheKey}`);
	// 						setAllCourses(value);
	// 						setLoadingCourses(false);
	// 						return value;
	// 					}
	// 				}
	// 			}
	// 		}

	// 		// Si no hay datos válidos en `localStorage`, hacer la llamada a la API
	// 		const response = await fetch(`${API_URL}/products?limit=-1${queryParams}
	// 			`);

	// 		if (!response.ok) {
	// 			throw new Error(`Failed to fetch courses. HTTP status ${response.status}`);
	// 		}

	// 		const data = await response.json();

	// 		// Guardar los datos en `localStorage`
	// 		if (!isServer) {
	// 			localStorage.setItem(
	// 				cacheKey,
	// 				JSON.stringify({
	// 					value: data.products,
	// 					timestamp: new Date().getTime(),
	// 				}),
	// 			);
	// 			console.log(`getAllCourses obtenidos de la API para ${cacheKey}`);
	// 		}

	// 		setAllCourses(data.products);
	// 		setLoadingCourses(false);
	// 		return data.products;
	// 	} catch (error) {
	// 		console.error('Network error:', error);
	// 		setLoadingCourses(false);
	// 		return error;
	// 	}
	// }

	async getAllCourses(country?: string): Promise<void> {
		const JSONProduct = getJSONByCountry(country);
		setLoadingCourses(true); // Iniciar indicador de carga

		try {
			// Validar país y determinar el archivo correspondiente
			const validCountries = countries.map((item) => item.id);
			const countryFile = validCountries.includes(country || '') ? `${country}.json` : `int.json`;

			// Construir la URL para el archivo JSON
			// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
			// const fileUrl = `/products/${countryFile}`;
			// const response = await fetch(`/app/products/${country || 'int'}.json`);
			const response = JSONProduct;
			// Obtener los datos desde el archivo JSON
			// const response = await fetch(fileUrl);
			// console.log(response);

			// if (!response.ok) {
			// 	throw new Error(`No se pudo cargar el archivo ${countryFile}. Código de estado: ${response.status}`);
			// }

			// const data = await response.json();

			// console.log(data);
			setAllCourses(response);
			return response;
		} catch (error) {
			console.error('Error al cargar los cursos:', error);
			setAllCourses([]); // Si hay un error, establece una lista vacía
		} finally {
			setLoadingCourses(false); // Detener indicador de carga
		}
	}

	// async getStoreCourses1(country?: string, currentUrl = '') {
	// 	setLoadingCourses(true);

	// 	// Validar países
	// 	let validCountries = countries.map((item) => item.id);
	// 	let onValidCountry = country && validCountries.includes(country);

	// 	const countryParam = onValidCountry ? `&country=${country}` : '&country=int';

	// 	// Obtener el tag de la URL
	// 	let tagParam = '';
	// 	const tag = new URLSearchParams(window.location.search).get('tag');
	// 	if (tag) {
	// 		tagParam = `&tag=${tag}`;
	// 	}

	// 	// Crear clave única para almacenamiento
	// 	const queryParams = [countryParam, tagParam].filter(Boolean).join('');
	// 	const cacheKey = `store-courses-${country}-${tag}`;
	// 	const TTL = 0; // 24 horas
	// 	// const TTL = 2 * 60 * 60 * 1000; // 24 horas

	// 	try {
	// 		// Verificar si estamos en un entorno donde `window` está disponible
	// 		const isServer = typeof window === 'undefined';

	// 		if (!isServer) {
	// 			// Verificar si ya tenemos datos guardados en `localStorage`
	// 			const cachedData = localStorage.getItem(cacheKey);
	// 			if (cachedData) {
	// 				const { value, timestamp } = JSON.parse(cachedData);
	// 				const now = new Date().getTime();

	// 				// Verificar si los datos son válidos según el TTL
	// 				if (now - timestamp < TTL) {
	// 					console.log(`store courses obtenidos de localStorage para ${cacheKey}`);
	// 					setStoreCourses(value);
	// 					setLoadingCourses(false);
	// 					return value;
	// 				}
	// 			}
	// 		}

	// 		const response = await fetch(`${API_URL}/products?limit=-1`);

	// 		if (!response.ok) {
	// 			throw new Error(`Failed to fetch courses. HTTP status ${response.status}`);
	// 		}

	// 		const data = await response.json();

	// 		if (!isServer) {
	// 			localStorage.setItem(
	// 				cacheKey,
	// 				JSON.stringify({
	// 					value: data.products,
	// 					timestamp: new Date().getTime(),
	// 				}),
	// 			);
	// 			console.log(`storecourses obtenidos de la API para ${cacheKey}`);
	// 		}

	// 		setStoreCourses(data.products);
	// 		setLoadingCourses(false);
	// 		return data.products;
	// 	} catch (error) {
	// 		console.error('Network error:', error);
	// 		setLoadingCourses(false);
	// 		return error;
	// 	}
	// }

	async getStoreCourses(country?: string): Promise<void> {
		setLoadingCourses(true); // Asegúrate de que esta función esté definida en el contexto
		const JSONProduct = getJSONByCountry(country);

		try {
			// Lista de países válidos
			let validCountries = countries.map((item) => item.id);
			// Seleccionar el archivo JSON según el país
			const countryFile = validCountries.includes(country || '') ? `${country}.json` : `int.json`;

			// Intentar cargar el archivo JSON
			// const response = await fetch(`/api/products/${country || 'int'}`);
			// console.log(response);
			// if (!response.ok) {
			// 	throw new Error(`Failed to fetch JSON file. HTTP status ${response.status}`);
			// }

			// // Parsear los datos JSON
			// const data = await response.json();
			// console.log(data);

			// // Actualizar el estado con los productos
			// setStoreCourses(data.products); // Asegúrate de que esta función esté definida
			const response = JSONProduct;
			// Obtener los datos desde el archivo JSON
			// const response = await fetch(fileUrl);
			// console.log(response);

			// if (!response.ok) {
			// 	throw new Error(`No se pudo cargar el archivo ${countryFile}. Código de estado: ${response.status}`);
			// }

			// const data = await response.json();

			// console.log(data);
			setAllCourses(response);
			return response;
		} catch (error) {
			console.error('Error al cargar los datos:', error);
			setStoreCourses([]); // Asegúrate de que esta función esté definida
		} finally {
			setLoadingCourses(false); // Asegúrate de que esta función esté definida
		}
	}

	async getBestSellers(country?: string, tag?: string) {
		setLoadingBestSellers(true);

		try {
			let countryParam = 'int';
			let validCountries = countries.map((item) => item.id);

			if (country && validCountries.includes(country)) {
				countryParam = `${country}`;
			}
			const baseURL = typeof window !== 'undefined' ? window.location.origin : 'https://msklatam.tech';

			const response = await fetch(`${baseURL}/bestSellers/${countryParam}.json`);

			// console.log('getBestSellers URL', `${API_URL}/home/best-sellers?country=${countryParam}`);
			// const response = await fetch(`${API_URL}/home/best-sellers?country=${countryParam}`);
			// const response = await fetch(`http://localhost:3000/bestSellers/${countryParam}.json`);

			if (!response.ok) {
				throw new Error(`Failed to fetch best sellers. HTTP status ${response.status}`);
			}

			const data = await response.json();

			// console.log(data.products);

			setLoadingBestSellers(false);

			return data.products;
		} catch (error) {
			setLoadingBestSellers(false);
			console.error('Network error:', error);
			return error;
		}
	}

	// async getPosts(country?: string) {
	// 	try {
	// 		let currentYear = new Date().getFullYear();
	// 		let validCountries = countries.map((item) => item.id);
	// 		let countryParam = 'int';

	// 		if (country && validCountries.includes(country)) {
	// 			countryParam = `${country}`;
	// 		}

	// 		const postsList: any[] = [];

	// 		// Solicitud para el año actual
	// 		let response = await fetch(`${API_URL}/posts?year=${currentYear}&country=${countryParam}&limit=-1`);

	// 		if (!response.ok) {
	// 			throw new Error(`Failed to fetch posts for ${currentYear}. HTTP status ${response.status}`);
	// 		}

	// 		let data = await response.json();
	// 		console.log(data.posts);

	// 		if (data.posts && data.posts.length > 0) {
	// 			const currentYearPosts = data.posts.map((post: any) => ({
	// 				...post,
	// 				image: post.thumbnail,
	// 			}));
	// 			postsList.push(...currentYearPosts);
	// 		} else {
	// 			console.log(`No posts found for ${currentYear}.`);
	// 		}

	// 		// Solicitud para el año anterior
	// 		response = await fetch(`${API_URL}/posts?year=${currentYear - 1}&country=${countryParam}&limit=-1`);

	// 		if (!response.ok) {
	// 			throw new Error(`Failed to fetch posts for ${currentYear - 1}. HTTP status ${response.status}`);
	// 		}

	// 		data = await response.json();

	// 		if (data.posts && data.posts.length > 0) {
	// 			const previousYearPosts = data.posts.map((post: any) => ({
	// 				...post,
	// 				image: post.thumbnail,
	// 			}));
	// 			postsList.push(...previousYearPosts);
	// 		} else {
	// 			console.log(`No posts found for ${currentYear - 1}.`);
	// 		}

	// 		// console.log(postsList, 'Final combined posts list');

	// 		return postsList;
	// 	} catch (error) {
	// 		console.error('Network error:', error);
	// 		return [];
	// 	}
	// }

	async getPosts(country?: string) {
		try {
			const currentYear = new Date().getFullYear();
			const validCountries = countries.map((item) => item.id);
			const countryParam = country && validCountries.includes(country) ? `${country}` : 'int';
			const startYear = 2023; // Año inicial
			const postsList: any[] = [];

			for (let year = currentYear; year >= startYear; year--) {
				const response = await fetch(`${API_URL}/posts?year=${year}&country=${countryParam}&limit=-1`);

				if (!response.ok) {
					console.warn(`Failed to fetch posts for ${year}. HTTP status ${response.status}`);
					continue; // Pasar al siguiente año si hay un error
				}

				const data = await response.json();

				const postDate = data?.posts[0].date;
				// console.log(postDate);

				if (data.posts && data.posts.length > 0) {
					const yearPosts = data.posts.map((post: any) => ({
						...post,
						image: post.thumbnail,
					}));
					postsList.push(...yearPosts);
				} else {
					console.log(`No posts found for ${year}.`);
				}
			}

			return postsList;
		} catch (error) {
			console.error('Network error:', error);
			return [];
		}
	}

	async getSingleProduct(slug: string, country: string) {
		try {
			const response = await fetch(`${API_URL}/product/${slug}?country=${country}`);
			console.log(`${API_URL}/product/${slug}?country=${country}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch single product. HTTP status ${response.status}`);
			}

			const data = await response.json();
			console.log(data.featured_product_text);

			return { product: data };
		} catch (error) {
			console.error('Network error:', error);
			notFound();
			return { error };
		}
	}

	async getSinglePost(slug: string, country: string) {
		// console.log({ slug, country }, `${API_URL}/posts/${slug}?country=${country}`);
		try {
			const response = await fetch(`${API_URL}/posts/${slug}?country=${country}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch single post. HTTP status ${response.status}`);
			}

			const data = await response.json();
			return data.posts;
		} catch (error) {
			console.error('Network error:', error);
			return { error };
		}
	}

	async fetchPostsSpecialities(): Promise<{
		fiveSpecialtiesGroup: any;
		allSpecialtiesGroup: any;
	}> {
		try {
			const response = await fetch(NOTE_SPECIALITIES);

			if (!response.ok) {
				throw new Error(`Failed to fetch post specialties. HTTP status ${response.status}`);
			}

			const data = await response.json();
			const allSpecialtiesGroup = data.specialities;
			const fiveSpecialtiesGroup = data.specialities.slice(0, 5);
			return { allSpecialtiesGroup, fiveSpecialtiesGroup };
		} catch (error) {
			console.error('Network error:', error);
			return { allSpecialtiesGroup: [], fiveSpecialtiesGroup: [] };
		}
	}

	async getSpecialtiesStore(country: string) {
		try {
			// Comprobamos si `window` está definido
			if (typeof window === 'undefined') {
				// console.log('Se está ejecutando en un entorno sin window.');
				return []; // Devuelve un array vacío o maneja la lógica para entornos del lado del servidor
			}

			const COUNTRY_TTL = 24 * 60 * 60 * 1000; // TTL de 24 horas
			const storedData = localStorage.getItem(`specialties_${country}`);

			// Comprobamos si hay datos almacenados y si no han expirado
			if (storedData) {
				const { value, timestamp } = JSON.parse(storedData);
				const now = new Date().getTime();
				if (now - timestamp < COUNTRY_TTL) {
					// console.log('specialtystore obtenidos de localStorage');
					return value; // Devuelve los datos almacenados
				}
			}

			// Si no hay datos válidos en localStorage, hacemos la llamada a la API
			let validCountries = countries.map((item) => item.id);
			const countryParam = validCountries.includes(country) ? `&country=${country}` : `&country=int`;

			const response = await fetch(`${API_URL}/products-specialities?${countryParam}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch post specialties. HTTP status ${response.status}`);
			}

			const data = await response.json();

			// Almacenamos los datos en localStorage
			localStorage.setItem(
				`specialties_${country}`,
				JSON.stringify({
					value: data.specialities.map((specialty: { speciality_name: string; products: number; image: string }) => {
						return {
							name: specialty.speciality_name,
							products: specialty.products,
							image: specialty.image,
						};
					}),
					timestamp: new Date().getTime(), // Guardamos el timestamp actual
				}),
			);

			// console.log('Datos obtenidos de la API specialstore');
			return data.specialities.map((specialty: { speciality_name: string; products: number; image: string }) => {
				return {
					name: specialty.speciality_name,
					products: specialty.products,
					image: specialty.image,
				};
			});
		} catch (error) {
			console.error('Error en la función getSpecialtiesStore:', error);
			return []; // Devuelve un array vacío en caso de error
		}
	}

	async getAllProfessions() {
		try {
			const PROFESSIONS_TTL = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
			let storedProfessions;

			// Verificar si estamos en un entorno de navegador
			if (typeof window !== 'undefined') {
				storedProfessions = localStorage.getItem('allProfessions');
			}

			// Comprobar si hay datos en localStorage y si son válidos
			if (storedProfessions) {
				const { value, timestamp } = JSON.parse(storedProfessions);
				const now = new Date().getTime();
				if (now - timestamp < PROFESSIONS_TTL) {
					// console.log('All professions tomados de localStorage');
					return value; // Retorna los datos almacenados
				}
			}

			// console.log('Llamando a la API para obtener todas las profesiones');
			const response = await fetch(`${baseUrl}/api/store/professions`);

			if (!response.ok) {
				throw new Error(`Failed to fetch all professions. HTTP status ${response.status}`);
			}

			const data = await response.json();

			// Modificar el slug según el nombre de la profesión
			data.map((profession: any) => {
				switch (profession.name) {
					case 'Personal médico':
						profession.slug = 'medicos';
						break;
					case 'Personal de enfermería y auxiliares':
						profession.slug = 'enfermeros-auxiliares';
						break;
					case 'Otra profesión':
						profession.slug = 'otra-profesion';
						break;
				}
			});

			// Guardar los datos en localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(
					'allProfessions',
					JSON.stringify({
						value: data,
						timestamp: new Date().getTime(),
					}),
				);
			}

			return data;
		} catch (error) {
			console.error('Error de red:', error);
			return [];
		}
	}

	// async getProfessions() {
	//   try {
	//     //console.log('Get professions 2');
	//     const response = await fetch(`${baseUrl}/api/professions`);

	//     if (!response.ok) {
	//       throw new Error(
	//         `Failed to fetch professions. HTTP status ${response.status}`,
	//       );
	//     }

	//     const data = await response.json();
	//     console.log('getProfessions', { data });
	//     return data;
	//   } catch (error) {
	//     return error;
	//   }
	// }

	async getProfessions() {
		const PROFESSIONS_TTL = 24 * 60 * 60 * 1000;
		try {
			if (typeof window !== 'undefined') {
				const storedProfessions = localStorage.getItem('professions');
				// console.log(storedProfessions);
				if (storedProfessions) {
					const { data, timestamp } = JSON.parse(storedProfessions);
					const now = new Date().getTime();
					// console.log(data);

					if (now - timestamp < PROFESSIONS_TTL) {
						return data;
					}
				}
			}

			// Si no hay datos o el TTL ha expirado, realizar una nueva llamada a la API
			// console.log('haciendo llamada api');
			const response = await fetch(`${baseUrl}/api/professions`);

			if (!response.ok) {
				throw new Error(`Failed to fetch professions. HTTP status ${response.status}`);
			}

			const data = await response.json();
			// console.log('getProfessions', { data });

			// Guardar los datos en localStorage solo si estamos en el cliente
			if (typeof window !== 'undefined') {
				localStorage.setItem(
					'professions',
					JSON.stringify({
						data,
						timestamp: new Date().getTime(), // Guardar el tiempo actual
					}),
				);
			}

			return data;
		} catch (error) {
			console.error('Error de red:', error);
			return error;
		}
	}

	async getSpecialties() {
		try {
			const response = await fetch(`${baseUrl}/api/specialities`);

			if (!response.ok) {
				throw new Error(`Failed to fetch specialties. HTTP status ${response.status}`);
			}

			const data = await response.json();
			return data.specialities;
		} catch (error) {
			return error;
		}
	}

	async getSpecialtiesAndGroups() {
		try {
			const SPECIALTIES_TTL = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
			let storedSpecialties;

			// Verificar si estamos en un entorno de navegador
			if (typeof window !== 'undefined') {
				storedSpecialties = localStorage.getItem('specialtiesAndGroups');
			}

			// Comprobar si hay datos en localStorage y si son válidos
			if (storedSpecialties) {
				const { value, timestamp } = JSON.parse(storedSpecialties);
				const now = new Date().getTime();
				if (now - timestamp < SPECIALTIES_TTL) {
					// console.log('especialidades tomados de localStorage');
					return value; // Retorna los datos almacenados
				}
			}

			// console.log('Llamando a la API para obtener especialidades y grupos');
			const response = await fetch(`${baseUrl}/api/specialities`);

			if (!response.ok) {
				throw new Error(`Failed to fetch specialties and groups. HTTP status ${response.status}`);
			}

			const data = await response.json();

			// Guardar los datos en localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(
					'specialtiesAndGroups',
					JSON.stringify({
						value: data,
						timestamp: new Date().getTime(),
					}),
				);
			}

			return data;
		} catch (error) {
			console.error('Error de red:', error);
			return [];
		}
	}

	async getWpContent(endpoint: string, country: string) {
		try {
			let validCountries = countries.map((item) => item.id);
			const countryParam = validCountries.includes(country) ? `&country=${country}` : `&country=int`;

			const response = await fetch(`${API_URL}${endpoint}?${countryParam}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch ${endpoint}. HTTP status ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			return error;
		}
	}

	async getEmailByIdZohoCRM(module: string, email: string) {
		try {
			const response = await fetch(`${baseUrl}/api/crm/GetByEmail/${module}/${email}`);

			if (!response.ok) {
				throw new Error(`Failed to get email by ID from Zoho CRM. HTTP status ${response.status}`);
			}

			let { data } = await response.json();
			// console.log({data: data[0]})
			return data[0];
		} catch (error) {
			return error;
		}
	}

	async getUserData() {
		if (typeof window !== 'undefined') {
			const email = localStorage.getItem('email');

			try {
				const token = localStorage.getItem('token');
				if (token) {
					const headers = {
						Authorization: `Bearer ${token}`,
					};

					const response = await fetch(`${apiProfileUrl}/${email}`, {
						headers: {
							...headers,
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error(`Failed to get user data. HTTP status ${response.status}`);
					}

					const data = await response.json();
					return data.user;
				}
			} catch (error) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				console.log({ error });
			}
		}
	}

	async postSignUp(jsonData: SignUp) {
		try {
			//
			const response = await fetch(`${baseUrl}/api/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(jsonData),
			});

			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				return await response.json();
			} else {
				// console.log(response);
				return response;
			}
		} catch (e) {
			console.error('Error in postSignUp:', e);
			return e; // Or handle the error as needed
		}
	}

	async postRecover(jsonData: { email: string }): Promise<Response> {
		try {
			const response = await fetch(`${baseUrl}/api/RequestPasswordChange`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jsonData),
			});

			if (!response.ok) {
				throw new Error(`Failed to recover. HTTP status ${response.status}`);
			}

			return response;
		} catch (error) {
			// @ts-ignore
			return error;
		}
	}

	async postNewPassword(jsonData: BodyNewPassword) {
		try {
			const response = await fetch(`${baseUrl}/api/newPassword`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(jsonData),
			});

			if (!response.ok) {
				throw new Error(`Failed to post new password. HTTP status ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Network error:', error);
			return error;
		}
	}

	async postPaymentMercadoPago(paymentData: any) {
		// console.log(paymentData);
		try {
			const response = await fetch(
				// `http://localhost:8000/api/gateway/api/mercadopago/arg/our_test`,
				`https://payment.msklatam.net/api/gateway/api/mercadopago/arg/our_test`,
				// `${baseUrl}/api/gateway/api/mercadopago/arg/our_test/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6`,
					},
					body: JSON.stringify(paymentData),
				},
			);

			// console.log({ data });

			if (response.status == 200) {
				const data = await response.json();
				// console.log('Pago ok', { data });
				return data;
			}
		} catch (err) {
			console.error('Pago error', { err });
		}
	}

	// async createDrafContract(
	//   product: FetchSingleProduct,
	//   profile: UserProfile | null,
	// ) {
	//   console.log({ product, profile });
	//   const body = {
	//     customer_id: profile?.entity_id_crm,
	//     products: [
	//       {
	//         code: product.ficha.product_code,
	//         quantity: 1,
	//         total: product.total_price,
	//       },
	//     ],
	//     status: 'Borrador',
	//     currency: 'ARS',
	//     country: 'Argentina',
	//     grand_total: product?.total_price,
	//   };

	//   try {
	//     const response = await fetch(
	//       `http://127.0.0.1:8000/api/gateway/api/mercadopago/arg/our_test`,
	//       {
	//         method: 'POST',
	//         headers: {
	//           'Content-Type': 'application/json',

	//           Authorization: `Bearer $2y$12$tdFqIBqa413sfYENjGjVR.lUOfcRnRaXBgBDUeQIBg1BjujlLbmQW`, //este token va asi
	//         },
	//         body: JSON.stringify(body),
	//       },
	//     );

	//     // if (!response.ok) {
	//     //   throw new Error(`HTTP error! status: ${response.status}`);
	//     // }
	//     console.log({ body });
	//     console.log({ response });
	//     const data = response.json();
	//     console.log({ data });

	//     return data;
	//   } catch (err) {
	//     console.error('Pago error', { err });
	//     return { error: true, message: '' };
	//   }
	// }

	buildDraftContractBody(product: FetchSingleProduct, profile: UserProfile | null) {
		const body = {
			customer_id: profile?.entity_id_crm,
			products: [
				{
					code: product.ficha.product_code,
					quantity: 1,
					total: product.total_price,
					net_total: product.totalAmount,
					list_price: product.totalAmount,
				},
			],
			status: 'Borrador',
			currency: 'ARS',
			country: 'Argentina',
			sub_total: product.total_price,
			grand_total: product?.total_price,
		};

		// console.log({ body });

		return body;
	}

	async callDraftContractApi(body: object) {
		// console.log({ body });
		try {
			const response = await fetch(
				`https://payment.msklatam.net/api/msk-crm/api/zoho/sales_order/create_contract`,
				// `http://crm.msklatam.net/api/zoho/sales_order/create_contract`,
				// `http://127.0.0.1:8000/api/gateway/api/mercadopago/arg/our_test`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer $2y$12$tdFqIBqa413sfYENjGjVR.lUOfcRnRaXBgBDUeQIBg1BjujlLbmQW`, // token fijo
					},
					body: JSON.stringify(body),
				},
			);

			const data = await response.json();
			// console.log({ data });

			return data;
		} catch (err) {
			console.error('Pago error', { err });
			return { error: true, message: '' };
		}
	}

	async createDraftContract(product: FetchSingleProduct, profile: UserProfile | null) {
		const body = this.buildDraftContractBody(product, profile);
		// console.log({ body });

		const data = await this.callDraftContractApi(body);

		return data;
	}
}

export default new ApiSSRService();
