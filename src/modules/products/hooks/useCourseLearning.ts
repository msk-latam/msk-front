import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/product';

export interface CourseLearning {
	msk_learning_content: string;
}

export function useCourseLearning(slug: string | number) {
	const [data, setData] = useState<CourseLearning[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchLearning() {
			setLoading(true);
			try {
				const res = await axios.get(`${API_BASE}/${slug}`);
				setData(res.data.sections.learning);
			} catch (err) {
				console.error(err);
				setError('Error fetching course learning content');
			} finally {
				setLoading(false);
			}
		}

		fetchLearning();
	}, [slug]);

	return { data, loading, error };
}
