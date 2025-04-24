import { Curso } from './types';

export async function getCursoData(slug: string): Promise<Curso | null> {
	try {
		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/course/${slug}`, {
			cache: 'no-store',
		});

		if (!res.ok) return null;

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error fetching curso:', error);
		return null;
	}
}
