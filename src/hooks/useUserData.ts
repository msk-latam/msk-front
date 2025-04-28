import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUserData() {
	const { data, error, isLoading } = useSWR('/api/me', fetcher);

	console.log('data', data);

	return {
		user: data || null,
		loading: isLoading,
		error,
	};
}
