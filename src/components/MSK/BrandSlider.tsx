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
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [dragMoved, setDragMoved] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

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
			}, 3000);
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
			{/* <div className='absolute top-0 left-0 h-full w-10 pointer-events-none bg-gradient-to-r from-white via-white/70 to-transparent z-10'></div> */}

			{/* Difuminación derecha */}
			<div className='absolute top-0 right-0 h-full w-20 pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent z-10'></div>

			{/* Contenedor del slider */}
			<div
				className='overflow-x-auto flex space-x-8 py-4 scrollbar-hide overscroll-none'
				ref={scrollContainerRef}
				onMouseEnter={() => setIsHovered(true)} // Detener el scroll automático
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onWheel={handleWheel}
			>
				<div className='flex items-center space-x-8'>
					{brands?.map((brand, index) => (
						<div key={index} className='flex-shrink-0'>
							<a
								href={brand.url}
								target='_blank'
								rel='noopener noreferrer'
								onClick={handleClick}
								draggable={false}
								onDragStart={preventImageDrag}
							>
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
