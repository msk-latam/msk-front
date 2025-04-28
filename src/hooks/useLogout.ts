import { useParams, useRouter } from 'next/navigation';
import { mutate } from 'swr';

export function useLogout() {
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
		logout,
	};
}
