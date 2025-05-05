import { NextResponse } from "next/server";
import { Institution } from "@/modules/home/types";

export const revalidate = 30; // ✅ Cachear 30 segundos

export async function GET(request:Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'int';
  try {
    const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
      
      next: { revalidate: 30 }, // ✅ Actualizar cada 30 segundos
    });

    if (!res.ok) {
      throw new Error("Error al obtener las instituciones desde el CMS");
    }

    const json = await res.json();
    const institutions: Institution[] = json.sections?.backups?.institutions || [];

    return NextResponse.json({ institutions });
  } catch (error) {
    console.error("Error en Institutions:", error);
    return NextResponse.json({ institutions: [], error: (error as Error).message }, { status: 500 });
  }
}
