import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const email = cookies().get('email')?.value;

	if (!email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 });
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`);
	const data = await response.json();

	console.log('data', `${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`);
	console.log('data', data);

	return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
	const email = cookies().get('email')?.value;

	const body = await request.json();
	console.log('body', body);

	if (!email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 });
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`, {
		method: 'PUT',
		body: JSON.stringify(body),
	});

	const data = await response.json();
	console.log('data', data);

	return NextResponse.json(data);
}
