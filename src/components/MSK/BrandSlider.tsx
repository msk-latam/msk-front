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
					container.scrollLeft += 2; // Movimiento suave
				}
			}, 16); // Intervalo de 16ms para suavidad
		};

		// Comienza el scroll automáticamente si no está en hover
		if (!isHovered) {
			startScrolling();
		}

		return () => {
			// Limpieza al desmontar el componente
			if (scrollInterval) clearInterval(scrollInterval);
			if (delayTimeout) clearTimeout(delayTimeout);
		};
	}, [isHovered]);

	return (
		<div className='relative'>
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
		</div>
	);
};

export default BrandSlider;
