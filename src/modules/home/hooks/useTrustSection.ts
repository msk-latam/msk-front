// /modules/home/hooks/useTrustSection.ts
import { useEffect, useState } from 'react';
import { fetchTrustSectionData } from '../service/trustsection.service'; // Importar el servicio
import { TrustSection } from '../types'; // Importar los tipos

export const useTrustSection = () => {
  const [data, setData] = useState<TrustSection | null>(null); // Aquí usamos el tipo `TrustSection`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  useEffect(() => {
    fetchTrustSectionData()
      .then(setData) // Si la solicitud es exitosa, guarda los datos
      .catch((error) => setError(error.message)) // Si hay un error, guarda el mensaje de error
      .finally(() => setLoading(false)); // Cuando termine, cambia el estado de carga
  }, []); // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

  return { data, loading, error };
};
