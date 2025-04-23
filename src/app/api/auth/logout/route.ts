import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

// Force this route to be dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	return auth0.handleLogout(request);
}
