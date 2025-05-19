import { useEffect, useState } from 'react';
import axios from 'axios';

export interface CursoType {
  title: string;
  url: string;
  target: string;
}

export interface EspecialidadType {
  especialidad: string;
  url_especialidad: string;
}

export interface RedesSocialesType {
  redlink: string;
}

export interface FooterSections {
  redes_sociales: RedesSocialesType;
  cursos_mas_elegidos: CursoType[];
  cursos_mas_buscados: CursoType[];
  especialidades: EspecialidadType[];
  contenidos_destacados: CursoType[];
}

export interface FooterDataType {
  lang: string;
  sections: FooterSections;
}

const useFooter = (lang: string) => {
  const [data, setData] = useState<FooterDataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://cms1.msklatam.com/wp-json/msk/v1/footer?lang=${lang}&nocache=1`
        );
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar el footer');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  return { data, loading, error };
};

export default useFooter;
