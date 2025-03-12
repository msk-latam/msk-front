import Image from 'next/image';
import React from 'react';
import logo from '@/public/logo/logo.svg';
import { Search } from 'react-feather';

const Navbar = () => {
	return (
		<>
			{/* Contenedor del navbar con posición relativa */}
			<div className='flex items-center justify-center gap-4'>
				{/* Logo flotante */}
				<div className=' bg-black'>
					<Image src={logo} alt='MSK' height={100} width={100} />
				</div>

				{/* Navbar */}
				<nav className=' flex items-center gap-6 bg-white shadow-lg rounded-full px-6 py-2'>
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
						<div className='bg-[#9200AD] p-2 rounded-full flex items-center justify-center'>
							<Search className='text-white w-5 h-5' />
						</div>
					</div>

					{/* Botones de Cuenta */}
					<button className='text-[#9200AD] border border-[#9200AD] rounded-3xl px-4 py-2'>Crear cuenta</button>
					<button className='text-gray-700 border border-[#DBDDE2] rounded-3xl px-4 py-2 '>Iniciar sesión</button>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
