import { Product } from '@/data/apiTypes/productTypes';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const countryParam = searchParams.get('country');

  try {
    const response = await fetch(
      `https://wp.msklatam.com/wp-json/wp/api/products?limit=-1&filter=all&country=${countryParam}&type=course`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data from the API`);
    }

    const data = await response.json();
    const { products } = data;

    const transformedProducts = products.map((product: Product) => {
      const totalPriceNumber = parseFloat(
        product.total_price.replace(/\./g, ''),
      );

      return {
        ...product,
        price: totalPriceNumber,
        tags: product.professions,
        horas: product.duration,
      };
    });

    const res = NextResponse.json(transformedProducts);

    return res;
  } catch (error) {
    console.error('Error en el endpoint API:', error);
    const res = NextResponse.json({ error: 'Error interno del servidor' });

    return res;
  }
};
