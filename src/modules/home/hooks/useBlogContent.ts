import { useEffect, useState } from 'react';
import { getBlogData } from '../service/blog.service';
import { BlogResponse } from '../types';

export const useBlogContent = () => {
	const [data, setData] = useState<BlogResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getBlogData()
			.then(setData)
			.catch((err) => {
				console.error(err);
				setError(err.message);
			})
			.finally(() => setLoading(false));
	}, []);

	return { data, loading, error };
};
