'use client';

import { updateUserData } from '@/lib/localStorageService/userDataService';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function UserDataStorage() {
	const { user, isLoading } = useUser();

	useEffect(() => {
		if (!isLoading && user) {
			// Update userData with Auth0 profile info
			updateUserData({
				firstName: user.given_name as string,
				lastName: user.family_name as string,
				email: user.email as string,
				profileImage: user.picture as string,
				// Update the details array for email
				details: [
					{ label: 'Email', value: user.email as string, placeholder: 'Añadir email' },
					{ label: 'Teléfono', value: '', placeholder: 'Añadir teléfono' },
				],
			});
			console.log('User data updated with Auth0 profile');
		}
	}, [user, isLoading]);

	// This component doesn't render anything
	return null;
}
