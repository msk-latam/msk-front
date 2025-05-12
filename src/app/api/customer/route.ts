import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface UpdateCustomerPayload {
	document_type?: string;
	identification?: string;
	company_name?: string;
	first_name?: string;
	last_name?: string;
	country?: string;
	gender?: string;
	password?: string;
	career?: string;
	phone?: string;
	profession?: string;
	specialty?: string;
	workplace?: string;
	school_associate?: boolean;
	school_name?: string;
	canton_place?: string;
	parish_place?: string;
	income_source?: string;
	invoice_required?: number;
	billing_email?: string;
	billing_phone?: string;
	tax_regime?: string;
	interests?: {
		specialty_interests: string[] | null;
		content_interests: string[] | null;
		other_interests: string[] | null;
	};
}

export async function PUT(request: NextRequest) {
	const email = cookies().get('email')?.value;

	if (!email) {
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

	// if (requestBody.invoice_required !== undefined) {
	// 	let numericValue: number | undefined = undefined;
	// 	if (typeof requestBody.invoice_required === 'string') {
	// 		const parsedValue = parseInt(requestBody.invoice_required, 10);
	// 		if (!isNaN(parsedValue)) {
	// 			numericValue = parsedValue;
	// 		} else {
	// 			console.error('Invalid string value for invoice_required:', requestBody.invoice_required);
	// 			return NextResponse.json({ message: 'Invalid value for invoice_required. Must be 0, 1, or 2.' }, { status: 400 });
	// 		}
	// 	} else if (typeof requestBody.invoice_required === 'number') {
	// 		numericValue = requestBody.invoice_required;
	// 	} else {
	// 		console.error('Invalid type for invoice_required:', typeof requestBody.invoice_required);
	// 		return NextResponse.json({ message: 'Invalid type for invoice_required. Must be a number.' }, { status: 400 });
	// 	}

	// 	// Temporary workaround: Convert invoice_required to boolean before sending to backend
	// 	if (numericValue === 0) {
	// 		(requestBody as any).invoice_required = false;
	// 	} else if (numericValue === 1 || numericValue === 2) {
	// 		(requestBody as any).invoice_required = true;
	// 	} else {
	// 		// Keep the original number if it's not 0, 1, or 2 (though unlikely based on frontend)
	// 		requestBody.invoice_required = numericValue;
	// 	}
	// }

	try {
		console.log('email', email);
		console.log('requestBody', requestBody);

		const apiResponse = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/customer/${email}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!apiResponse.ok) {
			const errorBody = await apiResponse.text();
			console.error('Error updating customer data:', apiResponse.status, errorBody);

			return NextResponse.json(
				{ message: `Failed to update customer data: ${apiResponse.status}`, error: errorBody },
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
