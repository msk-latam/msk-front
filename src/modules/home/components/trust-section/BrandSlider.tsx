'use client';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface BrandSliderProps {
	country?: string;
	brands?: any[];
}

const BrandSlider: FC<BrandSliderProps> = ({ country, brands: externalBrands }) => {
	const [brands, setBrands] = useState<any[]>(externalBrands ?? []);
	const [currentIndex, setCurrentIndex] = useState(0);

	const mobileScrollRef = useRef<HTMLDivElement | null>(null);
	const desktopScrollRef = useRef<HTMLDivElement | null>(null);

	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const dragMovedRef = useRef(false);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (externalBrands && externalBrands.length) {
			setBrands(externalBrands);
			return;
		}

		if (!country) return;

		(async () => {
			const fetchedBrands = await fetchBrands(country as string);
			setBrands(fetchedBrands);
		})();
	}, [country, externalBrands]);

	useEffect(() => {
		const container = desktopScrollRef.current;
		if (!container || isDragging || isHovered) return;

		const scrollInterval = setInterval(() => {
			const scrollPosition = container.scrollLeft + container.offsetWidth;
			const atEnd = scrollPosition >= container.scrollWidth;

			if (atEnd) {
				container.scrollTo({ left: 0, behavior: 'smooth' });
			} else {
				container.scrollBy({ left: 216, behavior: 'smooth' });
			}
		}, 1500);

		return () => clearInterval(scrollInterval);
	}, [isDragging, isHovered]);

	const fetchBrands = async (country: string) => {
		try {
			const getUrl = () => {
				const host = window.location.hostname;
				return host !== 'localhost' ? `https://${host}` : 'http://localhost:3000';
			};

			const mappedCountry = country === 'ar' ? 'arg' : country;
			const url = `${getUrl()}/instituciones/${country}.json`;
			const response = await fetch(url);
			if (!response.ok) throw new Error('Error al obtener marcas');

			const data = await response.json();
			const processUrl = (url: string) => {
				let processed = url.replace(/^https?:\/\/[a-z]{2}\./, 'https://');
				if (!processed.includes('//wp.')) {
					processed = processed.replace('//', '//wp.');
				}
				return processed;
			};

			return data.length
				? data.map((item: any) => ({
						...item,
						imgDefault: processUrl(item.imgDefault),
						imgHover: processUrl(item.imgHover),
				  }))
				: await fetchDefaultBrands();
		} catch (error) {
			console.error(error);
			return await fetchDefaultBrands();
		}
	};

	const fetchDefaultBrands = async () => {
		try {
			const response = await fetch('https://wp.msklatam.com/wp-json/wp/api/carrusel-instituciones?lang=int');
			if (!response.ok) throw new Error('Error al obtener marcas por defecto');
			return await response.json();
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const scrollToIndex = (index: number) => {
		if (!mobileScrollRef.current) return;

		const container = mobileScrollRef.current;
		const clampedIndex = (index + brands.length) % brands.length;
		const child = container.children[clampedIndex] as HTMLElement;
		setCurrentIndex(clampedIndex);
		child?.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
			block: 'nearest',
		});
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		const container = desktopScrollRef.current;
		if (!container) return;
		setIsDragging(true);
		setStartX(e.pageX - container.offsetLeft);
		setScrollLeft(container.scrollLeft);
		dragMovedRef.current = false;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		const container = desktopScrollRef.current;
		if (!container) return;
		const x = e.pageX - container.offsetLeft;
		const walk = x - startX;
		container.scrollLeft = scrollLeft - walk;
		if (Math.abs(walk) > 5) dragMovedRef.current = true;
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setIsHovered(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (dragMovedRef.current) {
			e.preventDefault();
		}
	};

	const handleWheel = (e: React.WheelEvent) => {
		const container = desktopScrollRef.current;
		if (!container) return;
		container.scrollBy({ left: e.deltaY > 0 ? 200 : -200, behavior: 'smooth' });
	};

	const preventImageDrag = (e: React.DragEvent) => e.preventDefault();

	return (
		<div className='relative pb-5 overflow-visible md:overflow-hidden'>
			<div className='absolute top-0 left-0 z-10 hidden w-16 h-full pointer-events-none md:block bg-gradient-to-r from-white via-white/70 to-transparent' />
			<div className='absolute top-0 right-0 z-10 hidden w-16 h-full pointer-events-none md:block bg-gradient-to-l from-white via-white/70 to-transparent' />

			<div className='relative py-6 overflow-visible md:hidden'>
				<div ref={mobileScrollRef} className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide'>
					{brands.map((brand, index) => (
						<div
							key={index}
							className='flex-shrink-0 snap-center bg-[#F7F9FF] rounded-[30px] px-9 py-6 w-[85%] transition-transform duration-300'
						>
							<a
								href={brand.url || brand.link}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center justify-center h-32 cursor-pointer'
								onDragStart={preventImageDrag}
								onClick={(e) => dragMovedRef.current && e.preventDefault()}
							>
								<Image
									src={brand.imgDefault || brand.image}
									alt='Brand logo'
									width={brand.width || 80}
									height={100}
									className='object-contain mix-blend-multiply '
								/>
							</a>
						</div>
					))}
				</div>

				<button
					type='button'
					onClick={() => scrollToIndex(currentIndex - 1)}
					className='absolute z-10 flex items-center justify-center -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md -bottom-10 left-4 w-9 h-9'
				>
					<ChevronLeft size={20} className='mx-auto' />
				</button>
				<button
					type='button'
					onClick={() => scrollToIndex(currentIndex + 1)}
					className='absolute z-10 flex items-center justify-center -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md -bottom-10 right-4 w-9 h-9'
				>
					<ChevronRight size={20} className='mx-auto' />
				</button>
			</div>

			<div
				ref={desktopScrollRef}
				className='hidden py-4 space-x-4 overflow-x-auto md:flex scrollbar-hide overscroll-none'
				onMouseEnter={() => setIsHovered(true)}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onWheel={handleWheel}
			>
				{brands.map((brand: any, index: number) => (
					<div key={index} className='flex-shrink-0 group bg-[#F7F9FF] rounded-[30px] px-9 py-6'>
						<a
							href={brand.url || brand.link}
							target='_blank'
							rel='noopener noreferrer'
							className='relative flex items-center justify-center h-20 cursor-pointer md:w-32'
							onDragStart={preventImageDrag}
							onClick={handleClick}
						>
							<Image
								src={brand.imgDefault || brand.image}
								alt='Brand logo'
								width={brand.width || 220}
								height={100}
								className='object-contain transition-all duration-500 ease-in-out opacity-100 mix-blend-multiply group-hover:hidden'
							/>
							<Image
								src={brand.imgHover || brand.image}
								alt='Brand logo hover'
								width={brand.width || 220}
								height={100}
								className='hidden object-contain transition-all duration-500 ease-in-out opacity-0 mix-blend-multiply group-hover:block group-hover:opacity-100'
							/>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default BrandSlider;
