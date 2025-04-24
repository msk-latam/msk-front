import axios from 'axios';
import { useEffect, useState } from 'react';
import { CourseTeachersData } from './useCourseData'; // Asegurate de que la ruta sea correcta

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/product';

export function useCourseTeachers(slug: string) {
	const [data, setData] = useState<CourseTeachersData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchTeachers() {
			setLoading(true);
			try {
				const res = await axios.get(`${API_BASE}/${slug}`);
				setData(res.data.sections.teaching_team);
			} catch (err) {
				console.error(err);
				setError('Error fetching course overview content');
			} finally {
				setLoading(false);
			}
		}

		if (slug) {
			fetchTeachers();
		}
	}, [slug]);

	return { data, loading, error };
}
