const getCRMBaseURL = () => {
	if (typeof window !== 'undefined') {
		const host = window.location.hostname;

		if (host.includes('localhost')) {
			return 'http://localhost:8577';
		} else if (host.includes('msklatam.tech') || host.includes('msklatam.com')) {
			return process.env.NEXT_PUBLIC_CRM_ENDPOINT;
		}
	}

	return ''; // Maneja el error según corresponda
};

const getGatewayBaseURL = () => {
	if (typeof window !== 'undefined') {
		const host = window.location.hostname;

		if (host.includes('localhost')) {
			return 'http://localhost:8465';
		} else if (host.includes('msklatam.tech') || host.includes('msklatam.com')) {
			return process.env.NEXT_PUBLIC_GATEWAY_ENDPOINT;
		}
	}

	return ''; // Maneja el error según corresponda
};

export const ENDPOINT_CRM = getCRMBaseURL();
export const ENDPOINT_GATEWAY = getGatewayBaseURL();
