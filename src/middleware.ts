import { supportedLanguages } from '@/config/languages';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function enforceUserCountryPrefix(request: NextRequest) {
	const cookieCountry = request.cookies.get('msk-country')?.value;
	const pathCountry = request.nextUrl.pathname.split('/')[1];

	const isValidPrefix = supportedLanguages.includes(pathCountry);

	if (!isValidPrefix && cookieCountry && supportedLanguages.includes(cookieCountry)) {
		const newUrl = request.nextUrl.clone();
		newUrl.pathname = `/${cookieCountry}${request.nextUrl.pathname}`;
		return NextResponse.redirect(newUrl);
	}

	return null;
}
let needsProfileCompletionBoolean: boolean | null = null;
let redirectToDashboard: boolean | null = null;

export function middleware(request: NextRequest) {
	const cookieStore = cookies();

	if (needsProfileCompletionBoolean === null) {
		if (cookieStore.get('needsProfileCompletion')?.value != null) {
			needsProfileCompletionBoolean = cookieStore.get('needsProfileCompletion')?.value === 'true';
		}
	}

	if (redirectToDashboard === null) {
		if (cookieStore.get('redirectToDashboard')?.value != null) {
			redirectToDashboard = cookieStore.get('redirectToDashboard')?.value === 'true';
		}
	}

	if (redirectToDashboard) {
		redirectToDashboard = false;
		return NextResponse.redirect(new URL('/dashboard', request.url));
	} else {
		redirectToDashboard = null;
	}

	if (needsProfileCompletionBoolean) {
		needsProfileCompletionBoolean = false;
		return NextResponse.redirect(new URL('/completar-perfil', request.url));
	} else {
		needsProfileCompletionBoolean = null;
	}

	const { pathname, origin } = request.nextUrl;
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];
	const secondSegment = segments[1];
	const country = request.cookies.get('msk-country')?.value || 'ar';

	// 🔒 Protected routes
	const accessToken = request.cookies.get('access_token');
	const isAuthenticated = Boolean(accessToken);
	const protectedPaths = ['/dashboard'];
	if (protectedPaths.some((path) => pathname.startsWith(path)) && !isAuthenticated) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// Redirect to dashboard if authenticated and trying to access login
	if (isAuthenticated && pathname.includes('/login') && request.nextUrl.searchParams.get('form') !== 'change-pass') {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}
	if (isAuthenticated && pathname.includes('/completar-perfil')) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	// 🚫 Allow change-pass login only
	if (pathname.includes('/login') && request.nextUrl.searchParams.get('form') === 'change-pass') {
		if (!pathname.startsWith('/ar/')) {
			const rewriteUrl = new URL('/ar/login', request.url);
			rewriteUrl.searchParams.set('form', 'change-pass');
			return NextResponse.rewrite(rewriteUrl);
		}
		return NextResponse.next();
	}

	// 🔁 Redirect for /tienda/curso/[slug] → /curso/[slug]
	const match = pathname.match(/^\/tienda\/curso\/(.+)/);
	if (match) {
		const slug = match[1];
		const newUrl = request.nextUrl.clone();
		newUrl.pathname = `/curso/${slug}`;
		return NextResponse.redirect(newUrl);
	}

	// 🌐 Country prefix enforcement (only if missing)
	const countryRedirect = enforceUserCountryPrefix(request);
	if (countryRedirect) return countryRedirect;

	// 🧼 Cleanup duplicated /home or /ar segments
	if (segments.includes('home') || segments.includes('ar')) {
		const cleanedSegments = segments.filter((s) => s !== 'home' && s !== 'ar');
		return NextResponse.redirect(new URL(`/${cleanedSegments.join('/') || ''}`, origin));
	}

	// 🧼 Cleanup /tienda/tienda and /curso/curso
	if (
		!supportedLanguages.includes(firstSegment) &&
		((segments[0] === 'tienda' && segments[1] === 'tienda') || (segments[0] === 'curso' && segments[1] === 'curso'))
	) {
		const newPath = '/' + segments.slice(1).join('/');
		return NextResponse.redirect(new URL(newPath, origin));
	}

	// 🏠 Homepage logic
	if (pathname === '/') {
		return country === 'ar'
			? NextResponse.rewrite(new URL('/ar/home', request.url))
			: NextResponse.redirect(new URL(`/${country}/home`, origin));
	}

	// 🏠 Redirect /mx → /mx/home (rewrite invisible)
	if (supportedLanguages.includes(firstSegment) && segments.length === 1) {
		const newUrl = new URL(`/${firstSegment}/home`, request.url);
		return NextResponse.rewrite(newUrl);
	}

	// 🧼 Cleanup duplicated country prefix /mx/mx
	if (segments.length > 1 && supportedLanguages.includes(firstSegment) && firstSegment === secondSegment) {
		const newPath = '/' + firstSegment + '/' + segments.slice(2).join('/');
		return NextResponse.redirect(new URL(newPath, origin));
	}

	// 🔁 /change-pass without prefix
	if (pathname === '/change-pass' && request.nextUrl.searchParams.has('token')) {
		const token = request.nextUrl.searchParams.get('token');
		const newUrl = new URL(`/${country}/login`, origin);
		newUrl.searchParams.set('form', 'change-pass');
		newUrl.searchParams.set('token', token!);
		return NextResponse.redirect(newUrl);
	}

	// 🧼 Add default prefix if missing
	if (!supportedLanguages.includes(firstSegment)) {
		return NextResponse.rewrite(new URL(`/ar${pathname}`, request.url));
	}
	// 🚀 **Regla Nueva:** Si es Argentina y estamos en `/dashboard`, eliminar ese prefijo
	if (country === 'ar' && pathname.startsWith('/dashboard')) {
		const newUrl = new URL(`${origin}${pathname.replace('/dashboard', '')}`);
		return NextResponse.redirect(newUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next|icons).*)'],
};
