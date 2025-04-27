import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		const apiSignInUrl = 'https://dev.msklatam.tech/msk-laravel/public/api/login';

		if (!apiSignInUrl) {
			console.error('API_SIGN_IN_URL_CLASSIC environment variable is not set.');
			return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
		}

		const response = await fetch(apiSignInUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		console.log('response', response);

		const data = await response.json();

		if (!response.ok) {
			console.log('data', data);
			// Forward the error from the backend API
			return NextResponse.json({ message: data.message || 'Authentication failed' }, { status: response.status });
		}

		const { access_token, token_type, expires_at, name, speciality } = data;

		if (!access_token || typeof expires_at !== 'string') {
			console.error('Invalid response structure from API (expected string expires_at):', data);
			return NextResponse.json({ message: 'Invalid response from authentication server' }, { status: 500 });
		}

		const expiresDate = new Date(expires_at);
		const now = new Date();
		const maxAge = Math.floor((expiresDate.getTime() - now.getTime()) / 1000);

		if (maxAge <= 0) {
			console.error('Token already expired based on expires_at:', expires_at);
			return NextResponse.json({ message: 'Received an expired token' }, { status: 500 });
		}

		// Setear la cookie
		cookies().set('access_token', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: maxAge,
			path: '/',
			sameSite: 'strict', // O 'lax' según necesidad
		});

		cookies().set('email', email, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: maxAge,
			path: '/',
			sameSite: 'strict', // O 'lax' según necesidad
		});

		// Podrías devolver solo éxito o algunos datos del usuario si la API los incluye
		return NextResponse.json({ message: 'Login successful' });
	} catch (error) {
		console.log('error', error);
		console.error('Login-c API route error:', error);
		return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
	}
}
