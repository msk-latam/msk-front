// app/modules/home/hooks/useBlogContent.ts
import { useEffect, useState } from "react";
import { getBlogPosts } from "../service/blog.service";  // Asegúrate que esta ruta sea correcta
import { BlogResponse } from "../types";

export const useBlogContent = () => {
  const [data, setData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos del blog
    getBlogPosts()
      .then(setData)
      .catch((error) => console.error("Error al cargar los datos del blog:", error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};