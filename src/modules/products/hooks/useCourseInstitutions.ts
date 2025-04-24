import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/product';

export interface CourseInstitution {
	id: number;
	title: string;
	slug: string;
	image: string;
	description: string;
}

export function useCourseInstitutions(slug: string | number) {
	const [data, setData] = useState<CourseInstitution[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchInstitutions() {
			setLoading(true);
			try {
				const res = await axios.get(`${API_BASE}/${slug}?nocache=1`);
				setData(res.data.sections.institutions);
			} catch (err) {
				console.error(err);
				setError('Error fetching course institutions');
			} finally {
				setLoading(false);
			}
		}

		fetchInstitutions();
	}, [slug]);

	return { data, loading, error };
}
