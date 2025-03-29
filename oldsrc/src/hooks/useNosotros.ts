import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/data/api';
import { SinglePageType } from '@/data/types';

export interface StaffType {
  title: string;
  imagen: string;
  description: string;
}

export interface DireccionMedicaType {
  title: string;
  imagen: string;
  description: string;
}

export interface AvalType {
  index: number;
  id: number;
  title: string;
  description: string;
  description_long: string;
  image: string;
}

export interface NosotrosDataType {
  title: string;
  title_convenios: string;
  description_convenios: string;
  title_nuestro_equipo: string;
  description_nuestro_equipo: string;
  title_direccion_medica: string;
  imagen: string;
  staff: StaffType[];
  direccion_medica: DireccionMedicaType[];
  avales: AvalType[];
}

const useNosotros = (country: string) => {
  const [data, setData] = useState<NosotrosDataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/nosotros?country=${country}`,
        );
        setData(response.data);
      } catch (err) {
        console.log({ err });
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

  return { data, loading, error };
};

export default useNosotros;
