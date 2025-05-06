import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface UpdateCustomerPayload {
	document_type?: string;
	identification?: string;
	company_name?: string;
	name?: string;
	surname?: string;
	country?: string;
	gender?: string;
	password?: string;
	phone?: string;
	profession?: string;
	specialty?: string;
	workplace?: string;
	school_associate?: boolean;
	school_name?: string;
	canton_place?: string;
	parish_place?: string;
	income_source?: string;
	invoice_required?: boolean;
	billing_email?: string;
	billing_phone?: string;
	tax_regime?: string;
}

export async function PUT(request: NextRequest) {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;

	if (!token || !email) {
		console.log('No token or email provided for customer update.');
		cookies().delete('access_token');
		cookies().delete('email');
		cookies().delete('picture');
		return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
	}

	let requestBody: UpdateCustomerPayload;
	try {
		requestBody = await request.json();
	} catch (error) {
		console.error('Error parsing request body for customer update:', error);
		return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
	}

	try {
		const apiResponse = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/customer/${email}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!apiResponse.ok) {
			const errorBody = await apiResponse.text();
			console.error('Error updating customer data:', apiResponse.status, errorBody);
			// Optionally, clear cookies if the update fails due to auth issues,
			// though for PUT, it might be better to let the user retry or understand the specific error.
			// if (apiResponse.status === 401 || apiResponse.status === 403) {
			//   cookies().delete('access_token');
			//   cookies().delete('email');
			//   cookies().delete('picture');
			// }
			return NextResponse.json(
				{ message: `Failed to update customer data: ${apiResponse.status}`, error: errorBody },
				{ status: apiResponse.status },
			);
		}

		const data = await apiResponse.json();
		return NextResponse.json(data, { status: apiResponse.status });
	} catch (error) {
		console.error('Error in customer PUT route:', error);
		// Consider if cookies should be cleared on such an internal server error.
		// cookies().delete('access_token');
		// cookies().delete('email');
		// cookies().delete('picture');
		return NextResponse.json(
			{ message: 'An unexpected error occurred.', error: error instanceof Error ? error.message : String(error) },
			{ status: 500 },
		);
	}
}
