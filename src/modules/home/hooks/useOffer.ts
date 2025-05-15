import { useEffect, useState } from 'react';
import { PromoData } from '../types';

export const useOffers = (lang: string) => {
	const [data, setData] = useState<PromoData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOffers = async () => {
			try {
				const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/promos?lang=${lang}&nocache=1`, {
					cache: 'no-store',
				});
				if (!res.ok) throw new Error(`Error al obtener promociones: ${res.statusText}`);
				const json: PromoData = await res.json();
				setData(json);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchOffers();
	}, []);

	return { data, loading, error };
};
