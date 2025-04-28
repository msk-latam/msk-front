import { NextResponse } from 'next/server';

export const revalidate = 30; // ✅ Cacheamos por 30 segundos

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
     
      next: { revalidate: 30 }, // ✅ Se actualiza cada 30 segundos
    });

    if (!res.ok) {
      throw new Error("Error al obtener Trust Section");
    }

    const json = await res.json();

    const trustsection = json?.sections?.trustsection;

    const fixedOpinions = trustsection?.opinions?.map((opinion: any) => ({
      ...opinion,
      avatar: [
        opinion.avatar?.[0]?.replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com'),
        ...(opinion.avatar?.slice(1) || []),
      ],
    })) || [];

    return NextResponse.json({
      title: trustsection?.title || '',
      subtitle: trustsection?.subtitle || '',
      figures: trustsection?.figures || [],
      opinions: fixedOpinions,
    });
  } catch (error) {
    console.error("Error en Trust Section:", error);
    return NextResponse.json({
      title: '',
      subtitle: '',
      figures: [],
      opinions: [],
      error: 'Error al obtener la sección trustsection'
    }, { status: 500 });
  }
}
