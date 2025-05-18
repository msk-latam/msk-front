// /app/api/auth/callback/route.ts
import { auth0 } from '@/lib/auth0';
import { environmentBackend } from '@/utils/isProductive';
import { Session } from '@auth0/nextjs-auth0/edge';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

interface SignupPayload {
	email: string;
	first_name: string;
	last_name: string;
	phone: string;
	country: string;
	profession: string;
	speciality: string;
	Otra_profesion: string;
	Otra_especialidad: string;
	Career: string;
	Year: string;
	type: string;
	identification: string;
	Terms_And_Conditions: boolean;
}

const signup = async (email: string, first_name: string, last_name: string, lang: string) => {
	const requestBody: SignupPayload = {
		email: email,
		first_name: first_name,
		last_name: last_name,
		country: lang || 'AR',
		phone: '1',
		Terms_And_Conditions: true,
		profession: '-',
		speciality: '-',
		Otra_profesion: '',
		Otra_especialidad: '',
		Career: '',
		Year: '',
		type: '',
		identification: '',
	};

	const response = await fetch(`${environmentBackend}/api/signup`, {
		// const response = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});
	return response.json();
};

const afterCallback = async (req: NextRequest, session: Session) => {
	const cookieStore = cookies();

	const needsSignup = cookieStore.get('needsSignup');
	const lang = cookieStore.get('msk-country')?.value.replace(/[^a-z]/gi, '') || 'AR';

	if (needsSignup) {
		cookieStore.delete('needsSignup');
		await signup(session.user.email, session.user.given_name, session.user.family_name, lang);
	}

	try {
		const response = await fetch('https://dev.msklatam.tech/msk-laravel/public/api/loginAuth0', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ auth0_token: session.idToken }),
			cache: 'no-store', // Disable caching to prevent the 2MB cache limit error
		});

		if (!response.ok) {
			console.error('Failed to fetch token from backend:', response.status, await response.text());
			cookieStore.set('first_name', session.user.given_name, {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
			cookieStore.set('last_name', session.user.family_name, {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
			cookieStore.set('email', session.user.email, {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
			cookieStore.set('picture', session.user.picture, {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
			cookieStore.set('mustSignup', 'true', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});

			return session;
		}

		const data = await response.json();

		const customerResponse = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/customer/${session.user.email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		const customerData = await customerResponse.json();

		if (data.access_token) {
			const expiresDate = data.expires_at ? new Date(data.expires_at) : undefined;

			cookieStore.set('access_token', data.access_token, {
				path: '/',
				expires: expiresDate,
				sameSite: 'lax',
			});

			cookieStore.set('email', session.user.email, {
				path: '/',
				expires: expiresDate,
				sameSite: 'lax',
			});
			cookieStore.set('picture', session.user?.picture, {
				path: '/',
				expires: expiresDate,
				sameSite: 'lax',
			});

			if (customerData.platform_user === 0) {
				cookieStore.set('needsProfileCompletion', 'true', {
					path: '/',
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
					sameSite: 'lax',
				});
			} else {
				cookieStore.set('redirectToDashboard', 'true', {
					path: '/',
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
					sameSite: 'lax',
				});
			}
		} else {
			console.warn('Access token not found in backend response.');
			cookieStore.set('mustSignup', 'true', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
		}
	} catch (error) {
		console.error('Error during afterCallback processing:', error);
		cookieStore.set('mustSignup', 'true', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
			sameSite: 'lax',
		});
	}

	return session;
};

export const GET = auth0.handleCallback({
	afterCallback,
});
