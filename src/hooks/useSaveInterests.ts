import { useState } from 'react';

interface SaveInterestsPayload {
	especialidadInteres: string[];
	contenidoInteres: string[];
	interesesAdicionales: string[];
	crm_id: string;
}

interface UseSaveInterestsResult {
	mutate: (payload: SaveInterestsPayload) => Promise<any>; // Replace 'any' with the expected response type if known
	loading: boolean;
	error: string | null;
	success: boolean;
}

export const useSaveInterests = (): UseSaveInterestsResult => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const mutate = async (payload: SaveInterestsPayload) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch('/api/save-interests', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.details || data.error || `API request failed with status ${response.status}`);
			}

			setSuccess(true);
			return data; // Return the response data on success
		} catch (err: any) {
			const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
			console.error('Error saving interests via hook:', errorMessage);
			setError(errorMessage);
			throw err; // Re-throw the error so the calling component can handle it
		} finally {
			setLoading(false);
		}
	};

	return { mutate, loading, error, success };
};
