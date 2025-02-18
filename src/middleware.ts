import api from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
// @ts-ignore
import i18nConfig from './i18nConfig';

const protectedRoutes = ['/mi-cuenta', 'mi-perfil'];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith('/ar')) {
		// Elimina "/ar" y mantiene el resto de la URL
		const newPath = pathname.replace(/^\/ar/, '');
		return NextResponse.redirect(new URL(newPath || '/', request.url), 301);
	}
	if (pathname.startsWith('/us') && !pathname.startsWith('/us/us')) {
		const newPath = pathname.replace(/^\/us/, ''); // Elimina "/us" y mantiene el resto
		return NextResponse.redirect(new URL(newPath, request.url), 301);
	}
	if (pathname.startsWith('/br') && !pathname.startsWith('/br/br')) {
		const newPath = pathname.replace(/^\/us/, ''); // Elimina "/us" y mantiene el resto
		return NextResponse.redirect(new URL(newPath, request.url), 301);
	}
	if (pathname.startsWith('/ch') && !pathname.startsWith('/ch/ch')) {
		const newPath = pathname.replace(/^\/us/, ''); // Elimina "/us" y mantiene el resto
		return NextResponse.redirect(new URL(newPath, request.url), 301);
	}
	// return i18nRouter(request, i18nConfig); //esto hace la redireccion automatica
}

// only applies this middleware to files in the app directory
export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};

export const fetchUserData = async () => {
	try {
		// console.log("MIDDLEWARE FETCH DATA");
		const res = await api.getUserData();
		if (!res.message) {
			localStorage.setItem(
				'user',
				JSON.stringify({
					name: res.name,
					speciality: res.contact.speciality,
				}),
			);
			// localStorage.setItem('bypassRedirect', res.test);
			localStorage.removeItem('bypassRedirect');
			return {
				name: res.name,
				speciality: res.contact.speciality,
				profile: res.contact,
			};
		} else {
			// console.log(res.response.status);
			return null;
		}
	} catch (e) {
		console.error({ e });
		localStorage.removeItem('email');
		localStorage.removeItem('user');
		return null;
	}
};
