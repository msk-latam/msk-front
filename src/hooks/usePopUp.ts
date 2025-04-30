import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePopUp() {
	const { data, error, isLoading } = useSWR('/api/pop-up', fetcher);

	console.log('data', data);

	return {
		popUp: data?.popUp || null,
		loading: isLoading,
		error,
	};
}
