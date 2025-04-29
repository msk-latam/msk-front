// modules/home/hooks/useHomeContent.ts

import { useEffect, useState } from "react";
import { HeroSection } from "../types";
import { getHeroSection } from "../service/hero.service";

export const useHomeContent = () => {
  const [data, setData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroSection()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
