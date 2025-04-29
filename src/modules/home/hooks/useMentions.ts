import { useEffect, useState } from "react";
import { getHomeData } from "../service/home.service";  // Asegúrate que esta ruta sea correcta
import { Mention } from "../types";

export const useMentions = () => {
  const [data, setData] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos del menciones
    getHomeData()
    .then((homeData) => {
      // courseData es todo el objeto del curso
      const mentionsData: Mention[] = homeData.sections.mentions?.mentions ?? [];
      setData(mentionsData);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching mentions data");
    })
    .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}
