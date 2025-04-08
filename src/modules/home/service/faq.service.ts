// services.ts
import { FaqData } from '@/modules/home/types';

const API_URL = 'https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es';

export const fetchFaqData = async (): Promise<FaqData> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error fetching FAQ data');
  }
  const data = await response.json();
  return data.faqs; // Asegúrate de que "faqs" esté disponible en el JSON que recibes
};
