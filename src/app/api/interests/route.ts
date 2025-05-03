import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const email = cookies().get('email')?.value;

	if (!email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 });
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`);
	const data = await response.json();

	console.log('obteniendo intereses de: ', `${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`);
	console.log('respuesta: ', data);

	return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
	const email = cookies().get('email')?.value;

	const body = await request.json();
	console.log('actualizando intereses de: ', `${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`);
	console.log('body: ', body);

	if (!email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 });
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/customer/interests/${email}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	const data = await response.json();
	console.log('respuesta: ', data);

	return NextResponse.json(data);
}
