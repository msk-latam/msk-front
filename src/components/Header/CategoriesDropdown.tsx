import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { Specialty } from '@/data/types';
import React, { useEffect, useRef, useState } from 'react';
import breadcrumArrowIcon from '/public/images/icons/breadcrum_arrow.svg';
import especialidadesIcon from '@/public/webp-images/icons/especialidadesIcon.svg';
import ofrecemosIcon from '@/public/webp-images/icons/ofrecemosIcon.svg';
import recursosIcon from '@/public/webp-images/icons/recursosIcon.svg';
import Image from 'next/image';
import Link from 'next/link';

const CategoriesDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	let categories: Specialty[] = useStoreFilters().specialties;

	const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false); // Cerrar el dropdown si se hace clic fuera
			}
		};

		// Agregar el evento de clic cuando el menú está abierto
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		// Limpiar el evento cuando el componente se desmonte o el menú se cierre
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className='relative inline-block' ref={dropdownRef}>
			<button className='bg-[#9200AD] text-white py-2 px-4 rounded-2xl hover:bg-[#FF5D5E]' onClick={toggleDropdown}>
				Descubre
			</button>

			{isOpen && (
				<div className='absolute mt-2 w-[24vw] bg-white shadow-lg rounded-md p-4'>
					<ul className='py-2'>
						<li className='flex gap-2 items-center px-4 py-2'>
							<Image src={especialidadesIcon} alt='icon' width={20} height={20} />
							<h2 className='!font-inter'>Especialidades</h2>
						</li>
						{sortedCategories.map((category, index) => (
							<li
								key={index}
								className='flex justify-between items-center px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'
							>
								<span>{category.name}</span>
								<img src={`${breadcrumArrowIcon.src}`} className='w-3 h-3' alt='Arrow' />
							</li>
						))}
						<li className='flex-col'>
							<div className='flex gap-2 items-center px-4 py-2'>
								<Image src={ofrecemosIcon} alt='icon' width={20} height={20} />
								<h2 className='!font-inter'>Qué Ofrecemos</h2>
							</div>
							<ul className='flex flex-col'>
								<li className='px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'>
									<Link href={'/tienda/?profesion=medicos&recurso=curso'}>Cursos para personal médico</Link>
								</li>
								<li className='px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'>
									<Link href={'/tienda/?profesion=otra-profesion'}>Cursos para enfermería y otras profesiones</Link>
								</li>
							</ul>
						</li>

						<li className='flex gap-2 items-center px-4 py-2'>
							<Image src={recursosIcon} alt='icon' width={20} height={20} />
							<h2 className='!font-inter'>Recursos</h2>
						</li>
						<ul className='flex flex-col'>
							<li className='px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'>
								<Link href={'/tienda/?recurso=guias-profesionales'}>Guías Profesionales</Link>
							</li>
							<li className='px-4 py-2 hover:bg-violet-100 cursor-pointer text-[#6474A6] hover:font-bold rounded-md'>
								<Link href={'/blog'}>Blog</Link>
							</li>
						</ul>
					</ul>
				</div>
			)}
		</div>
	);
};

export default CategoriesDropdown;
