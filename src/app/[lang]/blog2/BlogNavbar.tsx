'use client';
import React, { useEffect, useState } from 'react';

const BlogNavbar = () => {
	const menuItems = [
		{ label: 'Archivo', href: '#archivo' },
		{ label: 'Guías Profesionales', href: '#guias-profesionales' },
		{ label: 'Videos', href: '#videos' },
		{ label: 'Infografías', href: '#infografias' },
		{ label: 'Arma tu CV', href: '#arma-tu-cv' },
	];

	const [activeSection, setActiveSection] = useState('');

	// Detecta la sección activa al hacer scroll
	useEffect(() => {
		const handleScroll = () => {
			const offsets = menuItems.map((item) => {
				const section = document.querySelector(item.href);
				return {
					href: item.href,
					offsetTop: section ? section.offsetTop : 0,
				};
			});

			const scrollPosition = window.scrollY + 100; // Ajuste para considerar sticky navbar

			const current = offsets.findLast((item) => scrollPosition >= item.offsetTop);

			if (current) {
				setActiveSection(current.href);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className='bg-white shadow-md sticky top-0 z-50'>
			<ul className='flex'>
				{menuItems.map((item, index) => (
					<li key={item.label} className={`flex items-center ${index !== 0 ? 'border-l border-gray-300' : ''}`}>
						<a
							href={item.href}
							className={`px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
								activeSection === item.href ? 'font-bold text-blue-600' : ''
							}`}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default BlogNavbar;
