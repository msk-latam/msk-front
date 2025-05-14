// app/modules/home/hooks/useBlogContent.ts
import { useEffect, useState } from 'react';
import { getHomeData } from '../service/home.service'; // Asegúrate que esta ruta sea correcta
import { Faq } from '../types';

export const useFaqContent = () => {
	const [data, setData] = useState<Faq[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Llamamos al servicio para obtener los datos del faq
		getHomeData()
			.then((homeData) => {
				// courseData es todo el objeto del curso
				const faqData: Faq[] = homeData.sections.faqs?.questions ?? [];
				setData(faqData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching faq data');
			})
			.finally(() => setLoading(false));
	}, []);
	return { data, loading, error };
};
