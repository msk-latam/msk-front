import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
	domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL!,
	client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
	authorizationParams: {
		redirect_uri: 'http://localhost:3000',
	},
});

export default auth0;
