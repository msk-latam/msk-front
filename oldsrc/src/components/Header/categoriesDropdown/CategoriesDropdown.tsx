import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { FetchCourseType, Specialty } from '@/data/types';
import React, { useEffect, useRef, useState } from 'react';
import breadcrumArrowIcon from '@/public/images/icons/breadcrum_arrow.svg';
import especialidadesIcon from '@/public/webp-images/icons/especialidadesIcon.svg';
import ofrecemosIcon from '@/public/webp-images/icons/ofrecemosIcon.svg';
import recursosIcon from '@/public/webp-images/icons/recursosIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import arrowLeft from '@/public/images/icons/ArrowLeft.svg';
import arrowDownWhite from '@/public/images/icons/arrowDownWhite.svg';
import arrowDownBlack from '@/public/images/icons/arrowDownBlack.svg';
import { filter } from 'lodash';
import { cookies } from 'next/headers';
import ssr from '@/services/ssr';
import { getJSONByCountry } from '@/app/products';

const CategoriesDropdown = ({ onClickClose }: any) => {
	const pathname = usePathname();
	const match = pathname.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';
	const [JSONProduct, setJSONProduct] = useState<{ products: any[] } | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getJSONByCountry(country ?? 'ar');
				const filteredProducts = data.products.filter((product) => product.slug !== 'accsap');

				setJSONProduct(filteredProducts);
			} catch (error) {
				console.error('Error al obtener los productos:', error);
				setJSONProduct({ products: [] }); // Evitar fallos
			}
		};

		fetchData();
	}, [country]);
	const [isOpen, setIsOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState<Specialty | null>(null);
	const [showUpArrow, setShowUpArrow] = useState(false);
	const [showDownArrow, setShowDownArrow] = useState(true);
	const [cachedCourses, setCachedCourses] = useState<any[]>([]);
	const scrollContainerRef = useRef<HTMLUListElement | null>(null);
	const router = useRouter();
	const dropdownRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) {
			// console.error('El contenedor de scroll no está definido en useEffect.');
			return;
		}

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;

			// console.log('ScrollTop:', scrollTop);
			// console.log('ScrollHeight:', scrollHeight);
			// console.log('ClientHeight:', clientHeight);

			const isScrolledToTop = scrollTop === 0;
			const isScrolledToBottom = 362 - scrollTop <= 0;

			setShowUpArrow(!isScrolledToTop);
			setShowDownArrow(!isScrolledToBottom);
		};

		container.addEventListener('scroll', handleScroll);
		// console.log('Listener de scroll añadido.');

		return () => {
			container.removeEventListener('scroll', handleScroll);
			// console.log('Listener de scroll eliminado.');
		};
	}, [scrollContainerRef.current]);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
		setActiveCategory(null);
	};

	let categories: Specialty[] = useStoreFilters().specialties;

	let sortedCategories = [...categories].sort((a, b) => a.name?.localeCompare(b.name));

	// Filtramos la categoría "Oftalmología" (asumiendo que el nombre es case-sensitive)
	sortedCategories = sortedCategories.filter((category) => category.name !== 'Oftalmología');

	// Agregamos manualmente la categoría "Neurología"
	sortedCategories.push({
		name: 'Neurología',
	});

	const pathName = usePathname();
	const getCountryFromPath = (pathname: string) => {
		const pathParts = pathname.split('/'); // Dividimos la URL en partes
		const countryCode = pathParts[1]; // El país debe estar en la segunda posición (índice 1)
		return countryCode;
	};
	const userCountry = getCountryFromPath(pathName);

	sortedCategories = sortedCategories.map((category) => {
		if (category.name === 'Emergentología' && userCountry !== 'ar') {
			return {
				...category,
				name: 'Medicina de urgencias',
			};
		}
		return category;
	});

	// Ordenamos de nuevo para incluir "Neurología" en la posición correcta
	sortedCategories = sortedCategories.sort((a, b) => a.name?.localeCompare(b.name));

	const handleCategoryClick = (category: Specialty) => {
		// Si la categoría es "Medicina de urgencias", la reemplazamos por "Emergentología" internamente.
		if (category.name === 'Medicina de urgencias') {
			category.name = 'Emergentología';
		}
		setActiveCategory(category); // Activa el dropdown secundario con la categoría seleccionada
	};

	function getCachedCourses() {
		const cacheKey = `all-courses`;
		const TTL = 2 * 60 * 60 * 1000; // 24 horas
		const isServer = typeof window === 'undefined';

		if (isServer) {
			return null; // En el servidor no existe `localStorage`
		}

		// Intentar obtener los datos de `localStorage`
		const cachedData = localStorage.getItem(cacheKey);
		if (cachedData) {
			const { value, timestamp } = JSON.parse(cachedData);
			const now = new Date().getTime();

			// Verificar si los datos están dentro del tiempo de vida útil (TTL)
			if (now - timestamp < TTL) {
				// console.log(`getCachedCourses obtenidos de localStorage para ${cacheKey}`);
				return value;
			}
			return value;
		}
	}

	// const currentCountry = cookies().get('country')?.value;
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const coursesData = await ssr.getAllCourses(country);
				setCachedCourses(JSONProduct);
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		};

		fetchCourses();
	}, [JSONProduct]);

	const filteredCourses = cachedCourses?.filter((course: FetchCourseType) => {
		return (
			course.categories &&
			course.categories.some((category) => category.name === activeCategory?.name) &&
			course.father_post_type !== 'downloadable' &&
			course.is_test_product !== true
		);
	});

	const redirectToCategory = (slug: string) => {
		// console.log(slug);
		let formattedSlug = slug
			.toLowerCase() // Convertir a minúsculas
			.normalize('NFD')
			.replace(/[^a-z0-9\s]/g, '') // Eliminar caracteres raros
			.replace(/\s+/g, '-') // Reemplazar espacios con guiones medios
			.trim(); // Eliminar espacios en blanco al principio y al final

		if (formattedSlug === 'emergentologia') {
			formattedSlug = 'medicina-de-urgencias';
		}

		// Redirigir a la ruta correspondiente
		setIsOpen(!isOpen);
		setActiveCategory(null);
		onClickClose;
		router.push(
			country === ''
				? `${window.location.origin}/tienda/${formattedSlug}`
				: `${window.location.origin}/${country}/tienda/${formattedSlug}`,
		);
	};

	const handleLinkClick = () => {
		setIsOpen(!isOpen); // Cambiar el estado de isOpen
		setActiveCategory(null); // Resetear activeCategory
		onClickClose;
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth >= 1270 && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				setActiveCategory(null);
			}
		};

		// Agregar el evento de clic cuando el menú está abierto
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		// Limpiar el evento cuando el componente se desmonte o el menú se cierre
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1270) {
				setIsOpen(true); // Mostrar dropdown automáticamente en mobile
			} else {
				setIsOpen(false); // Ocultar dropdown en pantallas más grandes
			}
		};

		// Ejecutar al cargar la página
		handleResize();

		// Escuchar cambios en el tamaño de la ventana
		window.addEventListener('resize', handleResize);

		// Limpiar el listener al desmontar
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// console.log(filteredCourses);

	const getCategoryLink = (slug: string = ''): string => {
		// Obtener la URL actual
		const pathname = window.location.pathname;

		// Extraer el código del país (el primer segmento después del dominio)
		const country = pathname.split('/')[1]; // Por ejemplo, en "/ar/tienda", extraerá "ar"

		let formattedSlug = typeof slug === 'string' ? slug : '';

		formattedSlug = formattedSlug
			.toLowerCase() // Convertir a minúsculas
			.normalize('NFD') // Normalizar caracteres unicode
			.replace(/[^a-z0-9\s]/g, '') // Eliminar caracteres raros
			.replace(/\s+/g, '-') // Reemplazar espacios con guiones medios
			.trim(); // Eliminar espacios al principio y al final

		// Reemplazar categorías específicas si aplica
		if (formattedSlug === 'emergentologia') {
			formattedSlug = 'medicina-de-urgencias';
		}

		// Retornar el enlace completo
		return `https://msklatam.com/${country}/tienda/${formattedSlug}`;
	};

	return (
		<div className='relative block overscroll-none ' ref={dropdownRef}>
			<div className='flex'>
				<button
					className='hidden xl:flex items-center justify-between w-full bg-transparent text-black py-2 px-3 rounded-md hover:bg-[#FF5D5E] hover:text-white xl:w-auto group !font-inter font-medium'
					onClick={toggleDropdown}
				>
					<span>Descubre</span>
					<div className='relative ml-2'>
						<Image src={arrowDownBlack} alt='arrow icon black' width={10} height={10} className='block group-hover:hidden' />

						<Image src={arrowDownWhite} alt='arrow icon white' width={10} height={10} className='hidden group-hover:block' />
					</div>
				</button>
			</div>

			{isOpen && (
				<div className='overflow-y-scroll scrollbar-thin scrollbar-thumb-[#6474A6] scrollbar-track-transparent lg:overflow-y-visible max-h-[55vh] lg:max-h-none relative xl:absolute mt-2 xl:w-[24vw] bg-white xl:shadow-[0_6px_12px_rgba(0,0,0,0.3)] lg:rounded-l-2xl lg:p-4 '>
					<ul className='py-2'>
						<li className='flex gap-2 items-center lg:px-4 py-2 text-lg'>
							<Image src={especialidadesIcon} alt='icon' width={20} height={20} />
							<h2 className='!font-inter'>Especialidades</h2>
						</li>
						<div
							className={`${
								activeCategory ? 'max-h-64' : ''
							} lg:max-h-[52vh]   scrollbar-thin scrollbar-thumb-[#6474A6] scrollbar-track-transparent`}
						>
							{showUpArrow && (
								<div className='absolute top-[70px] left-1/2 transform'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 animate-bounce text-gray-500'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
									</svg>
								</div>
							)}

							<ul
								className=' lg:overflow-auto lg:max-h-[50vh] scrollbar-thumb-[#6474A6] scrollbar-thin scrollbar-track-transparent'
								ref={scrollContainerRef}
							>
								{sortedCategories.map((category, index) => (
									<li
										onClick={() => handleCategoryClick(category)}
										key={index}
										className='flex justify-between items-center lg:px-4 py-1 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md w-80 lg:w-auto'
									>
										<span>{category.name}</span>
										<a href={getCategoryLink(category?.name)}></a>
										<img src={`${breadcrumArrowIcon.src}`} className='w-3 h-3' alt='Arrow' />
									</li>
								))}
							</ul>
							{showDownArrow && (
								<div className='absolute bottom-[7px] lg:bottom-[250px] left-1/2 transform'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 animate-bounce text-gray-500'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
									</svg>
								</div>
							)}
						</div>

						{activeCategory && (
							<div className=' fixed top-32 left-0 w-full h-full  bg-[#FBFAFA]  p-5 rounded-r-2xl md:absolute md:left-full md:top-0 md:w-[24vw]  xl:shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-20 '>
								<div className='relative'>
									{/* Div con posición absoluta para expandir el fondo blanco */}
									<div className='absolute inset-0 bg-white z-[-1]  w-screen transform -translate-x-1/2 -mt-5 left-1/2 lg:hidden'></div>

									<div className='flex items-center mb-4 group'>
										<button
											onClick={() => setActiveCategory(null)}
											className=' text-[#6474A6] py-2 px-2 rounded-md flex !font-inter lg:mt-2 mb-2 lg:mb-0 group-hover:bg-violet-100'
										>
											<Image
												src={arrowLeft}
												alt='arrow'
												width={8}
												height={8}
												className='mr-2 mt-[0.35rem] lg:mb-0  bg-transparent'
											/>
											Descubre más
										</button>
									</div>
								</div>

								<h2 className='!font-inter font-bold mb-2 pt-1 pb-2 text-lg'>
									{(activeCategory.name as string) === 'Emergentología' && (userCountry as string) !== 'ar'
										? 'Medicina de urgencias'
										: activeCategory.name}
								</h2>
								<ul className=' overflow-y-scroll lg:overflow-y-visible h-[calc(53vh-10rem)] lg:h-auto lg:max-h-none z-50 scrollbar-thin scrollbar-thumb-[#6474A6]'>
									{filteredCourses?.length > 0 ? (
										filteredCourses
											.filter((course: any) => course.thumbnail?.low) // Filtrar cursos sin thumbnail.low
											.slice(0, 4)
											.map((course: any) => (
												<li key={course.id} className='mb-2 '>
													<Link
														href={
															country === ''
																? `${window.location.origin}/curso/${course.slug}`
																: `${window.location.origin}/${country}/curso/${course.slug}`
														}
														onClick={handleLinkClick}
														className=' text-xs'
													>
														<div className='flex items-center gap-4'>
															<Image
																src={course.thumbnail.low}
																alt={course.title}
																className='w-20 h-20 object-cover rounded-md'
																height={100}
																width={100}
															/>
															<div>
																<h4 className='!font-inter font-extralight text-sm text-[#7C838F]'>
																	{course?.lista_de_cedentes?.[0]?.post_title ?? ''}
																</h4>
																<h3 className='font-light text-base text-[#6474A6] !font-inter'>{course?.title}</h3>
															</div>
														</div>
													</Link>
												</li>
											))
									) : (
										<li className='mb-2 text-sm text-gray-500'>No hay cursos disponibles en esta categoría.</li>
									)}
									{/* <div className='absolute left-0 w-full  bottom-0 top-0 bg-gradient-to-t from-white to-transparent pointer-events-none transform translate-y-[-20px]'></div> */}
								</ul>
								{filteredCourses?.length > 0 && (
									<div className='flex items-center gap-2 mt-4'>
										<button
											onClick={() => redirectToCategory(activeCategory.name)}
											className='text-[#9200AD] bg-transparent rounded-md text-sm lg:text-base flex items-center gap-2'
										>
											Ver todos los cursos
											<Image src={breadcrumArrowIcon} alt='Arrow' width={6} height={6} />
										</button>
									</div>
								)}
							</div>
						)}

						<li className='flex-col'>
							<div className='flex gap-2 items-center lg:px-4 py-2 pt-3 text-lg'>
								<Image src={ofrecemosIcon} alt='icon' width={20} height={20} />
								<h2 className='!font-inter'>Qué ofrecemos</h2>
							</div>
							<ul className='flex flex-col'>
								<li className='w-full'>
									<Link
										onClick={handleLinkClick}
										href={
											country === ''
												? `${window.location.origin}/tienda/?profesion=medicos&recurso=curso`
												: `${window.location.origin}/${country}/tienda/?profesion=medicos&recurso=curso`
										}
										className='block lg:px-4 py-1 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
									>
										Cursos para personal médico
									</Link>
								</li>
								<li className='w-full'>
									<Link
										onClick={handleLinkClick}
										href={
											country === ''
												? `${window.location.origin}/tienda/?profesion=otra-profesion`
												: `${window.location.origin}/${country}/tienda/?profesion=otra-profesion`
										}
										className='block lg:px-4 py-1 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
									>
										Cursos para enfermería y otras profesiones
									</Link>
								</li>
							</ul>
						</li>

						{/* Recursos Section */}
						<li className='w-full'>
							<div className='flex gap-2 items-center lg:px-4 py-3 text-[#6474A6]  rounded-md text-lg'>
								<Image src={recursosIcon} alt='icon' width={20} height={20} />
								<h2 className='!font-inter'>Recursos</h2>
							</div>
						</li>
						<ul className='flex flex-col'>
							<li className='w-full'>
								<Link
									onClick={handleLinkClick}
									href={
										country === ''
											? `${window.location.origin}/tienda/?recurso=guias-profesionales`
											: `${window.location.origin}/${country}/tienda/?recurso=guias-profesionales`
									}
									className='block lg:px-4 py-1 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
								>
									Guías profesionales
								</Link>
							</li>
							<li className='w-full'>
								<Link
									onClick={handleLinkClick}
									href={country === '' ? `${window.location.origin}/blog` : `${window.location.origin}/${country}/blog`}
									className='block lg:px-4 py-1 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
								>
									Blog
								</Link>
							</li>
						</ul>
					</ul>
				</div>
			)}
		</div>
	);
};

export default CategoriesDropdown;
