import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const lang = url.searchParams.get('lang') || 'int';

	try {
		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/promos?lang=${lang}`, {
			next: { revalidate: 0 },
		});

		if (!res.ok) {
			throw new Error(`Error fetching promos: ${res.status} ${res.statusText}`);
		}

		const json = await res.json();
		// Aquí no se usa sections.offers, ya que el JSON no tiene esa estructura
		return NextResponse.json(json);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
