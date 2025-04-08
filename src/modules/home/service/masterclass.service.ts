// src/modules/home/services/masterclass.service.ts
import { Professional } from "@/modules/home/types";

export const getProfessionalsFromWP = async (): Promise<Professional[]> => {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/masterclass-professionals?lang=es");

    if (!res.ok) {
      throw new Error("Error al obtener los datos de los profesionales");
    }

    const data = await res.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Los datos de los profesionales no están disponibles o están mal formateados.");
    }

    return data; // Devuelve los datos de los profesionales
  } catch (error) {
    console.error("Error en el servicio de Masterclass:", error);
    return []; // Retorna un array vacío si ocurre un error
  }
};
