'use client';

import { useEffect } from 'react';
import { supportedLanguages } from '@/config/languages';

export default function LanguageCookieUpdater() {
	useEffect(() => {
		const pathname = window.location.pathname;
		const search = window.location.search;
		const pathParts = pathname.split('/').filter(Boolean);
		const langFromUrl = supportedLanguages.includes(pathParts[0]) ? pathParts[0] : null;

		console.log('[LanguageCookieUpdater] pathname:', pathname);
		console.log('[LanguageCookieUpdater] lang from URL:', langFromUrl);

		// ✅ Si la URL tiene prefijo válido como /mx, /cl, etc.
		if (langFromUrl) {
			document.cookie = `country=${langFromUrl}; path=/; max-age=0`; // Guardar cookie por 1 año
			console.log(`[LanguageCookieUpdater] Cookie actualizada a: ${langFromUrl}`);
			return;
		}

		// ✅ Si NO tiene prefijo, asumimos Argentina → no tocamos la cookie ni redireccionamos
		console.log('[LanguageCookieUpdater] No hay prefijo, se asume AR. No se modifica la cookie.');
	}, []);

	return null;
}
