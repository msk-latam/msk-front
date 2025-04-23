// /app/api/auth/callback/route.ts
import { auth0 } from '@/lib/auth0';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		return await auth0.handleCallback(request);
	} catch (error) {
		console.error('Auth callback error:', error);
		return NextResponse.redirect(new URL('/', request.url));
	}
}
