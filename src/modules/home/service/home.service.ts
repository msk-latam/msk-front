// modules/home/services/home.service.ts

import { HeroSection } from "../types";

export const getHeroSection = async (): Promise<HeroSection> => {
  const res = await fetch("/api/home/hero");
  if (!res.ok) throw new Error("Error al cargar datos del hero");
  return res.json();
};
