import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
	try {
		const cookieStore = cookies();

		cookieStore.delete('needsProfileCompletion');

		return NextResponse.json({ message: 'needsProfileCompletion cookie cleared' });
	} catch (error) {
		console.error('Complete profile API route error:', error);
		return NextResponse.json({ message: 'An unexpected error occurred during complete profile' }, { status: 500 });
	}
}
