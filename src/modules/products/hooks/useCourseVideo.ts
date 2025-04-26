import axios from 'axios';
import { useEffect, useState } from 'react';
import { CourseVideoData } from '../types/types';
const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/product';

export function useCourseVideo(slug: string | number) {
	const [data, setData] = useState<CourseVideoData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`${API_BASE}/${slug}`);
				setData(res.data.sections.video);
			} catch (err) {
				setError('Error al cargar la descripción del curso');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [slug]);
	console.log(data);

	return { data, loading, error };
}
