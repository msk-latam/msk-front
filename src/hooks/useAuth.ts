import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAuth() {
	const { data, error, isLoading } = useSWR('/api/auth/status', fetcher);

	console.log('data', data);

	return {
		user: data?.user || null,
		isAuthenticated: !!data?.authenticated,
		loading: isLoading,
		error,
	};
}
