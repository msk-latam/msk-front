import axios from 'axios';
import { API_URL } from 'data/api';
import { useState, useEffect } from 'react';

export type WpContentData = {
    params: {};
    header: {
      cabecera: string;
      cta: {
        title: string;
        url: string;
        target: string;
      };
      imagen: string;
    };
    sobre_mks: {
      etiqueta: string;
      texto_1: string;
      texto_2: string;
    };
    cedentes: {
      texto: string;
    };
    recomendaciones: {
      texto_1: string;
      texto_2: string;
      items_1: {
        titulo: string;
        parrafo: string;
      }[];
      items_2: {
        imagen: string;
        titulo: string;
        numero: string;
        parrafo: string;
        redes: {
          value: string;
          label: string;
        };
      }[];
    };
    preguntas_frecuentes: {
      texto: string;
      items: {
        titulo: string;
        parrafo: string;
      }[];
    };
  };
  

const useWpContent = (url: string): { content: WpContentData | null, loading: boolean, error: string | null } => {
  const [content, setContent] = useState<WpContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}${url}`);
        const {data} = response;
        setContent(data);
        setError(null);
      } catch (error: any) {
        setContent(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Retornamos una función para realizar limpieza si el componente se desmonta
    return () => {
      // Aquí puedes realizar alguna limpieza si es necesario
    };
  }, [url]); // Se ejecutará el efecto cada vez que la URL cambie

  return { content, loading, error };
};

export default useWpContent;
