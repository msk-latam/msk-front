import { NextResponse } from "next/server";

export async function GET(request:Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'int';

  try {
    const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
      next: { revalidate: 0 },
    });
    const json = await res.json();
    return NextResponse.json(json.sections.offers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
