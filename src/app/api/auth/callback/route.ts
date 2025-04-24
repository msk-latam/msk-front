// /app/api/auth/callback/route.ts
import { auth0 } from '@/lib/auth0';
import { Session } from '@auth0/nextjs-auth0/edge';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const afterCallback = (req: NextRequest, session: Session) => {
	// Log request information
	// console.log('Auth callback session:', session);

	// Return the session unmodified
	return session;
};

export const GET = auth0.handleCallback({
	afterCallback,
});
