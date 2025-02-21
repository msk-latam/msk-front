const getBaseURL = () => {
	if (typeof window !== 'undefined') {
		const host = window.location.hostname;

		if (host.includes('localhost')) {
			return 'http://localhost:8577';
		} else if (host.includes('msklatam.tech')) {
			return 'https://crm.msklatam.net';
		} else if (host.includes('msklatam.com')) {
			return 'https://crm.msklatam.net';
		}
	}

	return ''; // Caso por defecto, maneja el error según corresponda
};

export const ENDPOINT_CRM = getBaseURL();
