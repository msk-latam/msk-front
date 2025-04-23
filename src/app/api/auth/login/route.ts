import { auth0 } from '@/lib/auth0';
// Import of NextRequest might be unnecessary now
// import { NextRequest } from 'next/server';

// Fase 1: inicia login y redirige a /social-redirect
export const GET = auth0.handleLogin((req) => {
	if (!req.url) {
		// Or handle appropriately, maybe return an error response
		throw new Error('Request URL is missing in login handler');
	}
	const url = new URL(req.url); // Guaranteed string now
	const { searchParams } = url;
	const connection = searchParams.get('connection');
	return {
		authorizationParams: {
			connection: connection ?? undefined,
		},
		returnTo: `/api/auth/social-redirect?connection=${connection}`,
	};
});
