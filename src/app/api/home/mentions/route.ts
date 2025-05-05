// /api/home/mentions/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'int';

  try {
    const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
      next: { revalidate: 0 },
    });
    const json = await res.json();

    const mentions = json?.sections?.mentions?.mentions || [];

    return NextResponse.json({ mentions });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener las menciones" }, { status: 500 });
  }
}
