// src/modules/home/services/institutions.service.ts

import { Institution } from "../types";

export async function getInstitutions(): Promise<Institution[]> {
  const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("No se pudieron obtener las instituciones");
  }

  const data = await res.json();
  return data.sections?.backups?.institutions || [];
}
