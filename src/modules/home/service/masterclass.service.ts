import { MasterclassAPIItem } from '../types';

export interface MasterclassAPIResponse {
  masterclasses: MasterclassAPIItem[];
}

export const getMasterClass = async (): Promise<MasterclassAPIResponse> => {
  const res = await fetch("/api/home/masterclass");
  if (!res.ok) throw new Error("Error al cargar datos de MasterClass");
  return res.json();
};

