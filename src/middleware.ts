import api from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
// @ts-ignore
import i18nConfig from './i18nConfig';

const protectedRoutes = ['/mi-cuenta', 'mi-perfil'];

export function middleware(request: NextRequest) {
	// const validCountries = [
	// 	'ar',
	// 	'mx',
	// 	'cl',
	// 	'es',
	// 	'co',
	// 	'cr',
	// 	'pe',
	// 	'uy',
	// 	'bo',
	// 	'ec',
	// 	've',
	// 	'pa',
	// 	'gt',
	// 	'hn',
	// 	'sv',
	// 	'ni',
	// 	'es',
	// 	'br',
	// 	'in',
	// 	'us',
	// ];
	const validCountries = [
		'ar',
		'mx',
		'cl',
		'es',
		'co',
		'cr',
		'pe',
		'uy',
		'bo',
		'ec',
		've',
		'pa',
		'gt',
		'hn',
		'sv',
		'ni',
		'br',
		'in',
		'us',
		'ca',
		'gb',
		'de',
		'fr',
		'it',
		'nl',
		'be',
		'ch',
		'se',
		'no',
		'dk',
		'fi',
		'ru',
		'cn',
		'jp',
		'kr',
		'au',
		'nz',
		'za',
		'eg',
		'sa',
		'ae',
		'tr',
		'id',
		'my',
		'ph',
		'th',
		'vn',
		'sg',
		'bd',
		'pk',
		'ir',
		'ng',
		'ke',
		'gh',
		'tz',
		'zm',
		'zw',
		'ma',
		'dz',
		'tn',
		'ie',
		'pl',
		'cz',
		'ro',
		'hu',
		'gr',
		'pt',
		'at',
		'sk',
		'bg',
		'hr',
		'lt',
		'si',
		'lv',
		'ee',
		'mt',
		'cy',
		'lu',
		'is',
		'li',
		'mc',
		'sm',
		'va',
		'ad',
		'ba',
		'mk',
		'al',
		'rs',
		'me',
		'xk',
		'by',
		'ua',
		'md',
		'ge',
		'am',
		'az',
		'kz',
		'uz',
		'tm',
		'kg',
		'tj',
		'mn',
		'af',
		'lk',
		'np',
		'bt',
		'mv',
		'mm',
		'kh',
		'la',
		'bn',
		'tl',
		'sb',
		'vu',
		'fj',
		'pg',
		'nc',
		'pf',
		'ws',
		'to',
		'tv',
		'nr',
		'ki',
		'ck',
		'nu',
		'tk',
		'fm',
		'mh',
		'pw',
		'as',
		'gu',
		'mp',
		'um',
		'wf',
		'tf',
		'io',
		'sh',
		'pn',
		'gs',
		'aq',
		'ml',
	];

	const { pathname } = request.nextUrl;

	if (pathname.startsWith('/ar')) {
		// Elimina "/ar" y mantiene el resto de la URL
		const newPath = pathname.replace(/^\/ar/, '');
		return NextResponse.redirect(new URL(newPath || '/', request.url), 301);
	}
	const segments = pathname.split('/').filter(Boolean); // Divide la ruta en segmentos

	// Si la URL tiene múltiples repeticiones del país, redirige a la versión limpia
	if (segments.length > 1 && validCountries.includes(segments[0]) && segments[0] === segments[1]) {
		const newPath = `/${segments.slice(1).join('/')}`; // Elimina la repetición
		return NextResponse.redirect(new URL(newPath || '/', request.url), 301);
	}

	// Si el primer segmento es un país válido, dejamos la URL como está
	if (validCountries.includes(segments[0])) {
		return NextResponse.next();
	}
	// if (pathname.startsWith('/us') && !pathname.startsWith('/us/us')) {
	// 	const newPath = pathname.replace(/^\/us/, ''); // Elimina "/us" y mantiene el resto
	// 	return NextResponse.redirect(new URL(newPath, request.url), 301);
	// }
	// if (pathname.startsWith('/br') && !pathname.startsWith('/br/br')) {
	// 	const newPath = pathname.replace(/^\/us/, ''); // Elimina "/us" y mantiene el resto
	// 	return NextResponse.redirect(new URL(newPath, request.url), 301);
	// }
	// if (pathname.startsWith('/ch') && !pathname.startsWith('/ch/ch')) {
	// 	const newPath = pathname.replace(/^\/us/, ''); // Elimina "/us" y mantiene el resto
	// 	return NextResponse.redirect(new URL(newPath, request.url), 301);
	// }
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
