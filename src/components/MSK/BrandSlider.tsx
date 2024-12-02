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
	const [isHovered, setIsHovered] = useState(false);

	const handleScrollStep = (direction: 'prev' | 'next') => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const brandWidth = container.scrollWidth / brands.length; // Ancho de una imagen
		const scrollAmount = direction === 'next' ? brandWidth : -brandWidth;

		container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		let scrollInterval: NodeJS.Timeout | null = null;
		let delayTimeout: NodeJS.Timeout | null = null;

		const startScrolling = () => {
			scrollInterval = setInterval(() => {
				const scrollPosition = Math.round(container.scrollLeft + container.offsetWidth);
				const scrollWidth = Math.round(container.scrollWidth);
				const atEnd = scrollPosition >= scrollWidth - 2; // Tolerancia de 2 píxeles

				if (atEnd) {
					// Detener el intervalo y agregar retraso antes del reinicio
					clearInterval(scrollInterval);
					delayTimeout = setTimeout(() => {
						container.scrollLeft = 0; // Reinicia al principio
						startScrolling(); // Reinicia el scroll
					}, 3000); // 3 segundos de retraso
				} else {
					container.scrollLeft += container.scrollWidth / brands.length; // Moverse al siguiente paso
				}
			}, 3000); // Cada paso se mueve después de 3 segundos
		};

		// Comienza el scroll automáticamente si no está en hover
		if (!isHovered) {
			startScrolling();
		}

		return () => {
			if (scrollInterval) clearInterval(scrollInterval);
			if (delayTimeout) clearTimeout(delayTimeout);
		};
	}, [isHovered, brands.length]);

	return (
		<div className='relative'>
			{/* Botón "Anterior" */}
			<button
				className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
				onClick={() => handleScrollStep('prev')}
			>
				‹
			</button>

			{/* Contenedor con scroll horizontal */}
			<div
				className='overflow-x-auto flex space-x-8 py-4 scrollbar-hide'
				ref={scrollContainerRef}
				onMouseEnter={() => setIsHovered(true)} // Pausar scroll al hacer hover
				onMouseLeave={() => setIsHovered(false)} // Reanudar scroll al salir
			>
				<div className='flex items-center space-x-8'>
					{brands?.map((brand, index) => (
						<div key={index} className='flex-shrink-0'>
							<Image src={brand.img} alt='Brand logo' width={brand.width} height={100} className='object-contain' />
						</div>
					))}
				</div>
			</div>

			{/* Botón "Siguiente" */}
			<button
				className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10'
				onClick={() => handleScrollStep('next')}
			>
				›
			</button>
		</div>
	);
};

export default BrandSlider;
