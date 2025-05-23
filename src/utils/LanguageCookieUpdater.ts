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

		const isRecoveryFlow =
			document.cookie
				.split('; ')
				.find((row) => row.startsWith('recovery_flow_active='))
				?.split('=')[1] === 'true';

		if (!isRecoveryFlow) {
			return;
		}

		// ⚠️ Excepción: si está en cambio de contraseña, no redirigir ni tocar cookie
		if (pathname.includes('/change-pass') && hasToken) {
			return;
		}

		if (langFromUrl) {
			document.cookie = `country=${langFromUrl}; path=/; max-age=60`;
			return;
		}

		if (cookieLang && supportedLanguages.includes(cookieLang)) {
			document.cookie = 'country=; path=/; max-age=0';
			return;
		}
	}, []);

	return null;
}
