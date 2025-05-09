import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

// TEMPORAL: Solo verifica la presencia de la cookie, no su validez.
// Reemplazar con /api/auth/me cuando el endpoint de Laravel esté listo.
export async function GET(request: NextRequest) {
	const cookieStore = cookies();
	const token = cookieStore.get('access_token');

	if (token) {
		// Cookie encontrada
		return NextResponse.json({ authenticated: true });
	} else {
		/* clear cookies */
		cookieStore.delete('access_token');
		cookieStore.delete('email');
		cookieStore.delete('picture');
		cookieStore.delete('first_name');
		cookieStore.delete('last_name');

		return NextResponse.json({ authenticated: false });
	}
}
