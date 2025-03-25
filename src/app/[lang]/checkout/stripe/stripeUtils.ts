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

export const getStripeCustomerIdBySubId = async (subscription_id: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/subscription/${subscription_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${tokenGATEWAY}`,
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		if (!response.ok) throw new Error(result.message || 'Error en la suscripción');

		return result;
	} catch (error) {
		console.error('Error al procesar el pago:', error);
		throw error;
	}
};

export const attachCardToUser = async ({ customer_id, payment_method_id }: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/cards/attach_user`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenGATEWAY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ customer_id, payment_method_id }),
		});

		const result = await response.json();
		if (!response.ok) throw new Error(result.message || 'Error en la suscripción');

		return result;
	} catch (error) {
		console.error('Error al procesar el pago:', error);
		throw error;
	}
};

export const getPaymentIntentId = async ({ invoiceId }: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/invoices/${invoiceId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${tokenGATEWAY}`,
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		if (!response.ok) throw new Error(result.message || 'Error en la suscripción');

		return result;
	} catch (error) {
		console.error('Error al procesar el pago:', error);
		throw error;
	}
};

export const updatePaymentIntent = async ({ paymentIntentId, paymentMethodId }: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/payment_intents/${paymentIntentId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${tokenGATEWAY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ payment_method: paymentMethodId }),
		});

		const result = await response.json();
		if (!response.ok) throw new Error(result.message || 'Error en la suscripción');

		return result;
	} catch (error) {
		console.error('Error al procesar el pago:', error);
		throw error;
	}
};
