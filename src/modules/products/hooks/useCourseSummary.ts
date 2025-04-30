import { useEffect, useState } from 'react';

interface CourseSummaryData {
	is_free: boolean;
	sale_price: string;
	regular_price: string;
	total_price: string;
	max_installments: string;
	price_installments: number;
	featured_images: {
		high: string;
		medium: string;
		low: string;
	};
	duration: string;
	enrolled: number;
	modules: number;
	certification: boolean;
	cedente: {
		id: number;
		title: string;
		name: string;
		slug: string;
		image: string;
	};
}

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/product';

export function useCourseSummary(slug: string, lang: string) {
	const [data, setData] = useState<CourseSummaryData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!slug || !country) {
			setLoading(false);
			return;
		}

		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`${API_BASE}/${slug}?nocache=1&lang=${lang}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				// Assuming the prices data is nested under a 'prices' key
				const setResutl = {
					featured_images: result.featured_images,
					is_free: result.prices.is_free,
					sale_price: result.prices.sale_price,
					regular_price: result.prices.regular_price,
					total_price: result.prices.total_price,
					max_installments: result.prices.max_installments,
					price_installments: result.prices.price_installments,
					duration: result.duration,
					enrolled: result.enrolments,
					modules: result.modules,
					certification: true,
					cedente: result.cedente,
				};

				setData(setResutl || null);
			} catch (e) {
				setError(e instanceof Error ? e : new Error('An unknown error occurred'));
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [slug, country]);

	return { data, loading, error };
}
