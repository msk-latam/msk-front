import { useCallback, useEffect, useState } from 'react';

interface Interests {
	specialty_interests: string[];
	content_interests: string[];
	other_interests: string[];
}

interface UseInterestsReturn {
	interests: Interests | null;
	isLoading: boolean;
	error: Error | null;
	updateInterests: (newInterests: Partial<Interests>) => Promise<void>;
}

const useInterests = (): UseInterestsReturn => {
	const [interests, setInterests] = useState<Interests | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchInterests = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('/api/interests');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: Interests = await response.json();
			setInterests(data);
		} catch (e) {
			setError(e instanceof Error ? e : new Error('Failed to fetch interests'));
			console.error('Failed to fetch interests:', e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchInterests();
	}, [fetchInterests]);

	const updateInterests = useCallback(
		async (newInterestsData: Partial<Interests>) => {
			setIsLoading(true); // Optionally set loading state for updates
			setError(null);
			try {
				const response = await fetch('/api/interests', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newInterestsData),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const updatedInterests: Interests = await response.json();
				setInterests(updatedInterests); // Update local state with response from server
			} catch (e) {
				setError(e instanceof Error ? e : new Error('Failed to update interests'));
				console.error('Failed to update interests:', e);
				// Optionally re-throw or handle the error differently
			} finally {
				setIsLoading(false); // Reset loading state
			}
		},
		[], // Dependencies for updateInterests, if any (e.g., user ID if not handled by cookies)
	);

	return { interests, isLoading, error, updateInterests };
};

export default useInterests;
