import { MasterclassAPIItem } from '../types';

export interface MasterclassAPIResponse {
	masterclasses: MasterclassAPIItem[];
}

export const getMasterClass = async (): Promise<MasterclassAPIResponse> => {
	const res = await fetch('/api/home/masterclass');
	if (!res.ok) throw new Error('Error al cargar datos de MasterClass');

	const data: MasterclassAPIResponse = await res.json();

	// 🔧 Normalizamos los tags para asegurarnos que siempre sean arrays
	const normalized: MasterclassAPIItem[] = data.masterclasses.map((mc) => ({
		...mc,
		tags: mc.tags ? (Array.isArray(mc.tags) ? mc.tags : [mc.tags]) : [],
	}));

	return { masterclasses: normalized };
};
