// app/[lang]/tienda/[category]/page.tsx
import { generateCategoryMetadata } from '@/SEO/tienda/categoryMetadata';
import CategoryLayout from './CategoryLayout';

interface Props {
	params: { category: string; lang: string };
}

export const generateMetadata = ({ params }: Props) => {
	return generateCategoryMetadata({ category: params.category, lang: params.lang });
};

export default function CategoryPage({ params }: Props) {
	return <CategoryLayout category={params.category} lang={params.lang} />;
}
