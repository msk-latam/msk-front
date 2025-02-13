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

const EitnerCrum: React.FC<EitnerCrumProps> = ({ product, post }) => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);

	if (pathSegments.length === 0) return null;

	// Lista de países (puedes agregar más si es necesario)
	const countryList = ['cl', 'pe', 'mx'];

	const hasCountry = countryList.includes(pathSegments[0]);
	const countrySegment = hasCountry ? pathSegments[0] : 'ar'; // Si no hay país, asumimos Argentina

	// Ajustamos el índice del segmento
	const mainSegmentIndex = hasCountry ? 1 : 0;
	const isBlog = pathSegments[mainSegmentIndex] === 'blog';
	const isTienda = pathSegments[mainSegmentIndex] === 'tienda';

	const tiendaSegment = 'Tienda';
	const blogSegment = 'Blog';

	const categoriaSegment =
		product && product.ficha.categorias.length > 0
			? product.ficha.categorias[0].name
			: post && post.categories.length > 0
			? post.categories[0].name
			: isTienda && pathSegments.length === mainSegmentIndex + 1
			? ''
			: pathSegments[mainSegmentIndex + 1] || 'Categoría';

	const productOrPostSegment = product ? product.ficha.title : post ? post.title : pathSegments[mainSegmentIndex + 2] || '';

	const breadcrumbLinks = isBlog
		? [
				{
					href: hasCountry ? `/${countrySegment}/blog` : `/blog`,
					label: blogSegment,
					isLastSegment: pathSegments.length === mainSegmentIndex + 1,
				},
				!post &&
					pathSegments.includes('archivo') && {
						href: hasCountry ? `/${countrySegment}/blog/archivo` : `/blog/archivo`,
						label: 'Archivo',
						isLastSegment: pathSegments.length === mainSegmentIndex + 2,
					},
				post &&
					post.categories[0] && {
						href: hasCountry
							? `/${countrySegment}/blog/archivo/?categoria=${normalizeUrlSegment(post.categories[0].name)}`
							: `/blog/archivo/?categoria=${normalizeUrlSegment(post.categories[0].name)}`,
						label: formatLabel(post.categories[0].name),
						isLastSegment: pathSegments.length === mainSegmentIndex + 2,
					},
				post && {
					href: hasCountry
						? `/${countrySegment}/blog/${normalizeUrlSegment(post.title)}`
						: `/blog/${normalizeUrlSegment(post.title)}`,
					label: formatLabel(post.title),
					isLastSegment: true,
				},
		  ].filter(Boolean)
		: [
				{
					href: hasCountry ? `/${countrySegment}/tienda` : `/tienda`,
					label: tiendaSegment,
					isLastSegment: !product && pathSegments.length === mainSegmentIndex + 1,
				},
				categoriaSegment &&
					categoriaSegment.trim() !== '' && {
						href: hasCountry
							? `/${countrySegment}/tienda/${normalizeUrlSegment(categoriaSegment)}`
							: `/tienda/${normalizeUrlSegment(categoriaSegment)}`,
						label: formatLabel(categoriaSegment),
						isLastSegment: !product && pathSegments.length === mainSegmentIndex + 2,
					},
				product && {
					href: hasCountry
						? `/${countrySegment}/curso/${normalizeUrlSegment(productOrPostSegment)}`
						: `/curso/${normalizeUrlSegment(productOrPostSegment)}`,
					label: formatLabel(productOrPostSegment),
					isLastSegment: true,
				},
		  ].filter(Boolean);

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
