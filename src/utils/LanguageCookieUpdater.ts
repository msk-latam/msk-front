'use client';

import { useEffect } from 'react';
import { supportedLanguages } from '@/config/languages';

export default function LanguageCookieUpdater() {
	useEffect(() => {
		const pathname = window.location.pathname;
		const search = window.location.search;
		const pathParts = pathname.split('/').filter(Boolean);
		const langFromUrl = supportedLanguages.includes(pathParts[0]) ? pathParts[0] : null;

		// 1. Si la URL ya tiene prefijo, actualizamos la cookie con ese idioma
		if (langFromUrl) {
			document.cookie = `country=${langFromUrl}; path=/; max-age=0`;
			return;
		}

		// 2. Si NO tiene prefijo, usamos la cookie para redirigir
		const cookieLang =
			document.cookie
				.split('; ')
				.find((row) => row.startsWith('country='))
				?.split('=')[1] || 'ar';
		console.log(cookieLang);
		// Si la cookie no es 'ar', redirigir agregando el prefijo
		if (cookieLang !== 'ar') {
			const newPath = `/${cookieLang}${pathname}${search}`;
			window.location.replace(newPath);
		}
	}, []);

	return null;
}
