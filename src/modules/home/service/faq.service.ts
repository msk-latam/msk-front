import { Faq } from "@/modules/home/types";  // Import Faq type

export const getFaqSection = async (): Promise<Faq[]> => {
  const res = await fetch("/api/home/faq");
  if (!res.ok) throw new Error("Error al cargar datos de las preguntas frecuentes");
  const data = await res.json();
  return data.faqs;
};
