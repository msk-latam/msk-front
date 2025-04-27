import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function useSessionStatus() {
	const { data, error, isLoading } = useSWR('/api/auth/status', fetcher, {
		revalidateOnFocus: true,
		dedupingInterval: 5000,
		shouldRetryOnError: true,
		errorRetryCount: 3,
	});

	return {
		isAuthenticated: data?.authenticated || false,
		isLoading,
		error,
	};
}
