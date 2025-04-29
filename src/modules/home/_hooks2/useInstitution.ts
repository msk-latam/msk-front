// src/modules/home/hooks/useInstitution.ts

import { useEffect, useState } from "react";
import { Institution } from "../types";
import { getInstitutions } from "../service/institutions.service";

export function useInstitutions() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInstitutions();
        setInstitutions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { institutions, loading, error };
}
