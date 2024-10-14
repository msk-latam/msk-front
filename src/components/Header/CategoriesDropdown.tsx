import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { FetchCourseType, Specialty } from '@/data/types';
import React, { useEffect, useRef, useState } from 'react';
import breadcrumArrowIcon from '@/public/images/icons/breadcrum_arrow.svg';
import especialidadesIcon from '@/public/webp-images/icons/especialidadesIcon.svg';
import ofrecemosIcon from '@/public/webp-images/icons/ofrecemosIcon.svg';
import recursosIcon from '@/public/webp-images/icons/recursosIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import productDetails from '@/hooks/ssr/productDetails';
import { useRouter } from 'next/navigation';
import arrowLeft from '@/public/images/icons/ArrowLeft.svg';

const CategoriesDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState<Specialty | null>(null);
	const router = useRouter();

	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
		setActiveCategory(null);
	};

	let categories: Specialty[] = useStoreFilters().specialties;

	const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

	const handleCategoryClick = (category: Specialty) => {
		setActiveCategory(category); // Activa el dropdown secundario con la categoría seleccionada
	};

	function getCachedCourses() {
		const cacheKey = `all-courses`;
		const TTL = 24 * 60 * 60 * 1000; // 24 horas
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
				console.log(`getCachedCourses obtenidos de localStorage para ${cacheKey}`);
				return value;
			}
			return value;
		}
	}

	const cachedCourses = getCachedCourses();
	const filteredCourses = cachedCourses?.filter((course: FetchCourseType) => {
		return (
			course.categories &&
			course.categories.some((category) => category.name === activeCategory?.name) &&
			course.father_post_type !== 'downloadable' // Excluir los cursos con esta propiedad
		);
	});

	console.log(filteredCourses);

	const redirectToCategory = (slug: string) => {
		// Transformar el slug
		const formattedSlug = slug
			.toLowerCase() // Convertir a minúsculas
			.normalize('NFD')
			.replace(/[^a-z0-9\s]/g, '') // Eliminar caracteres raros
			.replace(/\s+/g, '-') // Reemplazar espacios con guiones medios
			.trim(); // Eliminar espacios en blanco al principio y al final

		// Redirigir a la ruta correspondiente
		setIsOpen(!isOpen);
		setActiveCategory(null);
		router.push(`/tienda/${formattedSlug}`);
	};

	const handleLinkClick = () => {
		setIsOpen(!isOpen); // Cambiar el estado de isOpen
		setActiveCategory(null); // Resetear activeCategory
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

	return (
		<div className='relative block' ref={dropdownRef}>
			<button
				className=' w-full bg-transparent text-black py-2 px-4 rounded-md hover:bg-[#FF5D5E] hover:text-white xl:w-auto'
				onClick={toggleDropdown}
			>
				Descubre
			</button>

			{isOpen && (
				<div className=' relative xl:absolute mt-2 xl:w-[24vw] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] rounded-md p-4'>
					<ul className='py-2'>
						<li className='flex gap-2 items-center px-4 py-2'>
							<Image src={especialidadesIcon} alt='icon' width={20} height={20} />
							<h2 className='!font-inter'>Especialidades</h2>
						</li>
						<div className='max-h-36 overflow-y-auto md:max-h-none scrollbar-thin scrollbar-thumb-[#6474A6] scrollbar-track-transparent'>
							<ul>
								{sortedCategories.map((category, index) => (
									<li
										onClick={() => handleCategoryClick(category)}
										key={index}
										className='flex justify-between items-center px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
									>
										<span>{category.name}</span>
										<img src={`${breadcrumArrowIcon.src}`} className='w-3 h-3' alt='Arrow' />
									</li>
								))}
							</ul>
						</div>

						{activeCategory && (
							<div className='fixed top-36 left-0 w-full h-full bg-[#FBFAFA] shadow-lg p-4 rounded-md md:absolute md:left-full md:top-0 md:w-[24vw]'>
								<div className='flex items-center mb-4'>
									<Image src={arrowLeft} alt='arrow' width={10} height={10} className='mr-2' />
									<button
										onClick={() => setActiveCategory(null)} // Esta función oculta el segundo dropdown
										className='bg-transparent text-[#6474A6] py-2 px-4 rounded-md hover:bg-gray-300 !font-inter'
									>
										Descubre más
									</button>
								</div>

								<h2 className='font-inter font-bold mb-4'>{activeCategory.name}</h2>
								<ul>
									{filteredCourses?.length > 0 ? (
										filteredCourses?.slice(0, 4).map((course: any) => (
											<li key={course.id} className='mb-2'>
												<Link href={`/curso/${course.slug}`} onClick={handleLinkClick} className=' text-xs'>
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
																{course.lista_de_cedentes[0].post_title}
															</h4>
															<h3 className='font-light text-lg text-[#6474A6] !font-inter'>{course.title}</h3>
														</div>
													</div>
												</Link>
											</li>
										))
									) : (
										<li className='mb-2 text-sm text-gray-500'>No hay cursos disponibles en esta categoría.</li>
									)}
								</ul>
								<button
									onClick={() => redirectToCategory(activeCategory.name)}
									className='bg-[#9200AD] text-white py-2 px-4 rounded-md hover:bg-[#FF5D5E] w-full'
								>
									Ver todos los cursos
								</button>
							</div>
						)}

						<li className='flex-col'>
							<div className='flex gap-2 items-center px-4 py-2'>
								<Image src={ofrecemosIcon} alt='icon' width={20} height={20} />
								<h2 className='!font-inter'>Qué Ofrecemos</h2>
							</div>
							<ul className='flex flex-col'>
								<li className='w-full'>
									<Link
										href={'/tienda/?profesion=medicos&recurso=curso'}
										className='block px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
									>
										Cursos para personal médico
									</Link>
								</li>
								<li className='w-full'>
									<Link
										href={'/tienda/?profesion=otra-profesion'}
										className='block px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
									>
										Cursos para enfermería y otras profesiones
									</Link>
								</li>
							</ul>
						</li>

						{/* Recursos Section */}
						<li className='w-full'>
							<Link
								href={'/tienda/?recurso=guias-profesionales'}
								className='flex gap-2 items-center px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md '
							>
								<Image src={recursosIcon} alt='icon' width={20} height={20} />
								<h2 className='!font-inter'>Recursos</h2>
							</Link>
						</li>
						<ul className='flex flex-col'>
							<li className='w-full'>
								<Link
									href={'/tienda/?recurso=guias-profesionales'}
									className='block px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
								>
									Guías Profesionales
								</Link>
							</li>
							<li className='w-full'>
								<Link
									href={'/blog'}
									className='block px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
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
