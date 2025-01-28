import { Product } from '@/data/apiTypes/productTypes';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const countryParam = searchParams.get('country');

	// father_post_type!='downloadable'

	try {
		let url = `https://msklatam.com/products/${countryParam}.json`;

		if (countryParam === 'cl') {
			url = `https://msklatam.com/products/${countryParam}vp.json`;
			// url = `http://localhost:3000/products/${countryParam}vp.json`;
		}

		const response = await fetch(url);
		// const response = await fetch(`https://msklatam.com/products/${countryParam}.json`);
		// const response = await fetch(
		//   `https://wp.msklatam.com/wp-json/wp/api/products?limit=-1&filter=all&country=${countryParam}&vp`,
		// );

		if (!response.ok) {
			throw new Error(`Failed to fetch data from the API`);
		}
		console.log(url, 'url');

		const data = await response.json();
		const { products } = data;

		const nonDownloadableProducts = products.filter((product: Product) => {
			return product.father_post_type !== 'downloadable';
		});

		const transformedProducts = nonDownloadableProducts.map((product: Product) => {
			const totalPriceNumber = parseFloat(product.total_price.replace(/\./g, ''));

			return {
				...product,
				price: totalPriceNumber,
				tags: product.professions,
				horas: product.duration,
			};
		});

		const res = NextResponse.json(transformedProducts);
		// console.log(transformedProducts);

		return res;
	} catch (error) {
		console.error('Error en el endpoint API:', error);
		const res = NextResponse.json({ error: 'Error interno del servidor' });

		return res;
	}
};
