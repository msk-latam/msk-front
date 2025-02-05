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
	const { category, lang } = params;
	return generateCategoryMetadata({ category, lang });
}

const CategoryPage: FC<CategoryPageProps> = ({ params }) => {
	const currentCountry = params.lang || cookies().get('country')?.value;
	const { category } = params;

	return (
		<>
			<HotjarTienda />
			<Tienda category={category} country={currentCountry} />
		</>
	);
};

export default CategoryPage;
