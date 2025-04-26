// /app/api/auth/callback/route.ts
import { auth0 } from '@/lib/auth0';
import { Session } from '@auth0/nextjs-auth0/edge';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const afterCallback = async (req: NextRequest, session: Session) => {
	// Log request information
	//
	// 	// console.log('Auth callback session:', session);

	const res = new NextResponse();
	console.log('Id token:', session.idToken);
	try {
		const response = await fetch('https://dev.msklatam.tech/msk-laravel/public/api/loginAuth0', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ auth0_token: session.idToken }),
		});

		if (!response.ok) {
			console.error('Failed to fetch token from backend:', response.status, await response.text());
			// Handle error appropriately, maybe redirect to an error page or return the session unmodified
			return session;
		}

		const data = await response.json();

		console.log('Auth callback data:', data);

		// Set the access token in cookies
		if (data.access_token) {
			const cookieStore = cookies();
			const expiresDate = data.expires_at ? new Date(data.expires_at) : undefined;

			cookieStore.set('access_token', data.access_token, {
				path: '/', // Available on all paths
				expires: expiresDate, // Set expiry based on API response
				sameSite: 'lax', // Recommended for CSRF protection
			});
			console.log('Access token set in cookie.');

			// return NextResponse.redirect(new URL('/dashboard', req.url));
		} else {
			console.warn('Access token not found in backend response.');
		}
	} catch (error) {
		console.error('Error during afterCallback processing:', error);
		// Handle fetch or JSON parsing errors
	}

	// Return the session unmodified as required by handleCallback
	return session;
};

export const GET = auth0.handleCallback({
	afterCallback,
});
