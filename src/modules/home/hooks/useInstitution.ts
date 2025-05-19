// src/modules/home/hooks/useInstitution.ts

import { useEffect, useState } from 'react';
import { Institution } from '../types';
import { getHomeData } from '../service/home.service';
import { usePathname } from 'next/navigation';

export function useInstitutions() {
	const [institutions, setInstitutions] = useState<Institution[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const pathname = usePathname();
	const lang = pathname?.split('/')[1] || 'arg';

	useEffect(() => {
		// Llamamos al servicio para obtener los datos de las instituciones
		getHomeData(lang)
			.then((homeData) => {
				// courseData es todo el objeto del curso
				const instutionsData: Institution[] = homeData.sections.backups?.institutions ?? [];
				setInstitutions(instutionsData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching instutions data');
			})
			.finally(() => setLoading(false));
	}, []);
	return { institutions, loading, error };
}
