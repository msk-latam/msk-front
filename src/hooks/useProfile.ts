import { useRouter } from 'next/navigation';
import useSWR from 'swr';

// Simplified fetcher: throws an error on non-ok responses
const fetcher = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		// Basic error including the status
		const error = new Error(`An error occurred while fetching the data. Status: ${res.status}`);
		// You could potentially still attach info if needed, but requires proper typing
		// try { (error as any).info = await res.json(); } catch { (error as any).info = await res.text(); }
		(error as any).status = res.status; // Use type assertion if needed, or omit
		throw error;
	}

	return res.json();
};

export function useProfile() {
	const router = useRouter();

	const { data, error, isLoading, mutate } = useSWR('/api/profile', fetcher, {
		shouldRetryOnError: false, // Keep this to prevent retries on error
		onError: (err) => {
			console.error('Failed to fetch profile, redirecting to login:', err);
			// Redirect to login on ANY fetch error
			router.push('/login');
		},
	});

	return {
		user: data?.user || null,
		loading: isLoading,
		// Return the error object from SWR, which might be populated by the fetcher error
		error,
		mutate,
	};
}
