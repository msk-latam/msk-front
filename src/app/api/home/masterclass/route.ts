// src/app/api/masterclass/route.ts
import { NextResponse } from "next/server";
import { getProfessionalsFromWP } from "@/modules/home/service/masterclass.service";

const fixImageUrls = (professionals: any[]) => {
  return professionals.map((pro: any) => ({
    ...pro,
    imagenDesktop: pro.imagenDesktop.replace("https://es.wp.msklatam.com", "https://cms1.msklatam.com"),
    imagenMobile: pro.imagenMobile.replace("https://es.wp.msklatam.com", "https://cms1.msklatam.com"),
  }));
};

export async function GET() {
  try {
    // Llamamos al servicio que obtiene los datos de los profesionales
    const professionals = await getProfessionalsFromWP();

    // Reescribimos el dominio de las imágenes
    const professionalsWithFixedImages = fixImageUrls(professionals);

    return NextResponse.json(professionalsWithFixedImages);
  } catch (error) {
    console.error("Error al obtener los datos de los profesionales:", error);
    return NextResponse.json([]);
  }
}
