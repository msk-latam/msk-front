import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			especialidadInteres, // Assuming these names come from the frontend
			contenidoInteres,
			interesesAdicionales,
			crm_id,
		} = body;

		if (
			!crm_id ||
			!Array.isArray(especialidadInteres) ||
			!Array.isArray(contenidoInteres) ||
			!Array.isArray(interesesAdicionales)
		) {
			return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
		}

		// Prepare form data
		const formData = new URLSearchParams();
		formData.append('id', crm_id);
		especialidadInteres.forEach((item: string) => formData.append('Especialidad_interes[]', item));
		contenidoInteres.forEach((item: string) => formData.append('Contenido_Interes[]', item));
		interesesAdicionales.forEach((item: string) => formData.append('Intereses_adicionales[]', item));

		const externalApiResponse = await fetch('https://api.msklatam.net/saveIntereses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(),
		});

		// The external API seems to return JSON even for errors based on the search result
		const responseData = await externalApiResponse.json();

		if (!externalApiResponse.ok || responseData.error) {
			// Log the error from the external API if available
			console.error('External API Error:', responseData.error || `Status: ${externalApiResponse.status}`);
			throw new Error(responseData.error || `External API failed with status ${externalApiResponse.status}`);
		}

		// Assuming the external API returns some success message or data
		return NextResponse.json(responseData, { status: externalApiResponse.status });
	} catch (error: any) {
		console.error('Error saving interests:', error);
		const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
		return NextResponse.json({ error: 'Failed to save interests', details: errorMessage }, { status: 500 });
	}
}
