'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonSecondary from '@/components/Button/ButtonSecondary';

const BlogInfografias: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	// Lista de infografías con imágenes y enlaces
	const infografiaList = [
		{
			title: 'Análisis del mercado de la medicina estética',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud',
			link: '/infografia/mercado-estetica',
		},
		{
			title: 'Desafíos del diagnóstico y el tratamiento del SIBO',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 2',
			link: '/infografia/mercado-estetica-2',
		},
		{
			title: 'Nuevos subtipos de parkinson',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 3',
			link: '/infografia/mercado-estetica-3',
		},
		{
			title: 'Actualidad de la enfermedad por estreptococos del grupo A (EGA)',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 4',
			link: '#',
		},
		{
			title: 'Actualidad de la enfermedad por estreptococos del grupo A (EGA)',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 5',
			link: '#',
		},
		{
			title: 'Actualidad de la enfermedad por estreptococos del grupo A (EGA)',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 5',
			link: '#',
		},
		{
			title: 'Actualidad de la enfermedad por estreptococos del grupo A (EGA)',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 5',
			link: '#',
		},
		{
			title: 'Actualidad de la enfermedad por estreptococos del grupo A (EGA)',
			imageUrl: '/webp-images/infografias/Rectangle.png',
			alt: 'Infografía sobre salud 5',
			link: '#',
		},
	];

	const handleScroll = (direction: 'left' | 'right') => {
		if (containerRef.current) {
			const scrollAmount = 300; // Ajusta el paso del desplazamiento
			containerRef.current.scrollBy({
				left: direction === 'right' ? scrollAmount : -scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	return (
		<section id='infografias' className='py-8 relative'>
			<div className='flex justify-between items-center'>
				<div>
					<h2 className='!font-raleway text-3xl font-medium text-[#392C35] mb-1'>Infografías</h2>
					<p className='!font-inter text-[#6474A6] text-lg font-light'>Descárgalas, imprímelas y súmalas a tu consultorio</p>
				</div>
				<div>
					<Link href={'/tienda/?recurso=guias-profesionales'} className={`sm:block flex-shrink-0`}>
						<ButtonSecondary
							className='!leading-none border-solid border-1 border-neutral-200 text-neutral-400'
							sizeClass='px-3 py-2 sm:py-3 sm:px-6 text-[11px]'
						>
							<span className='text-[11px] sm:text-sm'>Ver más</span>
							<svg className='w-3 h-3 sm:w-5 sm:h-5 ml-3 rtl:rotate-180' viewBox='0 0 24 24' fill='none'>
								<path
									d='M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeMiterlimit='10'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M3.5 12H20.33'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeMiterlimit='10'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</ButtonSecondary>
					</Link>
				</div>
			</div>

			<div className='relative -mx-4 sm:-mx-6 lg:mx-0 overflow-hidden'>
				<div className='flex items-center gap-2'>
					{/* <button
						onClick={() => handleScroll('left')}
						className='bg-white dark:bg-neutral-900 border border-neutral-200 rounded-full w-[70px] h-10 flex items-center justify-center hover:border-neutral-300'
						title='Previous'
					>
						<i className='las la-angle-left'></i>
					</button> */}

					<div ref={containerRef} className='flex gap-6 whitespace-nowrap my-4 items-center overflow-x-hidden relative'>
						{infografiaList.map((infografia, index) => (
							<a
								key={index}
								href={infografia.link}
								className='relative bg-white shadow-md rounded-lg block w-64 flex-shrink-0'
							>
								<div className='relative h-48'>
									<Image
										src={infografia.imageUrl}
										alt={infografia.alt}
										layout='fill'
										objectFit='cover'
										className='inset-0 rounded-t-lg'
									/>
								</div>
								<div className='absolute bottom-4 text-black px-3 py-1 rounded'>
									<h3 className='text-base font-semibold relative text-wrap'>{infografia.title}</h3>
								</div>
							</a>
						))}
					</div>

					<button
						onClick={() => handleScroll('right')}
						className='bg-white dark:bg-neutral-900 border border-neutral-200 rounded-full w-[70px] h-10 flex items-center justify-center hover:border-neutral-300'
						title='Next'
					>
						<i className='las la-angle-right'></i>
					</button>
				</div>
			</div>
		</section>
	);
};

export default BlogInfografias;
