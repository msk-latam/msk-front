import { NextResponse } from 'next/server';

export const revalidate = 30;

export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const lang = url.searchParams.get('lang') || 'int';

		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
			next: { revalidate: 0 },
		});

		if (!res.ok) throw new Error('Error al obtener los cursos');

		const json = await res.json();
		const coursesSection = json?.sections?.courses || {};

		const fixImageUrls = (courses: any[] = []) =>
			courses.map((course: any) => ({
				...course,
				featured_image:
					typeof course.featured_image === 'string'
						? course.featured_image.replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com')
						: '/images/curso-placeholder.jpg',
			}));

		const title = coursesSection.title || '';
		const subtitle = coursesSection.subtitle || '';
		const novedades = fixImageUrls(coursesSection.courses_news || []);
		const recomendados = fixImageUrls(coursesSection.courses_recommended || []);
		const gratuitos = fixImageUrls(coursesSection.courses_free || []);

		return NextResponse.json({
			title,
			subtitle,
			novedades,
			recomendados,
			gratuitos,
		});
	} catch (error) {
		console.error('Error al obtener los cursos de Oportunidades:', error);
		return NextResponse.json({
			title: '',
			subtitle: '',
			novedades: [],
			recomendados: [],
			gratuitos: [],
		});
	}
}
