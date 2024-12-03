'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { BRANDS_BY_COUNTRY } from '@/data/MSK/brands';
import Image from 'next/image';

interface BrandSliderProps {
	country: string;
}

const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
	const brands = BRANDS_BY_COUNTRY[country] || BRANDS_BY_COUNTRY['default'];
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [isHovering, setIsHovering] = useState(false); // Estado para controlar el hover

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		let scrollInterval: NodeJS.Timeout | null = null;
		let delayTimeout: NodeJS.Timeout | null = null;

		const startScrolling = () => {
			scrollInterval = setInterval(() => {
				if (isHovering) return; // Si está en hover, no hacer scroll

				const scrollPosition = Math.round(container.scrollLeft + container.offsetWidth);
				const scrollWidth = Math.round(container.scrollWidth);
				const atEnd = scrollPosition >= scrollWidth - 2; // Tolerancia de 2 píxeles

				if (atEnd) {
					clearInterval(scrollInterval);
					delayTimeout = setTimeout(() => {
						container.scrollTo({ left: 0, behavior: 'smooth' });
						startScrolling();
					}, 3000);
				} else {
					// Calcular un desplazamiento proporcional y más suave
					const brandWidth = container.querySelector('div > div')?.clientWidth || 0; // Obtener el ancho de la primera imagen
					const scrollAmount = brandWidth * 0.3; // Desplazar solo el 50% del ancho de la imagen
					container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
				}
			}, 3000);
		};

		// Retrasar el inicio del scroll para asegurarse de que las imágenes se han cargado
		delayTimeout = setTimeout(() => {
			startScrolling();
		}, 100); // Ajusta este valor según sea necesario

		return () => {
			if (scrollInterval) clearInterval(scrollInterval);
			if (delayTimeout) clearTimeout(delayTimeout);
		};
	}, [brands.length, isHovering]);

	const handleWheel = (event: React.WheelEvent) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		// Retroceder cuando se mueva la rueda hacia atrás
		if (event.deltaY < 0) {
			container.scrollBy({ left: -200, behavior: 'smooth' }); // Desplazamiento más pequeño
		} else {
			container.scrollBy({ left: 200, behavior: 'smooth' }); // Desplazamiento más pequeño
		}
	};

	return (
		<div className='relative'>
			<div
				className='overflow-x-auto flex space-x-8 py-4 scrollbar-hide overscroll-none'
				ref={scrollContainerRef}
				onWheel={handleWheel} // Agregar el evento de la rueda
				onMouseEnter={() => setIsHovering(true)} // Pausar cuando el mouse entra
				onMouseLeave={() => setIsHovering(false)} // Reanudar cuando el mouse sale
			>
				<div className='flex items-center space-x-8'>
					{brands?.map((brand, index) => (
						<div key={index} className='flex-shrink-0'>
							<a href={brand.url} target='_blank' rel='noopener noreferrer'>
								<Image
									src={brand.img}
									alt='Brand logo'
									width={brand.width}
									height={100}
									className='object-contain cursor-pointer'
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
