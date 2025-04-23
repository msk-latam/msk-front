import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	console.log('handleCallback');
	console.log(request);
	return auth0.handleCallback(request);
}
export async function POST(request: NextRequest) {
	const url = new URL(request.url);
	const error = url.searchParams.get('error');
	const errorDescription = url.searchParams.get('error_description');

	if (error === 'access_denied') {
		// Redirect to login page with error message
		return Response.redirect(
			`${url.origin}/login?error=${encodeURIComponent(errorDescription || 'Authentication was denied')}`,
			302,
		);
	}

	// Handle other errors or fallback to normal callback
	return auth0.handleCallback(request);
}
