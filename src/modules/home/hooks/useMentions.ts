import { useEffect, useState } from 'react';
import { getHomeData } from '../service/home.service'; // Asegúrate que esta ruta sea correcta
import { Mention } from '../types';
import { usePathname } from 'next/navigation';

export const useMentions = () => {
	const [data, setData] = useState<Mention[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const pathname = usePathname();
	const lang = pathname?.split('/')[1] || 'arg';

	useEffect(() => {
		// Llamamos al servicio para obtener los datos del menciones
		getHomeData(lang)
			.then((homeData) => {
				// courseData es todo el objeto del curso
				const mentionsData: Mention[] = homeData.sections.mentions?.mentions ?? [];
				setData(mentionsData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching mentions data');
			})
			.finally(() => setLoading(false));
	}, []);
	return { data, loading, error };
};
