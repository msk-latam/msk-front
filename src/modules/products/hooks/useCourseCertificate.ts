import axios from 'axios';
import { useEffect, useState } from 'react';
import { CourseCertificate } from './useCourseData';

export function useCourseCertificate(slug: string | number) {
	const [data, setData] = useState<CourseCertificate | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}`);
				setData(res.data.sections.has_certificate);
			} catch (err) {
				setError('Error al cargar el encabezado del curso');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [slug]);

	return { data, loading, error };
}
