import Link from 'next/link';
import React from 'react';

const Hero = () => {
	return (
		<div className='h-[800px] w-full bg-gray-400 flex items-center justify-center'>
			<div className='container'>
				{/* esto podria ser un componente A */}
				<div className='flex'>
					<p className='text-white bg-transparent border border-white rounded-3xl px-6 py-1'>Cursos</p>
				</div>
				<p className='text-4xl font-bold text-white'>Cursos de medicina para</p>
				<div className='flex justify-between'>
					<div className='flex gap-3'>
						<span className='text-4xl font-bold text-white'>expandir</span>
						<p className='text-4xl font-bold text-white'>tus metas profesionales</p>
					</div>
					<Link className='text-black bg-white px-6 py-3 rounded-3xl font-semibold' href={''}>
						Comenzá tu experiencia
					</Link>
				</div>
				{/* esto podria ser un componente A */}

				{/* esto podria ser un componente B */}
				<div className='flex'>
					<div>
						<p>cursos</p>
					</div>
					<div>
						<p>cursos</p>
					</div>
					<div>
						<p>cursos</p>
					</div>
					<div>
						<p>cursos</p>
					</div>
				</div>
				{/* esto podria ser un componente B */}
			</div>
		</div>
	);
};

export default Hero;
