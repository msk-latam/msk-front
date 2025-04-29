
// /modules/home/hooks/useTrustSection.ts
import { useEffect, useState } from 'react';
import { getHomeData } from "../service/home.service";  // Asegúrate que esta ruta sea correcta
import{ TrustSection } from '../types'; // Importar los tipos

export const useTrustSection = () => {
  const [data, setData] = useState<TrustSection | null>(null); // Aquí usamos el tipo `TrustSection`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  useEffect(() => {
    getHomeData()
    .then((homeData) => {
      const trustSectionData: TrustSection = homeData.sections.trustsection;
      setData(trustSectionData);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching blog data");
    })
    .finally(() => setLoading(false));
  }, []);
  console.log(data)
  return { data, loading, error };
}
