import { useEffect, useState } from 'react';
import { getNavbar } from '../service/navbar.service';
import { APIResponse, SpecialtyDetailViewModel, toSpecialtyDetailViewModel } from './types';

export function useSpecialtyDetailView(specialtyId?: number) {
	const [data, setData] = useState<SpecialtyDetailViewModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getNavbar()
			.then((navbarData: APIResponse) => {
				// Transform the API response to the SpecialtyDetailViewModel array
				const specialtyDetailData = toSpecialtyDetailViewModel(navbarData);
				setData(specialtyDetailData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching navbar specialty detail data');
			})
			.finally(() => setLoading(false));
	}, []);

	// If specialtyId is provided, find the specific specialty
	const selectedSpecialty = specialtyId ? data.find((item) => item.specialty.id === specialtyId) : null;
	return { data, selectedSpecialty, loading, error };
}
