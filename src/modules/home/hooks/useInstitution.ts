// src/modules/home/hooks/useInstitution.ts

import { useEffect, useState } from "react";
import { Institution } from "../types";
import { getHomeData } from "../service/home.service"; 

export function useInstitutions() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos de las instituciones
    getHomeData()
    .then((homeData) => {
      // courseData es todo el objeto del curso
      const instutionsData: Institution[] = homeData.sections.backups?.institutions ?? [];
      setInstitutions(instutionsData);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching instutions data");
    })
    .finally(() => setLoading(false));
  }, []);
  return { institutions, loading, error };
}
