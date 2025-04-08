import { BlogPost } from "../types";  // Asegúrate de tener el tipo BlogPost bien definido

export const getBlogPosts = async (): Promise<{
  title: string;
  subtitle: string;
  featured_blog_articles: BlogPost[];
}> => {
  try {
    // Hacer el fetch a la API interna de Next.js
    const res = await fetch("/api/home/blog");

    if (!res.ok) {
      throw new Error("Error al obtener los posts del blog");
    }

    // Parsear la respuesta JSON
    const data = await res.json();

    // Devolver los datos obtenidos
    return {
      title: data.title || '',
      subtitle: data.subtitle || '',
      featured_blog_articles: data.featured_blog_articles || [],
    };
  } catch (error) {
    console.error("Error al cargar los posts del blog:", error);
    return {
      title: '',
      subtitle: '',
      featured_blog_articles: [],
    };
  }
};
