import { FC } from 'react';
import { cookies } from 'next/headers';
import Tienda from './Tienda';

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
      <Tienda category={category} country={currentCountry} />
    </>
  );
};

export default CategoryPage;
