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
  const [link, setLink] = useState<string | null>(null); // NUEVO
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMasterClass()
      .then((res) => {
        const raw: MasterclassAPIItem[] = res?.masterclasses || [];

        const parsed: Professional[] = raw.flatMap(mapMasterclassToProfessionals);
        setData(parsed);

        // Tomamos el link de la primera masterclass
        if (raw.length > 0 && raw[0].link) {
          setLink(raw[0].link);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, link, loading, error };
};

