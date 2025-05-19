// /modules/home/hooks/useTrustSection.ts
import { useEffect, useState } from 'react';
import { getHomeData } from '../service/home.service'; // Asegúrate que esta ruta sea correcta
import { TrustSection } from '../types'; // Importar los tipos
import { usePathname } from 'next/navigation';

export const useTrustSection = () => {
	const [data, setData] = useState<TrustSection | null>(null); // Aquí usamos el tipo `TrustSection`
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null); // Para manejar errores
	const pathname = usePathname();
	const lang = pathname?.split('/')[1] || 'arg';

	useEffect(() => {
		getHomeData(lang)
			.then((homeData) => {
				const trustSectionData: TrustSection = homeData.sections.trustsection;
				setData(trustSectionData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching blog data');
			})
			.finally(() => setLoading(false));
	}, []);
	return { data, loading, error };
};
