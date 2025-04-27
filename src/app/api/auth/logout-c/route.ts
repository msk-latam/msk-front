import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const cookieStore = cookies();

		cookieStore.delete('access_token');
		cookieStore.delete('email');
		cookieStore.delete('picture');

		console.log('Access token cookie cleared');
		return NextResponse.json({ message: 'Logout successful' });
	} catch (error) {
		console.error('Logout API route error:', error);
		return NextResponse.json({ message: 'An unexpected error occurred during logout' }, { status: 500 });
	}
}
