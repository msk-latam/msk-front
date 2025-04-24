// /lib/auth0.ts
import { initAuth0 } from '@auth0/nextjs-auth0';

export const auth0 = initAuth0({
	secret: process.env.AUTH0_SECRET!,
	issuerBaseURL: process.env.AUTH0_DOMAIN!,
	baseURL: process.env.AUTH0_BASE_URL!,
	clientID: process.env.AUTH0_CLIENT_ID!,
	clientSecret: process.env.AUTH0_CLIENT_SECRET!,
	routes: {
		login: '/api/auth/login',
		callback: '/api/auth/callback',
	},
	session: {
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		},
	},
});
