import { auth0 } from '@/lib/auth0';
import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';
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
	const signup = searchParams.get('signup');
	const lang = searchParams.get('lang');

	if (lang) {
		cookies().set('msk-country', lang, {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
			sameSite: 'lax',
		});
	}

	/* si tiene signup, setear cookie needsSignup */
	if (signup) {
		cookies().set('needsSignup', 'true', {
			path: '/',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
			sameSite: 'lax',
		});
	} else {
		cookies().delete('needsSignup');
	}
	return {
		authorizationParams: {
			connection: connection ?? undefined,
		},
	};
});
