import { useEffect, useState } from 'react';
import { getMasterClass } from '../service/masterclass.service';
import {
  Professional,
  MasterclassAPIItem,
  mapMasterclassToProfessionals
} from '../types';

export const useMasterclassSection = () => {
  const [data, setData] = useState<Professional[]>([]);
  const [link, setLink] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // ✅ NUEVO
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMasterClass()
      .then((res) => {
        const raw: MasterclassAPIItem[] = res?.masterclasses || [];

        const parsed: Professional[] = raw.flatMap(mapMasterclassToProfessionals);
        setData(parsed);

        if (raw.length > 0) {
          if (raw[0].link?.url) {
            setLink(raw[0].link.url);
          }
          if (raw[0].background_image?.[0]) {
            setBackgroundImage(raw[0].background_image[0]);
          }
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, link, backgroundImage, loading, error };
};
