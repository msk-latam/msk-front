'use client';
import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './AuthReducer';
import { AuthState } from '@/data/types';
import { fetchUserData } from '@/middleware';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
	const initialState: AuthState = {
		stateLoaded: false,
		isAuthenticated: false,
		user: null,
		profile: null,
		email: null,
		token: null,
		expires_at: null,
		bypassRedirect: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);
	const router = useRouter();
	const pathname = usePathname();
	const match = pathname.match(/^\/([a-z]{2})\b/);
	let country = match ? `${match[1]}` : '';

	useEffect(() => {
		const initializeAuth = async () => {
			/*console.log('INITIALIZE AUTH');*/
			const token = localStorage.getItem('token');
			const email = localStorage.getItem('email');
			const bypassRedirect = localStorage.getItem('bypassRedirect');
			let expires_at: string | Date | null = localStorage.getItem('expires_at');

			if (token && email) {
				const userData = await fetchUserData();
				if (userData) {
					const data = {
						access_token: token,
						email,
						expires_at,
						bypassRedirect,
						user: userData,
						profile: userData.profile,
					};
					dispatch({ type: 'LOGIN', payload: data });
					if (expires_at) {
						expires_at = new Date(expires_at);
						expires_at.setDate(expires_at.getDate() - 1);

						if (new Date() > expires_at) {
							dispatch({ type: 'LOGOUT' });
							router.push(
								country === ''
									? `${window.location.origin}/iniciar-sesion/`
									: `${window.location.origin}/${country}/iniciar-sesion/`,
							);
						}
					}
				} else {
					//I still trigger the logout event to mark that the authState has been loaded
					dispatch({ type: 'LOGOUT' });
				}
			} else {
				dispatch({ type: 'LOGOUT' });
			}
		};

		initializeAuth();
	}, []);

	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
