'use client';

import { useEffect, useState } from 'react';

type Product = {
	id: number;
	title: string;
	link: string;
};

/**
 * Fetch courses from the MSK API using the server-side search endpoint.
 * It triggers every time either the `searchTerm` (debounced from the consumer) or `lang` changes.
 * When `searchTerm` is empty, no request is sent and the hook returns an empty list.
 */
export const useSearchCourses = (lang: string, searchTerm: string) => {
	const [courses, setCourses] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const trimmed = searchTerm.trim();
		if (trimmed === '') {
			setCourses([]);
			setLoading(false);
			setError(null);
			return;
		}

		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const apiUrl = `https://cms1.msklatam.com/wp-json/msk/v1/search-products?lang=${encodeURIComponent(
					lang || 'int',
				)}&search=${encodeURIComponent(trimmed)}`;

				const response = await fetch(apiUrl, { signal });
				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
				const data = await response.json();

				const courses = data.products.map((product: Product) => ({
					id: product.id,
					title: product.title,
					link: product.link,
				}));

				setCourses(courses);
			} catch (e: any) {
				if (e.name !== 'AbortError') {
					setError(e.message);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// Cancel in-flight request if searchTerm/lang changes or component unmounts
		return () => controller.abort();
	}, [lang, searchTerm]);

	return { courses, loading, error };
};
