import { FC } from 'react';
import { cookies } from 'next/headers';
import Tienda from './Tienda';
import HotjarTienda from '@/hotjar/HotjarTienda';

interface CategoryPageProps {
	params: {
		category: string;
		lang: string;
	};
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
