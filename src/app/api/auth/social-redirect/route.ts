import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const connection = searchParams.get('connection');

	const originalUrl = searchParams.get('state')
		? `${process.env.AUTH0_DOMAIN}/authorize?${request.url.split('?')[1]}`
		: undefined;

	if (!originalUrl || !connection) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	const url = new URL(originalUrl);
	url.searchParams.set('connection', connection);
	url.searchParams.set('prompt', 'login');

	return NextResponse.redirect(url.toString());
}
