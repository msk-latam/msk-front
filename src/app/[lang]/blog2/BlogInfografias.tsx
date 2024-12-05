import Image from 'next/image';
import React from 'react';

const BlogInfografias: React.FC = () => {
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
	];

	return (
		<section id='infografias' className='py-8'>
			<h2 className='!font-raleway text-3xl font-medium text-[#392C35] mb-1'>Infografías</h2>
			<p className='!font-inter text-[#6474A6] text-lg font-light'>Descárgalas, imprímelas y súmalas a tu consultorio</p>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4'>
				{infografiaList.map((infografia, index) => {
					const {
						title = 'Título no disponible',
						imageUrl = '/placeholder-image.png',
						alt = 'Imagen no disponible',
						link = '#',
					} = infografia;

					return (
						<a key={index} href={link} className='relative bg-white shadow-md rounded-lg overflow-hidden block'>
							<div className='relative w-full h-48'>
								<Image src={imageUrl} alt={alt} layout='fill' objectFit='cover' className='absolute inset-0 rounded-t-lg' />
							</div>
							<div className='absolute bottom-4 left-4 text-black px-3 py-1 rounded'>
								<h3 className='text-base font-semibold'>{title}</h3>
							</div>
						</a>
					);
				})}
			</div>
		</section>
	);
};

export default BlogInfografias;
