import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

// Fase 1: inicia login y redirige a /social-redirect
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const connection = searchParams.get('connection');

	const res = await auth0.handleLogin(request, {
		returnTo: `/api/auth/social-redirect?connection=${connection}`,
	});

	return res;
}
