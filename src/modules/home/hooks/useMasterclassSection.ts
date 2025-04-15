// src/modules/home/hooks/useMasterclassSection.ts
import { useEffect, useState } from 'react';
import { getMasterClass } from '../service/masterclass.service';
import {
  Professional,
  MasterclassAPIItem,
  mapMasterclassToProfessionals
} from '../types';

export const useMasterclassSection = () => {
  const [data, setData] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMasterClass()
      .then((res) => {
        const raw: MasterclassAPIItem[] = res?.masterclasses || [];

        // 🔁 Mapea todos los doctores de cada masterclass
        const parsed: Professional[] = raw.flatMap(mapMasterclassToProfessionals);

        setData(parsed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
