// /app/api/auth/callback/route.ts
import { handleCallback } from '@/lib/auth0';

export const dynamic = 'force-dynamic';

export const GET = handleCallback;
