import axios from 'axios';
import { useEffect, useState } from 'react';
import { CourseOverviewData } from './useCourseData'; // Asegurate de que la ruta sea correcta

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/product';

export function useCourseOverview(slug: string) {
	const [data, setData] = useState<CourseOverviewData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchOverview() {
			setLoading(true);
			try {
				const res = await axios.get(`${API_BASE}/${slug}`);

				const overviewData: CourseOverviewData = {
					habilities: res.data.sections?.habilities ?? [],
					with_this_course: res.data.sections?.with_this_course ?? '',
					your_course_steps: res.data.sections?.your_course_steps ?? [],
				};

				setData(overviewData);
			} catch (err) {
				console.error(err);
				setError('Error fetching course overview content');
			} finally {
				setLoading(false);
			}
		}

		if (slug) {
			fetchOverview();
		}
	}, [slug]);

	return { data, loading, error };
}
