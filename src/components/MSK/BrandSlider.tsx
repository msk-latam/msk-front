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
		if (!container) {
			// console.log('Contenedor no encontrado, saliendo del efecto.');
			return;
		}

		let scrollInterval: NodeJS.Timeout | null = null;
		let delayTimeout: NodeJS.Timeout | null = null;

		const startScrolling = () => {
			// console.log('Iniciando scroll automático...');
			scrollInterval = setInterval(() => {
				const scrollPosition = Math.round(container.scrollLeft + container.offsetWidth);
				const scrollWidth = Math.round(container.scrollWidth);
				const atEnd = scrollPosition >= scrollWidth - 2; // Margen de tolerancia de 2 píxeles

				// console.log(
				// 	`Posición actual: ${container.scrollLeft}, Ancho visible: ${container.offsetWidth}, Ancho total: ${container.scrollWidth}, ¿Final?: ${atEnd}`,
				// );

				if (atEnd) {
					// console.log('Se alcanzó el final del scroll.');

					// Detener el intervalo cuando se alcanza el final
					if (scrollInterval) {
						clearInterval(scrollInterval);
						// console.log('Scroll detenido temporalmente.');
					}

					// Esperar 3 segundos antes de reiniciar
					delayTimeout = setTimeout(() => {
						// console.log('Reiniciando scroll al inicio después de 3 segundos.');
						container.scrollLeft = 0; // Reiniciar al inicio
						startScrolling(); // Reanudar el scroll
					}, 3000);
				} else {
					container.scrollLeft += 2; // Movimiento suave
					// console.log(`Moviendo scroll a: ${container.scrollLeft}`);
				}
			}, 16); // Intervalo de 16ms para suavidad
		};

		const handleHoverState = (hovered: boolean) => {
			if (hovered) {
				// console.log('Hover detectado, deteniendo scroll.');
				if (scrollInterval) clearInterval(scrollInterval);
				if (delayTimeout) clearTimeout(delayTimeout);
			} else {
				// console.log('Hover terminado, esperando 3 segundos antes de reanudar scroll.');
				delayTimeout = setTimeout(() => {
					startScrolling();
				}, 3000);
			}
		};

		// Agregar retraso inicial antes de comenzar a desplazarse
		if (!isHovered) {
			// console.log('Esperando 3 segundos antes de iniciar el scroll automático.');
			delayTimeout = setTimeout(() => {
				// console.log('Iniciando scroll después del retraso inicial.');
				startScrolling();
			}, 3000);
		}

		return () => {
			// Limpiar intervalo y timeout al desmontar el componente o reiniciar
			if (scrollInterval) {
				clearInterval(scrollInterval);
				// console.log('ScrollInterval limpiado.');
			}
			if (delayTimeout) {
				clearTimeout(delayTimeout);
				// console.log('DelayTimeout limpiado.');
			}
		};
	}, [isHovered]);

	return (
		<div className='relative'>
			{/* Contenedor con scroll horizontal */}
			<div
				className='overflow-x-auto flex space-x-8 py-4 scrollbar-hide'
				ref={scrollContainerRef}
				// Manejo de hover
				onMouseEnter={() => setIsHovered(true)} // Detener al hacer hover
				onMouseLeave={() => setIsHovered(false)} // Reanudar al salir
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
