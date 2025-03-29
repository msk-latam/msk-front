'use client';
import { useEffect, useState } from 'react';

export const toggleBotVisibility = (visible: boolean) => {
	const botElement = document.querySelector('iframe[title="Botmaker"]') as HTMLIFrameElement;
	if (botElement) {
		botElement.style.display = visible ? 'block' : 'none';
	}
};

const adjustBotmakerZIndex = (isMobile: boolean) => {
	const botElement = document.querySelector('iframe[title="Botmaker"]') as HTMLIFrameElement;
	if (botElement && botElement.parentElement) {
		botElement.parentElement.style.zIndex = isMobile ? '1' : '2147483647'; // Ajustar el z-index para móvil
	}
};

const BotMaker = () => {
	const [mountedBot, setMountedBot] = useState(false);
	const [botVisible, setBotVisible] = useState(true);

	useEffect(() => {
		const isLandingPage = window.location.pathname.includes('/landings/');

		if (isLandingPage) {
			// Si es una página de landings, no ejecutar el BotMaker
			return;
		}
		if (!mountedBot) {
			// Verifica si ya existe el script antes de agregarlo
			if (!document.querySelector('script[src="https://go.botmaker.com/rest/webchat/p/XG5DC3KZSF/init.js"]')) {
				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = 'https://go.botmaker.com/rest/webchat/p/XG5DC3KZSF/init.js';

				// Manejo de errores en la carga del script
				script.onerror = () => {
					console.error('Error al cargar BotMaker. El chat no estará disponible.');
				};

				document.body.appendChild(script);
			}
			setMountedBot(true);
		}

		const handleScroll = () => {
			const scrollPosition = window.innerHeight + window.scrollY;
			const isMobile = window.innerWidth <= 768;
			const threshold = document.body.offsetHeight - (isMobile ? 2100 : 1100);
			adjustBotmakerZIndex(isMobile);

			if (scrollPosition >= threshold) {
				setBotVisible(false);
			} else {
				setBotVisible(true);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [mountedBot]);

	useEffect(() => {
		toggleBotVisibility(botVisible);
	}, [botVisible]);

	return null;
};

export default BotMaker;
