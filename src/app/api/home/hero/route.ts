// app/api/hero/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
      next: { revalidate: 0 },
    });
    const json = await res.json();

    const hero = json?.sections?.hero;

    // Reescribir el dominio de las imágenes de cada slide
    const fixedSlides = hero?.slides?.map((slide: any) => ({
      ...slide,
      background_image: [
        slide.background_image?.[0]?.replace("https://es.wp.msklatam.com", "https://cms1.msklatam.com"),
        ...slide.background_image?.slice(1),
      ],
    })) || [];

    return NextResponse.json({ slides: fixedSlides });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener el hero" }, { status: 500 });
  }
}
