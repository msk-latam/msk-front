import { environmentBackend } from '@/utils/isProductive';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;

	if (!token || !email) {
		return NextResponse.json(null, { status: 401 });
	}

	try {
		const res = await fetch(`${environmentBackend}/api/profile/${email}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		});

		if (!res.ok) {
			throw new Error('Error fetching profile');
		}

		const userData = await res.json();
		return NextResponse.json(userData);
	} catch (error) {
		console.error(error);
		return NextResponse.json(null, { status: 500 });
	}
}
