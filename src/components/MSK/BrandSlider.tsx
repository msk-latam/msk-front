'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { BRANDS_BY_COUNTRY } from '@/data/MSK/brands';
import Image from 'next/image';

interface BrandSliderProps {
	country: string;
}

const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
	function getUrl() {
		let host = window.location.hostname;
		let url = 'http://localhost:3000';
		if (host != 'localhost') {
			return `https://${host}`;
		}
		return url;
	}
	async function fetchBrands(country: any) {
		try {
			const mappedCountry = country === 'ar' ? 'arg' : country;
			// const url = `https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?country=${mappedCountry}&lang=${mappedCountry}`;
			const url = `${getUrl()}/instituciones/${country}.json`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Error al obtener los datos: ${response.statusText}`);
			}

			const data = await response.json();

			const processedData = data.map((item: any) => {
				const removeCountryFromUrl = (url: string) => {
					let processedUrl = url.replace(/^https?:\/\/[a-z]{2}\./, 'https://');

					if (!processedUrl.includes('//wp.')) {
						processedUrl = processedUrl.replace('//', '//wp.');
					}

					return processedUrl;
				};

				return {
					...item,
					imgDefault: removeCountryFromUrl(item.imgDefault),
					imgHover: removeCountryFromUrl(item.imgHover),
				};
			});

			return processedData.length > 0 ? processedData : await fetchDefaultBrands();
		} catch (error) {
			console.error('Error al obtener las marcas:', error);
			return await fetchDefaultBrands();
		}
	}

	async function fetchDefaultBrands() {
		try {
			const url = 'https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?lang=int';
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error al obtener las marcas por defecto: ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error al obtener las marcas por defecto:', error);
			return [];
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
			<div className='absolute top-0 left-0 z-10 w-16 h-full pointer-events-none bg-gradient-to-r from-white via-white/70 to-transparent'></div>

			{/* Difuminación derecha */}
			<div className='absolute top-0 right-0 z-10 w-16 h-full pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent'></div>

			{/* Contenedor del slider */}
			<div
				className='flex py-4 pl-16 space-x-8 overflow-x-auto scrollbar-hide overscroll-none'
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
									className='object-contain transition-all duration-500 ease-in-out opacity-100 group-hover:hidden'
								/>

								{/* SVG alternativo (hover) */}
								<Image
									src={brand.imgHover} // Imagen SVG para hover
									alt='Brand logo hover'
									width={brand.width}
									height={100}
									className='hidden object-contain transition-all duration-500 ease-in-out opacity-0 group-hover:block group-hover:opacity-100'
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
