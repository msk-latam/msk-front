// src/modules/home/services/masterclass.service.ts

import { Professional } from "@/modules/home/types";

// Función para obtener los datos de MasterClass desde la API
export const getMasterClass = async (): Promise<Professional[]> => {
  // Hacemos una solicitud al endpoint de la API de Next.js
  const res = await fetch("/api/home/masterclass");
  
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error("Error al cargar datos de MasterClass");

  // Devolvemos los datos de la respuesta en formato JSON
  return res.json();
};
