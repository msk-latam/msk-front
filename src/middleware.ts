import { supportedLanguages } from '@/config/languages';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('access_token');
	const isAuthenticated = Boolean(accessToken);
	const protectedPaths = ['/dashboard'];

	const { pathname, origin } = request.nextUrl;
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];
	const secondSegment = segments[1];

	const country = request.cookies.get('country')?.value || 'ar';

	/* --- Authentication --- */
	if (protectedPaths.some((path) => pathname.startsWith(path))) {
		if (!isAuthenticated) {
			const loginUrl = new URL('/login', request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	/* --- Limpieza de rutas --- */
	if (segments.includes('home') || segments.includes('ar')) {
		const newSegments = segments.filter((segment) => segment !== 'home' && segment !== 'ar');
		const newPath = '/' + newSegments.join('/');
		return NextResponse.redirect(new URL(newPath || '/', origin));
	}

	if (
		!supportedLanguages.includes(firstSegment) &&
		segments.length > 2 &&
		segments[0] === 'tienda' &&
		segments[1] === 'tienda'
	) {
		const newPath = '/' + segments.slice(1).join('/');
		return NextResponse.redirect(new URL(newPath, origin));
	}

	/* --- HOME inicial --- */
	if (pathname === '/') {
		if (country === 'ar') {
			// ⚡ Rewrite invisible a /ar/home
			return NextResponse.rewrite(new URL('/ar/home', request.url));
		} else {
			// ⚡ Redirect visible a /mx/
			return NextResponse.redirect(new URL(`/${country}/`, origin));
		}
	}

	// Si pide /mx/ exactamente (sin home)
	if (supportedLanguages.includes(firstSegment) && segments.length === 1) {
		const newUrl = new URL(`/${firstSegment}/home`, request.url);
		return NextResponse.rewrite(newUrl);
	}

	// Si duplicó /mx/mx
	if (segments.length > 1 && supportedLanguages.includes(firstSegment) && firstSegment === secondSegment) {
		const newPath = '/' + firstSegment + '/' + segments.slice(2).join('/');
		return NextResponse.redirect(new URL(newPath, origin));
	}

	// Si no tiene prefijo, asumir Argentina (pero ya estamos en root)
	if (!supportedLanguages.includes(firstSegment)) {
		return NextResponse.rewrite(new URL(`/ar${pathname}`, request.url));
	}
	// 🔁 Redirige /change-pass/?token=... a /[lang]/login?form=change-pass&token=...
	if (pathname === '/change-pass' && request.nextUrl.searchParams.has('token')) {
		const token = request.nextUrl.searchParams.get('token');
		const country = request.cookies.get('country')?.value || 'ar';
		const newUrl = new URL(`/${country}/login`, origin);
		newUrl.searchParams.set('form', 'change-pass');
		newUrl.searchParams.set('token', token!);
		return NextResponse.redirect(newUrl);
	}

	// Todo lo demás OK
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next|icons).*)'],
};
