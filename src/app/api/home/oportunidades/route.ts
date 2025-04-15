// app/api/oportunidades/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int");

    if (!res.ok) {
      throw new Error("Error al obtener los cursos");
    }

    const json = await res.json();
    const secciones = json?.sections?.courses || {};

    // Rescribir el dominio de las imágenes de cada curso
    const fixImageUrls = (courses: any[] = []) => {
      return courses.map((course: any) => ({
        ...course,
        featured_image:
          typeof course.featured_image === "string"
            ? course.featured_image.replace("https://es.wp.msklatam.com", "https://cms1.msklatam.com")
            : "/images/curso-placeholder.jpg", // fallback si no hay imagen
      }));
    };
    

    // Rescribimos las URLs de las imágenes en cada categoría
    const novedades = fixImageUrls(secciones.courses_news || []);
    const recomendados = fixImageUrls(secciones.courses_recommended || []);
    const gratuitos = fixImageUrls(secciones.courses_free || []);

    return NextResponse.json({
      novedades,
      recomendados,
      gratuitos,
    });
  } catch (error) {
    console.error("Error al obtener los cursos de Oportunidades:", error);
    return NextResponse.json({
      novedades: [],
      recomendados: [],
      gratuitos: [],
    });
  }
}
