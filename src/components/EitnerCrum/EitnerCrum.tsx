'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import breadcrumHomeIcon from '/public/images/icons/breadcrum_home.svg';
import breadcrumArrowIcon from '/public/images/icons/breadcrum_arrow.svg';

interface Product {
	ficha: {
		title: string;
		categorias: { name: string }[];
	};
}

interface Post {
	title: string;
	categories: {
		name: string;
	}[];
}

interface EitnerCrumProps {
	product?: Product;
	post?: Post;
}

const EitnerCrum: React.FC<EitnerCrumProps> = ({ product, post }) => {
	console.log(post);
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);

	if (pathSegments.length === 0) return null;

	const countrySegment = pathSegments[0];
	const isBlog = pathSegments[1] === 'blog';
	const tiendaSegment = 'Tienda';
	const blogSegment = 'Blog';
	const categoriaSegment = product
		? product.ficha.categorias[0].name
		: post
		? post.categories[0].name
		: pathSegments[1] === 'tienda' && pathSegments.length === 2 // Si estás en /tienda, no mostrar categoría
		? ''
		: pathSegments[2] || 'Categoría';
	const productOrPostSegment = product ? product.ficha.title : post ? post.title : pathSegments[3] || '';

	console.log(post?.categories);

	const normalizeUrlSegment = (segment: string) => {
		if (!segment) return '';
		return segment
			.toLowerCase() // Convertir a minúsculas
			.normalize('NFD') // Descomponer caracteres acentuados
			.replace(/[\u0300-\u036f]/g, '') // Eliminar marcas de acentos
			.replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres no válidos por guiones
			.replace(/^-+|-+$/g, ''); // Eliminar guiones adicionales al inicio o final
	};

	const formatLabel = (label: string) => {
		return label.replace(/-/g, ' ');
	};
	console.log(pathSegments.length === 3);

	const breadcrumbLinks = isBlog
		? [
				{
					href: `/${countrySegment}/blog`,
					label: blogSegment,
					isLastSegment: pathSegments.length === 2,
				},
				!post &&
					pathSegments.includes('archivo') && {
						href: `/${countrySegment}/blog/archivo`,
						label: 'Archivo',
						isLastSegment: pathSegments.length === 3,
					},
				post &&
					post.categories[0] && {
						href: `/${countrySegment}/blog/archivo/?categoria=${normalizeUrlSegment(post.categories[0].name)}`,
						label: formatLabel(post.categories[0].name.charAt(0).toUpperCase() + post.categories[0].name.slice(1)),
						isLastSegment: !post && pathSegments.length === 3,
					},
				post && {
					href: `/${countrySegment}/blog/${normalizeUrlSegment(post.title)}`,
					label: formatLabel(post.title),
					isLastSegment: true,
				},
		  ]
		: [
				{
					href: `/${countrySegment}/tienda`,
					label: tiendaSegment,
					isLastSegment: !product && pathSegments.length === 2,
				},

				categoriaSegment &&
					categoriaSegment.trim() !== '' && {
						href: `/${countrySegment}/tienda/${normalizeUrlSegment(categoriaSegment)}`,
						label: formatLabel(categoriaSegment.charAt(0).toUpperCase() + categoriaSegment.slice(1)),
						isLastSegment: !product && pathSegments.length === 3,
					},
				product && {
					href: `/${countrySegment}/curso/${normalizeUrlSegment(productOrPostSegment)}`,
					label: formatLabel(productOrPostSegment),
					isLastSegment: true,
				},
		  ].filter(Boolean);

	console.log(breadcrumbLinks);

	return (
		<nav aria-label='breadcrumb' className='mb-4'>
			<ol className='flex items-center space-x-2'>
				<li>
					<Link href={`/${countrySegment}`} className='text-[#ABABAB] font-medium hover:underline'>
						<Image src={breadcrumHomeIcon} alt='Home' width={18} height={18} />
					</Link>
				</li>

				{breadcrumbLinks.map((link, index) =>
					link ? (
						<React.Fragment key={link.href}>
							<li>
								<Image src={breadcrumArrowIcon} alt='Arrow' width={6} height={6} />
							</li>
							<li>
								{link.isLastSegment ? (
									<span className='text-[#ABABAB] font-bold'>{link.label}</span>
								) : (
									<Link href={link.href} className='text-[#ABABAB]  hover:underline hover:text-[#FF5D5E]'>
										{link.label}
									</Link>
								)}
							</li>
						</React.Fragment>
					) : null,
				)}
			</ol>
		</nav>
	);
};

export default EitnerCrum;
