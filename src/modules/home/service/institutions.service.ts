// src/modules/home/services/institutions.service.ts

import { Institution } from "../types";

export async function getInstitutions(): Promise<Institution[]> {

  let lang = "ar";
  if(window!=null){
    const { pathname } = window.location;
    const langMatch = pathname.match(/^\/([^/]+)\//);
     lang = langMatch && langMatch[1].length <= 2 ? langMatch[1] : "ar";
  }

  const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=${lang}&nocache=1`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("No se pudieron obtener las instituciones");
  }

  const data = await res.json();
  return data.sections?.backups?.institutions || [];
}
