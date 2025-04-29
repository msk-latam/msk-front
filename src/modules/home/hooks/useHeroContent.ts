// app/modules/home/hooks/useBlogContent.ts
import { useEffect, useState } from "react";
import { getHomeData } from "../service/home.service";  // Asegúrate que esta ruta sea correcta
import { HeroSection } from "../types";

export const useHeroContent = () => {
  const [data, setData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos del blog
    getHomeData()
    .then((homeData) => {
      // courseData es todo el objeto del curso
      const heroData: HeroSection = homeData.sections.hero;
      setData(heroData);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching blog data");
    })
    .finally(() => setLoading(false));
  }, []);
  
  return { data, loading, error };
}
