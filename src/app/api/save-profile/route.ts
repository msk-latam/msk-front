import { UserProfileData } from '@/modules/dashboard/components/ProfileEditModal'; // Adjust path if necessary
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_ENDPOINT = 'https://dev.msklatam.tech/msk-laravel/public/api/profile/';

export async function PUT(request: NextRequest) {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;

	if (!token || !email) {
		return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
	}

	let requestData: Partial<UserProfileData>;
	try {
		requestData = await request.json();
	} catch (error) {
		return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
	}

	// --- Data Transformation ---
	// Define the structure the EXTERNAL API expects (only fields being sent)
	interface ExternalApiPayload {
		email?: string;
		name?: string;
		last_name?: string; // snake_case
		profession?: string;
		speciality?: string;
		phone?: string; // Expects the full phone number like +52...
		country?: string;
		// Map other fields based on your external API requirements
		// Your external API sample had placeOfWork and asosiacion, let's map to those
		placeOfWork?: string | null; // Map 'workplace' from form
		asosiacion?: string | null; // Map 'medicalCollegeName' from form
		workArea?: string | null; // Map 'workArea' if needed
		other_profession?: string | null; // Map 'other_profession' from form
		other_speciality?: string | null; // Map 'other_speciality' from form
		state?: string | null; // Map 'state' from form
		// Add any other updatable fields the external API might need from UserProfileData
	}

	const externalPayload: ExternalApiPayload = {};

	externalPayload.other_profession = '';
	externalPayload.other_speciality = '';
	externalPayload.state = 'Chiapas';

	// Map fields from UserProfileData (requestData) to ExternalApiPayload
	if (requestData.name !== undefined) externalPayload.name = requestData.name;
	if (requestData.email !== undefined) externalPayload.email = requestData.email;
	if (requestData.lastName !== undefined) externalPayload.last_name = requestData.lastName; // Map to snake_case
	if (requestData.profession !== undefined) externalPayload.profession = requestData.profession;
	if (requestData.speciality !== undefined) {
		// Assuming the API expects the 'value' ('bioquimica') not the 'label' ('Bioquímica')
		// If it expects the label, you might need a lookup here or send both
		externalPayload.speciality = requestData.speciality;
	}
	if (requestData.country !== undefined) externalPayload.country = requestData.country;
	// Use fullPhoneNumber which holds the combined value (+52...)
	if (requestData.fullPhoneNumber !== undefined) externalPayload.phone = requestData.fullPhoneNumber;

	// Map potentially ambiguous fields - Adjust mapping if needed
	if (requestData.workplace !== undefined) externalPayload.placeOfWork = requestData.workplace;
	if (requestData.medicalCollegeName !== undefined) {
		// Only send 'asosiacion' if the user belongs to one and provided a name
		externalPayload.asosiacion =
			requestData.belongsToMedicalCollege && requestData.medicalCollegeName ? requestData.medicalCollegeName : ''; // Send empty string or null based on API expectation
	}
	if (requestData.workArea !== undefined) externalPayload.workArea = requestData.workArea;

	// NOTE: Do NOT send fields like id, entity_id_crm, user_id, email, password, contracts,
	// courses_progress etc. in an UPDATE request unless the API specifically requires them.
	// These are often identifiers or handled by separate mechanisms.

	console.log('Transformed Payload for External API:', externalPayload);
	// --- End Data Transformation ---

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
			body: JSON.stringify(externalPayload),
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
