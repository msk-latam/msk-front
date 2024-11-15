// generateCategoryMetadata.ts
import { Metadata } from 'next';

interface GenerateCategoryMetadataProps {
	category: string;
	lang: string;
}

export function generateCategoryMetadata({ category, lang }: GenerateCategoryMetadataProps): Metadata {
	const canonicalUrl = `https://msklatam.com/${lang}/tienda/${category}/`;

	return {
		title: `MSK | Tienda y recursos`,
		description: `Descubre nuestro catálogo de cursos, entradas de blog y guías profesionales diseñados para impulsarte en tu carrera y profundizar en tus conocimientos.`,
		alternates: {
			canonical: canonicalUrl,
		},
	};
}
