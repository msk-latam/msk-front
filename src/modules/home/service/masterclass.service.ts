// src/modules/home/services/masterclass.service.ts

// src/modules/home/services/masterclass.service.ts
import { Professional } from "@/modules/home/types";

interface MasterclassAPIResponse {
  masterclass: Professional[];
  courses?: any;
  trustsection?: any;
}

export const getMasterClass = async (): Promise<MasterclassAPIResponse> => {
  const res = await fetch("/api/home/masterclass");
  if (!res.ok) throw new Error("Error al cargar datos de MasterClass");
  return res.json();
};

