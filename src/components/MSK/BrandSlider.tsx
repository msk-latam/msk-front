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
						container.scrollTo({ left: 0, behavior: 'smooth' }); // Reinicia al principio
						startScrolling(); // Reinicia el scroll
					}, 3000); // 3 segundos de retraso
				} else {
					const brandWidth = container.scrollWidth / brands.length; // Ancho de una imagen
					container.scrollBy({ left: brandWidth, behavior: 'smooth' }); // Movimiento suave
				}
			}, 3000); // Cada paso se mueve después de 3 segundos
		};

		startScrolling();

		return () => {
			if (scrollInterval) clearInterval(scrollInterval);
			if (delayTimeout) clearTimeout(delayTimeout);
		};
	}, [brands.length]);

	return (
		<div className='relative'>
			{/* Contenedor con scroll horizontal */}
			<div className='overflow-x-auto flex space-x-8 py-4 scrollbar-hide' ref={scrollContainerRef}>
				<div className='flex items-center space-x-8'>
					{brands?.map((brand, index) => (
						<div key={index} className='flex-shrink-0'>
							{/* Enlace envolviendo la imagen */}
							<a href={brand.url} target='_blank' rel='noopener noreferrer'>
								<Image
									src={brand.img}
									alt='Brand logo'
									width={brand.width}
									height={100}
									className='object-contain cursor-pointer' // Cursor pointer agregado
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
