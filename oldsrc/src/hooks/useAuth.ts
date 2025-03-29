import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '@/context/user/AuthContext';
import ssr from '@/services/ssr';
import { usePathname, useRouter } from 'next/navigation';

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext);
	const router = useRouter();
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	let country = match ? `${match[1]}` : '';

	if (country === 'mi') {
		country = '';
	}

	const fetchProfile = useCallback(async () => {
		try {
			const res = await ssr.getUserData();

			if (res) {
				dispatch({
					type: 'UPDATE_PROFILE',
					payload: { profile: res.contact },
				});
			} else {
				dispatch({ type: 'LOGOUT' });
				router.push(`${window.location.origin}/${country}`);
			}
		} catch (error) {
			// router.prefetch(`${window.location.origin}/${country}`);
			console.error('Failed to fetch user profile:', error);
			dispatch({ type: 'LOGOUT' });
			router.push(`${window.location.origin}/${country}`);
		}
	}, [dispatch, router]);

	useEffect(() => {
		console.log({ state }, state.profile);
		if (!state.profile) {
			fetchProfile();
		}
	}, [state.profile]);

	return {
		...state,
		isAuthenticated: !!state.profile,
	};
};
