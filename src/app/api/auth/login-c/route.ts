import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		//limpiar cookies para evitar que se guarde el email
		cookies().delete('email');
		cookies().delete('first_name');
		cookies().delete('last_name');
		cookies().delete('access_token');
		cookies().delete('picture');

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

		const data = await response.json();

		if (!response.ok) {
			// Forward the error from the backend API
			return NextResponse.json({ message: data.message || 'Authentication failed' }, { status: response.status });
		}

		const { access_token, token_type, expires_at, name, speciality } = data;

		if (!access_token || typeof expires_at !== 'string') {
			console.error('Invalid response structure from API (expected string expires_at):', data);
			return NextResponse.json({ message: 'Invalid response from authentication server' }, { status: 500 });
		}

		/* llamar a la api de customer, si retorna platform_user en 0, llevar a completar perfil */

		const customerResponse = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/customer/${email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		const customerData = await customerResponse.json();
		// console.log('customerData', customerData);

		// si el usuario tiene un perfil completo pero aun asi llega plaform_user en 0, poner plataforma_user en 1 y actualizarlo por post

		/* si tiene country, profession !== a -,  specialty !== a -, workplace en null,  work_area en null . Poner */

		// const updateCustomerResponse = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/customer/${email}`, {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json',
		// 	},
		// 	body: JSON.stringify({ platform_user: 1 }),
		// });

		// const updateCustomerData = await updateCustomerResponse.json();
		// console.log('updateCustomerData', updateCustomerData);

		if (customerData.platform_user === 0) {
			cookies().set('needsProfileCompletion', 'true', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				sameSite: 'lax',
			});
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
