const eitnerLog = (...args: any[]) => {
	// Verifica si el código se ejecuta en un navegador y si es localhost
	if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '3000') {
		console.log('[EitnerLog]', ...args);
	}
};

export default eitnerLog;
