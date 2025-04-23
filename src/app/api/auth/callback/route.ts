// /app/api/auth/callback/route.ts
import { auth0 } from '@/lib/auth0';

export const dynamic = 'force-dynamic';

export const GET = auth0.handleCallback;
