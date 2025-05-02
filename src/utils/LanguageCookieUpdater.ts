'use client';

import { useEffect } from 'react';
import { supportedLanguages } from '@/config/languages';

export default function LanguageCookieUpdater() {
	useEffect(() => {
		const pathname = window.location.pathname;
		const search = window.location.search;
		const pathParts = pathname.split('/').filter(Boolean);
		const langFromUrl = supportedLanguages.includes(pathParts[0]) ? pathParts[0] : null;
		const hasToken = search.includes('token=');

		const cookieLang = document.cookie
			.split('; ')
			.find((row) => row.startsWith('country='))
			?.split('=')[1];

		// ⚠️ Excepción: si está en cambio de contraseña, no redirigir ni tocar cookie
		if (pathname.includes('/change-pass') && hasToken) {
			console.log('[LanguageCookieUpdater] Cambio de contraseña → no redirige ni cambia cookie');
			return;
		}

		// ✅ Si tiene prefijo válido → actualiza cookie
		if (langFromUrl) {
			document.cookie = `country=${langFromUrl}; path=/; max-age=31536000`;
			console.log(`[LanguageCookieUpdater] Cookie actualizada a: ${langFromUrl}`);
			return;
		}

		// ✅ Si NO tiene prefijo y hay cookie → eliminarla (se asume AR)
		if (cookieLang && supportedLanguages.includes(cookieLang)) {
			document.cookie = 'country=; path=/; max-age=0';
			console.log('[LanguageCookieUpdater] Sin prefijo → cookie eliminada porque se asume AR');
			return;
		}

		// 🟢 Caso final: sin prefijo y sin cookie → no hacer nada
		console.log('[LanguageCookieUpdater] No hay prefijo ni cookie → OK como Argentina');
	}, []);

	return null;
}
