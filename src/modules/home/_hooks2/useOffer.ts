// hooks/useOffers.ts
import { useEffect, useState } from "react";
import { OfferData } from "../types";
import { getOffer } from "../service/offers.service";

export const useOffers = () => {
  const [data, setData] = useState<OfferData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOffer()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};