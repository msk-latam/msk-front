import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProfile() {
	const { data, error, isLoading } = useSWR('/api/profile', fetcher);

	return {
		user: data?.user || null,
		loading: isLoading,
		error,
	};
}
