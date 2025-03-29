import { FC } from 'react';
import { cookies } from 'next/headers';
import Tienda from './Tienda';
import HotjarTienda from '@/hotjar/HotjarTienda';
import { generateCategoryMetadata } from '@/SEO/tienda/categoryMetadata';
import { Metadata } from 'next';

interface CategoryPageProps {
	params: {
		category: string;
		lang: string;
	};
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { category } = params;
	return generateCategoryMetadata({ category, lang: 'ar' });
}

const CategoryPage: FC<CategoryPageProps> = ({ params }) => {
	const currentCountry = 'ar';
	const { category } = params;

	return (
		<>
			<HotjarTienda />
			<Tienda category={category} country={currentCountry} />
		</>
	);
};

export default CategoryPage;
