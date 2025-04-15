// /api/home/mentions/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1");
    const json = await res.json();

    const mentions = json?.sections?.mentions?.mentions || [];

    return NextResponse.json({ mentions });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener las menciones" }, { status: 500 });
  }
}
