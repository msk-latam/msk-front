import { useEffect, useState } from "react";
import { getBlogPosts } from "../service/blog.service";  // Importa el servicio para obtener los posts
import { BlogPost } from "../types";  // Asegúrate de tener el tipo BlogPost

export const useBlogContent = () => {
  const [data, setData] = useState<{
    title: string;
    subtitle: string;
    featured_blog_articles: BlogPost[];
  }>({
    title: '',
    subtitle: '',
    featured_blog_articles: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos del blog
    getBlogPosts()
      .then((response) => setData(response))
      .catch((error) => console.error("Error al cargar los datos del blog:", error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
