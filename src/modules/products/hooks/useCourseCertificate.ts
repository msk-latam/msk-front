import axios from 'axios';
import { useEffect, useState } from 'react';
import { CourseCertificate } from '../types/types';

export function useCourseCertificate(slug: string | number, lang: string) {
	const [data, setData] = useState<CourseCertificate | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}?lang=${lang}`);
				console.log(res);
				setData(res.data.sections.certificate.has_certificate);
			} catch (err) {
				setError('Error al cargar el encabezado del curso');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [slug, lang]);

	return { data, loading, error };
}
