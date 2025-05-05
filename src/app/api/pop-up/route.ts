import { NextResponse } from 'next/server';

export const revalidate = 30; // ✅ Cachear durante 30 segundos

export async function GET(request:Request) {
	const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'int';
	try {
		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
			next: { revalidate: 30 }, // ✅ Revalidate en 30 segundos
		});
		const json = await res.json();

		const popUp = json?.sections?.popUp;

		return NextResponse.json({ popUp: popUp });
	} catch (error) {
		return NextResponse.json({ error: 'Error al obtener el popUp' }, { status: 500 });
	}
}
