import { auth0 } from '@/lib/auth0';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

// Fase 1: inicia login y redirige a /social-redirect
export const GET = auth0.handleLogin((req: NextRequest | NextApiRequest) => {
	const urlString = req.url;
	if (!urlString) {
		// Or handle appropriately, maybe return an error response
		throw new Error('Request URL is missing in login handler');
	}
	const url = new URL(urlString);
	const { searchParams } = url;
	const connection = searchParams.get('connection');

	return {
		authorizationParams: {
			connection: connection ?? undefined,
		},
	};
});
