import { environmentBackend } from '@/utils/isProductive';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_ENDPOINT = `${environmentBackend}/api/customer/`;

export async function PUT(request: NextRequest) {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;

	if (!token || !email) {
		return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
	}
	try {
		// Use the transformed payload
		const response = await fetch(`${EXTERNAL_API_ENDPOINT}${email}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			// SEND THE TRANSFORMED PAYLOAD
			body: JSON.stringify(request.body),
		});

		const responseData = await response.json().catch(() => ({})); // Try to parse JSON, default to empty object if fails

		if (!response.ok) {
			console.error('Error updating profile via external API:', response.status, responseData);
			// Forward the status and error message from the external API if possible
			return NextResponse.json(
				{ message: `Failed to update profile: ${response.statusText}`, details: responseData },
				{ status: response.status },
			);
		}

		// Return the successful response from the external API
		return NextResponse.json(responseData, { status: response.status });
	} catch (error: any) {
		console.error('Internal server error in save-profile route:', error);
		return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
	}
}
