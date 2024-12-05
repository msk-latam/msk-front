'use client';
import React, { useEffect, useState } from 'react';

const BlogNavbar = () => {
	const menuItems = [
		{ label: 'Artículos', href: '#archivo' },
		{ label: 'Guías profesionales', href: '#guias-profesionales' },
		{ label: 'Videos', href: '#videos' },
		{ label: 'Infografías', href: '#infografias' },
	];

	const [activeSection, setActiveSection] = useState('');
	const [isFixed, setIsFixed] = useState(false);

	// Detectar el scroll y cambiar la posición del navbar
	useEffect(() => {
		const threshold = -50; // Umbral para volver a relativo un poco antes de llegar al tope

		const handleScroll = () => {
			const navbar = document.querySelector('#blog-navbar') as HTMLElement | null;
			const navbarTop = (navbar?.offsetTop || 0) - threshold; // Reducir el umbral

			// Fijar el navbar si el scroll supera su posición ajustada
			setIsFixed(window.scrollY > navbarTop);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Detectar la sección activa al hacer scroll
	useEffect(() => {
		const handleScroll = () => {
			const offsets = menuItems.map((item) => {
				const section = document.querySelector(item.href) as HTMLElement | null;
				return {
					href: item.href,
					offsetTop: section ? section.offsetTop : 0,
				};
			});

			const scrollPosition = window.scrollY + 100;

			const current = offsets.findLast((item) => scrollPosition >= item.offsetTop);

			if (current) {
				setActiveSection(current.href);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [menuItems]);

	// Actualizar activeSection al hacer clic
	const handleClick = (href: string) => {
		setActiveSection(href);
	};

	return (
		<nav
			id='blog-navbar'
			className={`z-50 bg-[#F3F4F6] w-screen -translate-x-1/2 left-1/2 transition-all duration-300 ${
				isFixed ? 'fixed top-0' : 'relative'
			}`}
		>
			<div className='container'>
				<ul className='flex'>
					{menuItems.map((item, index) => (
						<li key={item.label} className={`flex items-center ${index !== 0 ? 'border-l border-gray-300' : ''}`}>
							<a
								href={item.href}
								onClick={() => handleClick(item.href)} // Actualizar al hacer clic
								className={`py-2 text-[#392C35] hover:text-[#FF5D5E] transition-colors duration-200 ${
									index === 0 ? 'pr-4' : 'px-4'
								} ${activeSection === item.href ? 'font-bold text-[#FF5D5E]' : ''}`}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default BlogNavbar;
