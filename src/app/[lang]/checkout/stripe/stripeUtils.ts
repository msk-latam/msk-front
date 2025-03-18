import { ENDPOINT_GATEWAY } from '../rebill/rebillEndpoints';
import { tokenGATEWAY } from '../utils/utils';

export const createStripeSubscription = async (formData: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/subscription/ecommerce`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenGATEWAY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const result = await response.json();
		if (!response.ok) throw new Error(result.message || 'Error en la suscripción');

		return result;
	} catch (error) {
		console.error('Error al procesar el pago:', error);
		throw error;
	}
};
