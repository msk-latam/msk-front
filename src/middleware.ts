import { supportedLanguages } from '@/config/languages';
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

export function middleware(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;
	const cookies = request.cookies;

	const needsProfileCompletion = cookies.get('needsProfileCompletion')?.value === 'true';
	const redirectToDashboardCookie = cookies.get('redirectToDashboard')?.value === 'true';
	const mustSignup = cookies.get('mustSignup')?.value === 'true';

	const accessToken = cookies.get('access_token');
	const isAuthenticated = Boolean(accessToken);
	const country = (cookies.get('msk-country')?.value || 'ar').replace(/[^a-z]/g, '');
	console.log('country', country);
	// --- Priority Redirects based on Cookies ---

	// 1. Redirect to dashboard if flag is set (and clear the flag)
	if (redirectToDashboardCookie) {
		const response =
			country === 'ar'
				? NextResponse.redirect(new URL('/dashboard', request.url))
				: NextResponse.redirect(new URL(`/${country}/dashboard`, request.url));
		response.cookies.delete('redirectToDashboard'); // Clear the cookie
		return response;
	}

	// NEW: Redirect to signup if mustSignup flag is set
	if (mustSignup) {
		/* eliminar cookie */
		cookies.delete('mustSignup');
		const targetUrl = new URL('/login', request.url);
		targetUrl.searchParams.set('form', 'registerForm');

		const response =
			country === 'ar'
				? NextResponse.redirect(targetUrl)
				: NextResponse.redirect(new URL(`/${country}${targetUrl.pathname}${targetUrl.search}`, request.url));
		response.cookies.delete('mustSignup'); // Clear the cookie
		return response;
	}

	// 2. Redirect to complete profile if flag is set (and clear the flag)
	// Only redirect if *not* already on the complete profile page to avoid loops.
	if (needsProfileCompletion && !pathname.includes('/completar-perfil')) {
		/* eliminar cookie */
		cookies.delete('needsProfileCompletion');
		const response =
			country === 'ar'
				? NextResponse.redirect(new URL('/completar-perfil', request.url))
				: NextResponse.redirect(new URL(`/${country}/completar-perfil`, request.url));
		// DO NOT clear the cookie here. It should be cleared upon successful profile completion.
		// response.cookies.delete('needsProfileCompletion');
		return response;
	}

	// --- Authentication-based Redirects ---

	// 3. Protect specific routes
	const protectedPaths = ['/dashboard'];
	if (protectedPaths.some((path) => pathname.startsWith(path)) && !isAuthenticated) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// 4. Redirect authenticated users away from login/signup pages
	//    Exception: Allow access to /completar-perfil if needsProfileCompletion is true.
	const isOnLoginPage = pathname.includes('/login') && request.nextUrl.searchParams.get('form') !== 'change-pass';
	const isOnCompleteProfilePage = pathname.includes('/completar-perfil');

	if (isAuthenticated) {
		if (isOnLoginPage) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
		// If authenticated and on complete profile page, and the redirectToDashboard cookie is NOT set,
		// we allow staying on this page. The redirect to dashboard after profile completion
		// should be handled by the redirectToDashboardCookie logic above.
		// So, we remove the check that relied on !needsProfileCompletion.
		/*
		if (isOnCompleteProfilePage && !needsProfileCompletion) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
		*/
	}

	// --- Other Redirects/Rewrites (Existing Logic - Moved Down) ---

	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];
	const secondSegment = segments[1];

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
