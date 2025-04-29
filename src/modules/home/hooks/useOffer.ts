
import { useEffect, useState } from "react";
import { getHomeData } from "../service/home.service";  // Asegúrate que esta ruta sea correcta
import { OfferData } from "../types";

export const useOffers = () => {
  const [data, setData] = useState<OfferData | null>(null);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos del blog
    getHomeData()
    .then((homeData) => {
      // courseData es todo el objeto del curso
      const offerData: OfferData = homeData.sections.offers;
      setData(offerData);
    })
    .catch((err) => {
      console.error(err);
      setError(err.message || "Error fetching offer data");
    })
    .finally(() => setLoading(false));
  }, []);
  
  return { data, loading, error };
}
