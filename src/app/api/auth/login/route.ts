import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const connection = searchParams.get('connection');

	const loginUrl = new URL(`https://dev-msklatam.us.auth0.com/authorize`);
	loginUrl.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID!);
	loginUrl.searchParams.set('response_type', 'code');
	loginUrl.searchParams.set('redirect_uri', `${process.env.AUTH0_BASE_URL}/api/auth/callback`);
	loginUrl.searchParams.set('scope', 'openid profile email');
	loginUrl.searchParams.set('connection', connection ?? '');
	loginUrl.searchParams.set('prompt', 'login');

	return NextResponse.redirect(loginUrl.toString());
}
