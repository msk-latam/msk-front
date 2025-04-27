import { useParams, useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLogout() {
	const { data, error, isLoading } = useSWR('/api/auth/logout-c', fetcher);
	const router = useRouter();
	const params = useParams();
	const lang = params?.lang || 'es';

	const logout = async () => {
		try {
			const response = await fetch('/api/auth/logout-c', {
				method: 'POST',
			});

			if (response.ok) {
				mutate('/api/auth/status');
				router.push(`/${lang}/login`);
			} else {
				console.error('Logout failed:', await response.text());
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	return {
		loading: isLoading,
		error,
		logout,
	};
}
