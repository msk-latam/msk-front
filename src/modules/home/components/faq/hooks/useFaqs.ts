// hooks/useFaqs.ts
import useSWR from 'swr';
import { faqItems as mockFaqs } from '@/modules/home/components/faq/data/faqData';

export type FaqItem = {
  question: string;
  answer: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFaqs = () => {
  // Reemplazá la URL por el endpoint real de WordPress
  const { data, error } = useSWR('https://tu-dominio.com/wp-json/wp/v2/preguntas-frecuentes', fetcher);

  // Mientras no se obtenga la data, se puede retornar el mock y un estado de carga
  if (!data) {
    return { faqs: mockFaqs, loading: true, error: null };
  }

  // Si se obtiene la data, se asume que viene en el formato de WP (con title.rendered y content.rendered)
  const faqs: FaqItem[] = data.map((item: any) => ({
    question: item.title.rendered,
    answer: item.content.rendered,
  }));

  return { faqs, loading: false, error };
};
