import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const cookieStore = cookies();

		cookieStore.delete('access_token');
		cookieStore.delete('email');
		cookieStore.delete('picture');
		cookieStore.delete('first_name');
		cookieStore.delete('last_name');
		cookieStore.delete('redirectToDashboard');
		cookieStore.delete('needsProfileCompletion');
		cookieStore.delete('mustSignup');

		console.log('Access token cookie cleared');
		return NextResponse.json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Logout API route error:', error);
		return NextResponse.json({ message: 'An unexpected error occurred during logout' }, { status: 500 });
	}
}
