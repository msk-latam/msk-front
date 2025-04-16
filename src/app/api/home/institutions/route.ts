import { NextResponse } from "next/server";
import { Institution } from "@/modules/home/types";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Error al obtener las instituciones desde el CMS");
    }

    const json = await res.json();
    const institutions: Institution[] = json.sections?.backups?.institutions || [];

    return NextResponse.json({ institutions });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
