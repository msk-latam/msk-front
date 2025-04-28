import api from '@/services/api'; // Assuming this is the correct path to your API service
import { useState } from 'react';

export const useLmsNavigation = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigateToLms = async (product_code: number, cod_curso: string, email: string) => {
		setIsLoading(true);
		setError(null);
		console.log('Navigating to LMS with:', product_code, cod_curso, email);
		try {
			const res = await api.getLinkLMS(product_code, cod_curso, email);
			console.log('LMS Link Response:', res);

			if (res.sso) {
				const a = document.createElement('a');
				a.setAttribute('href', res.sso);
				a.setAttribute('target', '_blank');
				a.click();
			} else {
				console.error('Failed to get LMS link: No SSO URL found in response.', res);
				setError('Hubo un problema al obtener el enlace del curso.');
				// Consider showing a user-friendly error message here
				// alert('Hubo un problema al obtener el curso');
			}
		} catch (err) {
			console.error('Error fetching LMS link:', err);
			setError('Hubo un error al intentar acceder al curso.');
			// Consider more specific error handling based on the error type
		} finally {
			setIsLoading(false);
		}
	};

	return { navigateToLms, isLoading, error };
};
