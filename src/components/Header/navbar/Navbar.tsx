import Image from 'next/image';
import React from 'react';
import logo from '@/public/logo/logo.svg';

const Navbar = () => {
	return (
		<>
			<div className='bg-black'>
				<Image src={logo} alt='MSK' height={200} width={200} />
			</div>
			<nav className='absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white shadow-lg rounded-full px-6 py-2'>
				<button className='text-gray-700 hover:text-gray-900 flex items-center gap-1'>
					Descubre
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='28'
						height='28'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M7 10l5 5 5-5' />
					</svg>
				</button>

				{/* Botón Instituciones */}
				<button className='text-gray-700 hover:text-gray-900'>Instituciones</button>

				{/* Searchbar */}
				<div className='relative flex items-center bg-gray-100 rounded-full px-4'>
					<input
						type='text'
						placeholder='¿Qué tema te interesa?'
						className='bg-transparent focus:outline-none focus:ring-0 border-none w-48 text-gray-700 placeholder-gray-500'
					/>
					<span className='text-gray-500'>🔍</span>
				</div>

				{/* Botones de Cuenta */}
				<button className='text-gray-700 hover:text-gray-900'>Crear cuenta</button>
				<button className='text-gray-700 hover:text-gray-900'>Iniciar sesión</button>
			</nav>
		</>
	);
};

export default Navbar;
