import { auth0 } from '@/lib/auth0';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Force this route to be dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	const cookieStore = cookies();
	cookieStore.delete('access_token');
	cookieStore.delete('email');
	cookieStore.delete('picture');
	cookieStore.delete('first_name');
	cookieStore.delete('last_name');
	cookieStore.delete('redirectToDashboard');
	cookieStore.delete('needsProfileCompletion');

	return auth0.handleLogout();
}
