import { OfferData } from "../types";

export const getOffer = async (): Promise<OfferData> => {
  const res = await fetch("/api/home/offers");
  if (!res.ok) throw new Error("Error al cargar la sección de oferta");
  return res.json();
};