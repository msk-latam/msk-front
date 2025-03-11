import { ENDPOINT_GATEWAY } from '@/app/[lang]/checkout/rebill/rebillEndpoints';
const tokenMP = process.env.NEXT_PUBLIC_MERCADOPAGO_BACKEND_TOKEN;

export const createPaymentMercadoPago = async (requestBody: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/mercadopago/arg/our_test/realizarPago`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenMP}`,
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error('Error al procesar el pago');
		}

		return await response.json();
	} catch (error) {
		console.error('Error en fetchPayment:', error);
		throw error;
	}
};
