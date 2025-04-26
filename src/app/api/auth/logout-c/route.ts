import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		// Obtener la instancia de cookies
		const cookieStore = cookies();

		// Intentar borrar la cookie 'access_token'
		// Especificar las mismas opciones (path, domain si aplica) que se usaron al setearla es importante
		cookieStore.delete('access_token');

		// O, si delete no funciona en todos los casos, setearla con maxAge 0 o negativo:
		/*
    cookieStore.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // O 0. Indica al navegador que la elimine inmediatamente
      path: '/',
      sameSite: 'strict',
    });
    */

		console.log('Access token cookie cleared');
		return NextResponse.json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Logout API route error:', error);
		return NextResponse.json({ message: 'An unexpected error occurred during logout' }, { status: 500 });
	}
}
