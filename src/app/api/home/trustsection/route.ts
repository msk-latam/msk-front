// /src/app/api/home/trustsection/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Hacer la solicitud a la API de WordPress
    const res = await fetch('https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es');
    const json = await res.json();

    // Acceder a la sección trustsection
    const trustsection = json?.sections?.trustsection;

    // Procesar las opiniones (si las hay) para reescribir los enlaces de las imágenes de los avatares
    const fixedOpinions = trustsection?.opinions?.map((opinion: any) => ({
      ...opinion,
      avatar: [
        opinion.avatar?.[0]?.replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com'), 
        ...opinion.avatar?.slice(1),
      ],
    })) || [];

    // Enviar la respuesta con los datos de trustsection procesados
    return NextResponse.json({
      title: trustsection?.title || '',
      subtitle: trustsection?.subtitle || '',
      figures: trustsection?.figures || [],
      opinions: fixedOpinions,
    });
  } catch (error) {
    // En caso de error, devolver un mensaje de error
    return NextResponse.json({ error: 'Error al obtener la sección trustsection' }, { status: 500 });
  }
}
