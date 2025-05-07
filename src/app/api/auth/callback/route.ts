// /app/api/auth/callback/route.ts
import { auth0 } from '@/lib/auth0';
import { Session } from '@auth0/nextjs-auth0/edge';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const afterCallback = async (req: NextRequest, session: Session) => {
	console.log('afterCallback received session.user:', JSON.stringify(session?.user, null, 2));
	const cookieStore = cookies();

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
			cookieStore.set('needsProfileCompletion', 'true', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
			return session;
		}

		const data = await response.json();

		console.log('data', data);

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
			cookieStore.set('redirectToDashboard', 'true', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});

			console.log('Access token set in cookie.');
		} else {
			console.warn('Access token not found in backend response.');
			cookieStore.set('needsProfileCompletion', 'true', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
		}
	} catch (error) {
		console.error('Error during afterCallback processing:', error);
		cookieStore.set('needsProfileCompletion', 'true', {
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
