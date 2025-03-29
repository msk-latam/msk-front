'use client';

import { useEffect } from 'react';

const CURRENT_APP_VERSION = '1.0.7';

const ClearLocalStorage: React.FC = () => {
	useEffect(() => {
		const savedVersion = localStorage.getItem('appVersion');
		if (savedVersion !== CURRENT_APP_VERSION) {
			// console.log('Limpiando localStorage por cambio de versión');
			localStorage.clear();
			localStorage.setItem('appVersion', CURRENT_APP_VERSION);
			window.location.reload();
		} else {
			// console.log('No es necesario limpiar el localStorage');
		}
	}, []);

	return null; // Este componente no necesita renderizar nada
};

export default ClearLocalStorage;
