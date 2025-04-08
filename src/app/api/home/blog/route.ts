import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Hacer el fetch a la API externa de WordPress
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es");

    // Verificar que la respuesta sea exitosa
    if (!res.ok) {
      throw new Error("Error al obtener los datos del blog");
    }

    // Parsear la respuesta a formato JSON
    const json = await res.json();

    // Extraer la sección del blog
    const blogSection = json?.sections?.blog || {};

    // Si no se encuentra la sección, devolver un array vacío
    const featured_blog_articles = blogSection.featured_blog_articles || [];

    // Opcional: Si quieres modificar las URLs de las imágenes, puedes hacerlo aquí
    const fixImageUrls = (posts: any[]) => {
      return posts.map((post: any) => ({
        ...post,
        featured_image: post.featured_image?.replace("https://es.wp.msklatam.com", "https://cms1.msklatam.com") || "/images/default-image.jpg",
      }));
    };

    // Modificar las imágenes de los posts destacados
    const modifiedBlogPosts = fixImageUrls(featured_blog_articles);

    // Devolver los datos modificados
    return NextResponse.json({
      title: blogSection.title || '',
      subtitle: blogSection.subtitle || '',
      featured_blog_articles: modifiedBlogPosts,
    });

  } catch (error) {
    console.error("Error al obtener los datos del blog:", error);
    return NextResponse.json({
      title: '',
      subtitle: '',
      featured_blog_articles: [],
    }, { status: 500 });
  }
}
