import { useEffect, useState } from 'react';
import { getMasterClass } from '../service/masterclass.service';
import {
  Professional,
  MasterclassAPIItem,
  mapMasterclassToProfessionals
} from '../types';

export const useMasterclassSection = () => {
  const [data, setData] = useState<Professional[]>([]);
  const [masterclass, setMasterclass] = useState<MasterclassAPIItem | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMasterClass()
      .then((res) => {
        const raw: MasterclassAPIItem[] = res?.masterclasses || [];

        if (raw.length > 0) {
          const item = raw[0];
          const parsed = mapMasterclassToProfessionals(item); // ✅ AHORA sí existe "parsed"

          setMasterclass(item);
          setData(parsed);
          setLink(item.link?.url || null);
          setBackgroundImage(item.background_image?.[0] || null);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, masterclass, link, backgroundImage, loading, error };
};
