// src/modules/home/hooks/useInstitution.ts

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getHomeData } from '../service/home.service';
import { Institution } from '../types';

export function useInstitutions() {
	const [institutions, setInstitutions] = useState<Institution[]>([]);
	const [title, setTitle] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const pathname = usePathname();
	const lang = pathname?.split('/')[1] || 'arg';

	useEffect(() => {
		// Llamamos al servicio para obtener los datos de las instituciones
		getHomeData(lang)
			.then((homeData) => {
				// courseData es todo el objeto del curso
				const backupsSection = homeData.sections.backups ?? { title: '', institutions: [] };
				setTitle(backupsSection.title || '');
				setInstitutions(backupsSection.institutions as Institution[]);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching instutions data');
			})
			.finally(() => setLoading(false));
	}, []);
	return { institutions, title, loading, error };
}
