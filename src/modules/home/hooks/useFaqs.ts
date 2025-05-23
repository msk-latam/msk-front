// app/modules/home/hooks/useBlogContent.ts
import { useEffect, useState } from 'react';
import { getHomeData } from '../service/home.service'; // Asegúrate que esta ruta sea correcta
import { Faq } from '../types';

export const useFaqContent = () => {
	const [data, setData] = useState<Faq[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const pathname = window.location.pathname;
		const langCandidate = pathname.split('/')[1]?.toLowerCase();
		const lang = langCandidate === 'ar' || !langCandidate ? 'arg' : langCandidate?.length === 2 ? langCandidate : 'arg';

		// Llamamos al servicio para obtener los datos del faq
		getHomeData(lang)
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
