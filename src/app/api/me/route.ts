import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;

	if (!token || !email) {
		return NextResponse.json({ user: null }, { status: 401 });
	}

	try {
		const res = await fetch(`https://laravel-api.msklatam.com/msk-laravel/public/api/profile/${email}`, {
			headers: {
				Authorization: `Bearer ${token}`, // si la API laravel requiere Bearer token
				Accept: 'application/json',
			},
		});

		console.log('res', res);

		if (!res.ok) {
			throw new Error('Error fetching profile');
		}

		const user = await res.json();
		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ user: null }, { status: 500 });
	}
}
