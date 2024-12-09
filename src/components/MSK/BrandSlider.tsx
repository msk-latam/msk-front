'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { BRANDS_BY_COUNTRY } from '@/data/MSK/brands';
import Image from 'next/image';

interface BrandSliderProps {
	country: string;
}

const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
	async function fetchBrands(country: any) {
		try {
			// Construir la URL con el parámetro de país
			const url = `https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?country=${country}`;

			// Realizar la petición al endpoint
			const response = await fetch(url);

			// Verificar que la respuesta sea válida
			if (!response.ok) {
				throw new Error(`Error al obtener los datos: ${response.statusText}`);
			}

			// Parsear la respuesta como JSON
			const data = await response.json();

			// Si no hay datos para el país, intentar con la opción por defecto
			return data.length > 0 ? data : await fetchDefaultBrands();
		} catch (error) {
			console.error('Error al obtener las marcas:', error);
			return await fetchDefaultBrands(); // En caso de error, obtener las marcas por defecto
		}
	}

	// Función para obtener las marcas por defecto
	async function fetchDefaultBrands() {
		try {
			const url = 'https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?country=int';
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error al obtener las marcas por defecto: ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error al obtener las marcas por defecto:', error);
			return []; // Retornar un array vacío en caso de error
		}
	}

	// const brands = BRANDS_BY_COUNTRY[country] || BRANDS_BY_COUNTRY['default'];
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [dragMoved, setDragMoved] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [brands, setBrands] = useState<any>([]);

	useEffect(() => {
		(async () => {
			const fetchedBrands = await fetchBrands(country);
			setBrands(fetchedBrands);
		})();
	}, [country]);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container || isDragging || isHovered) return;

		let scrollInterval: NodeJS.Timeout;

		const startScrolling = () => {
			scrollInterval = setInterval(() => {
				const scrollPosition = container.scrollLeft + container.offsetWidth;
				const atEnd = scrollPosition >= container.scrollWidth;

				if (atEnd) {
					container.scrollTo({ left: 0, behavior: 'smooth' });
				} else {
					container.scrollBy({ left: 200, behavior: 'smooth' });
				}
			}, 1500);
		};

		startScrolling();

		return () => {
			clearInterval(scrollInterval);
		};
	}, [isDragging, isHovered]);

	const handleMouseDown = (e: React.MouseEvent) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		setIsDragging(true);
		setStartX(e.pageX - container.offsetLeft);
		setScrollLeft(container.scrollLeft);
		setDragMoved(false); // Resetear el estado de arrastre
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;

		e.preventDefault();
		const container = scrollContainerRef.current;
		if (!container) return;

		const x = e.pageX - container.offsetLeft;
		const walk = x - startX;
		container.scrollLeft = scrollLeft - walk;

		if (Math.abs(walk) > 5) {
			// Si el desplazamiento es significativo, es arrastre
			setDragMoved(true);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setIsHovered(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Si hubo movimiento, prevenir el comportamiento por defecto
		if (dragMoved) {
			e.preventDefault();
		}
	};

	const handleWheel = (event: React.WheelEvent) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		container.scrollBy({
			left: event.deltaY > 0 ? 200 : -200,
			behavior: 'smooth',
		});
	};

	const preventImageDrag = (e: React.DragEvent) => {
		e.preventDefault();
	};

	return (
		<div className='relative'>
			{/* Difuminación izquierda */}
			<div className='absolute top-0 left-0 h-full w-16 pointer-events-none bg-gradient-to-r from-white via-white/70 to-transparent z-10'></div>

			{/* Difuminación derecha */}
			<div className='absolute top-0 right-0 h-full w-16 pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent z-10'></div>

			{/* Contenedor del slider */}
			<div
				className='overflow-x-auto flex space-x-8 py-4 scrollbar-hide overscroll-none pl-16'
				ref={scrollContainerRef}
				onMouseEnter={() => setIsHovered(true)} // Detener el scroll automático
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onWheel={handleWheel}
			>
				<div className='flex items-center space-x-8'>
					{brands?.map((brand: any, index: number) => (
						<div key={index} className='flex-shrink-0 group'>
							<a
								href={brand.url}
								target='_blank'
								rel='noopener noreferrer'
								className='relative flex items-center justify-center w-auto h-auto'
								onDragStart={preventImageDrag}
								onClick={handleClick}
							>
								{/* SVG normal */}
								<Image
									src={brand.imgDefault} // Imagen SVG por defecto
									alt='Brand logo'
									width={brand.width}
									height={100}
									className='object-contain group-hover:hidden transition-all duration-500 ease-in-out opacity-100'
								/>

								{/* SVG alternativo (hover) */}
								<Image
									src={brand.imgHover} // Imagen SVG para hover
									alt='Brand logo hover'
									width={brand.width}
									height={100}
									className='object-contain hidden group-hover:block transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100'
								/>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BrandSlider;
