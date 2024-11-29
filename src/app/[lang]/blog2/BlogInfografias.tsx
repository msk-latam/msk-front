import React from 'react';

// Si tienes una lista de infografías, la puedes pasar como props o definirla dentro del componente.
const BlogInfografias: React.FC = () => {
	// Ejemplo de una lista de infografías con imágenes
	const infografiaList = [
		{ title: 'Infografía 1', imageUrl: '/images/infografia1.jpg', alt: 'Infografía sobre salud' },
		{ title: 'Infografía 2', imageUrl: '/images/infografia2.jpg', alt: 'Infografía sobre medicina' },
		{ title: 'Infografía 3', imageUrl: '/images/infografia3.jpg', alt: 'Infografía sobre avances médicos' },
	];

	return (
		<section id='infografias' className='py-8'>
			<h2 className='!font-raleway text-4xl font-medium text-[#392C35]'>Infografías</h2>
			<p className='!font-inter text-[#6474A6] text-xl font-light'>Descárgalas, imprímelas y súmalas a tu consultorio</p>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{infografiaList.map((infografia, index) => (
					<div key={index} className='bg-white shadow-md rounded-lg overflow-hidden'>
						<img src={infografia.imageUrl} alt={infografia.alt} className='w-full h-64 object-cover' />
						<div className='p-4'>
							<h3 className='text-lg font-semibold'>{infografia.title}</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default BlogInfografias;
