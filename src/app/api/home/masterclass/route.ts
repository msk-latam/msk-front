// src/app/api/home/masterclass/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Hacer la solicitud a la API de WordPress para obtener los datos de MasterClass
    const res = await fetch('https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es');
    const json = await res.json();

    // Acceder a la sección masterclass
    const masterclass = json?.sections?.masterclass || null;

    // Procesar los cursos (si los hay) para estructurarlos de forma más sencilla
    const courses = json?.sections?.courses?.courses_news?.map((course: any) => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      date: course.date,
      featured_image: course.featured_image,
      link: course.link,
    })) || [];

    // Procesar las opiniones (si las hay) para reescribir los enlaces de las imágenes de los avatares
    const fixedOpinions = json?.sections?.trustsection?.opinions?.map((opinion: any) => ({
      ...opinion,
      avatar: [
        opinion.avatar?.[0]?.replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com'), 
        ...opinion.avatar?.slice(1),
      ],
    })) || [];

    // Enviar la respuesta con los datos de masterclass y trustsection procesados
    return NextResponse.json({
      masterclass,
      courses,
      trustsection: {
        title: json?.sections?.trustsection?.title || '',
        subtitle: json?.sections?.trustsection?.subtitle || '',
        figures: json?.sections?.trustsection?.figures || [],
        opinions: fixedOpinions,
      },
    });
  } catch (error) {
    // En caso de error, devolver un mensaje de error
    return NextResponse.json({ error: 'Error al obtener los datos de MasterClass' }, { status: 500 });
  }
}
