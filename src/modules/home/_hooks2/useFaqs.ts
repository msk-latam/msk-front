// src/modules/home/hooks/useFaqs.ts
import { useEffect, useState } from 'react';
import { getFaqSection } from '@/modules/home/service/faq.service';
import { Faq } from '@/modules/home/types';
import { dataInitialState } from '@/context/data/DataReducer';

const useFaqs = () => {
	const [faqData, setFaqData] = useState<Faq[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getFaqSection()
			.then((data) => {
				setFaqData(data);
			})
			.catch(() => {
				setError('No se pudieron cargar las preguntas frecuentes.');
			})
			.finally(() => setLoading(false));
	}, []);
	return { data: faqData, loading, error };
};

export default useFaqs;
