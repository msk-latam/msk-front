// app/curso/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Curso = {
	title: string;
	content: string;
	featured_image: string;
	date: string;
	// Agrega más campos según la respuesta real de la API
};

type Props = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const data = await getCursoData(params.slug);

	if (!data) return { title: 'Curso no encontrado' };

	return {
		title: `${data.title} | MSK`,
	};
}

async function getCursoData(slug: string): Promise<Curso | null> {
	try {
		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/course/${slug}`, {
			cache: 'no-store', // o 'force-cache' si quieres SSR con cache
		});

		if (!res.ok) return null;

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error fetching curso:', error);
		return null;
	}
}

export default async function CursoPage({ params }: Props) {
	const curso = await getCursoData(params.slug);

	if (!curso) return notFound();

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-4'>{curso.title}</h1>
			{curso.featured_image && <img src={curso.featured_image} alt={curso.title} className='mb-4 w-full h-auto rounded' />}
			<p className='mt-6 text-sm text-gray-500'>Publicado el {new Date(curso.date).toLocaleDateString()}</p>
		</div>
	);
}
