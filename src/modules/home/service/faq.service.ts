// src/modules/home/service/faq.service.ts
import { Faq } from '@/modules/home/types';

export const getFaqSection = async (): Promise<Faq[]> => {
  const res = await fetch('/api/home/faqs');
  if (!res.ok) throw new Error("Error al cargar las preguntas frecuentes");

  const json = await res.json();
  return json.faqs || [];
};
