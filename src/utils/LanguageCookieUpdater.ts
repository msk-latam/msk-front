// src/utils/LanguageCookieUpdater.tsx
'use client';

import { useEffect } from 'react';
import { supportedLanguages } from '@/config/languages';

export default function LanguageCookieUpdater() {
	useEffect(() => {
		const pathname = window.location.pathname;
		const pathParts = pathname.split('/').filter(Boolean);
		const langFromUrl = pathParts[0];

		if (supportedLanguages.includes(langFromUrl)) {
			document.cookie = `country=${langFromUrl}; path=/; max-age=31536000`; // 1 año
		}
	}, []);

	return null;
}
