'use client';

import { useEffect } from 'react';
import { supportedLanguages } from '@/config/languages';

export default function LanguageCookieUpdater() {
	useEffect(() => {
		const pathname = window.location.pathname;
		const search = window.location.search;
		const pathParts = pathname.split('/').filter(Boolean);
		const langFromUrl = supportedLanguages.includes(pathParts[0]) ? pathParts[0] : null;

		// 1️⃣ Si tiene prefijo en URL, actualizar cookie y salir
		if (langFromUrl) {
			document.cookie = `country=${langFromUrl}; path=/; max-age=31536000`;
			return;
		}

		// 2️⃣ Obtener valor actual de cookie
		const currentCookie =
			document.cookie
				.split('; ')
				.find((row) => row.startsWith('country='))
				?.split('=')[1] || 'ar';

		// 3️⃣ Si la cookie es 'ar', no hacer nada (Argentina no usa prefijo)
		if (currentCookie === 'ar') return;

		// 4️⃣ EXCEPCIONES: rutas sin prefijo que deben ser válidas para AR
		const allowedUnprefixedPaths = ['/change-pass', '/login', '/register'];
		if (allowedUnprefixedPaths.includes(pathname)) return;

		// 5️⃣ Redirigir a URL con prefijo si no está permitido sin él
		const newPath = `/${currentCookie}${pathname}${search}`;
		window.location.replace(newPath);
	}, []);

	return null;
}
