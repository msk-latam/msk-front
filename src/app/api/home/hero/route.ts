import { NextResponse } from "next/server";

export const revalidate = 30; // ✅ Cachear durante 30 segundos

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
      
      next: { revalidate: 30 }, // ✅ Revalidate en 30 segundos
    });
    const json = await res.json();

    const hero = json?.sections?.hero;

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
