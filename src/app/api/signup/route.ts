import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface SingupPayload {
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

export async function POST(request: NextRequest) {
	let requestBody: SingupPayload;
	try {
		requestBody = await request.json();
	} catch (error) {
		console.error('Error parsing request body for signup:', error);
		return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
	}

	try {
		cookies().set('email', requestBody.email);
		cookies().set('first_name', requestBody.first_name);
		cookies().set('last_name', requestBody.last_name);

		const apiResponse = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!apiResponse.ok) {
			const errorBody = await apiResponse.text();
			console.error('Error updating signup:', apiResponse.status, errorBody);

			return NextResponse.json(
				{ message: `Failed to update signup: ${apiResponse.status}`, error: errorBody },
				{ status: apiResponse.status },
			);
		}

		const data = await apiResponse.json();
		return NextResponse.json(data, { status: apiResponse.status });
	} catch (error) {
		console.error('Error in customer PUT route:', error);
		return NextResponse.json(
			{ message: 'An unexpected error occurred.', error: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		);
	}
}
