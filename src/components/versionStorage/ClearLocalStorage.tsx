'use client';

import { useEffect } from 'react';

const CURRENT_APP_VERSION = '1.0.7';

const ClearLocalStorage: React.FC = () => {
	useEffect(() => {
		const userAgent = navigator.userAgent || '';
		const isPrerender = userAgent.includes('Prerender');

		if (isPrerender || typeof window === 'undefined') {
			return;
		}

		const savedVersion = localStorage.getItem('appVersion');
		if (savedVersion !== CURRENT_APP_VERSION) {
			localStorage.clear();
			localStorage.setItem('appVersion', CURRENT_APP_VERSION);
			window.location.reload();
		} else {
			// console.log('No es necesario limpiar el localStorage');
		}
	}, []);

	return null;
};

export default ClearLocalStorage;
