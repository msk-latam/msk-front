// app/modules/home/hooks/useBlogContent.ts
import { useEffect, useState } from "react";
import { getHomeData } from "../service/home.service";  // Asegúrate que esta ruta sea correcta
import { BlogResponse } from "../types";

export const useBlogContent = () => {
  const [data, setData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos del blog
    getHomeData()
    .then((homeData) => {
      const blogData: BlogResponse = homeData.sections.blog;
      setData(blogData);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching blog data");
    })
    .finally(() => setLoading(false));
  }, []);
  
  return { data, loading, error };
}
