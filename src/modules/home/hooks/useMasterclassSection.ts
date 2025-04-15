// src/modules/home/hooks/useMasterclassSection.ts
import { useEffect, useState } from 'react';
import { getMasterClass } from '../service/masterclass.service';
import { Professional } from '../types';

export const useMasterclassSection = () => {
  const [data, setData] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMasterClass()
      .then((res) => {
        const raw = res?.masterclass;

        // ✅ Corrige si viene como { "": null }
        const parsed: Professional[] = Array.isArray(raw)
          ? raw
          : Object.values(raw || {}).filter(Boolean) as Professional[];

        setData(parsed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
