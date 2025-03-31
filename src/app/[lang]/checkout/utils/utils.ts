import { ENDPOINT_CRM, ENDPOINT_GATEWAY } from '../rebill/rebillEndpoints';
export const tokenGATEWAY = process.env.NEXT_PUBLIC_GATEWAY_BACKEND_TOKEN;
export const tokenCRM = process.env.NEXT_PUBLIC_CRM_BACKEND_TOKEN;

export const currencies: any = {
	cl: 'CLP',
	ar: 'ARS',
	ec: 'USD',
	mx: 'MXN',
	bo: 'BOB',
	co: 'COP',
	cr: 'CRC',
	sv: 'USD',
	gt: 'USD',
	hn: 'HNL',
	ni: 'USD',
	pa: 'USD',
	py: 'PYG',
	pe: 'PEN',
	uy: 'UYU',
	ve: 'USD',
};
export const countryToName: Record<string, string> = {
	ar: 'Argentina',
	bo: 'Bolivia',
	cl: 'Chile',
	co: 'Colombia',
	cr: 'Costa Rica',
	ec: 'Ecuador',
	es: 'España',
	gt: 'Guatemala',
	hn: 'Honduras',
	mx: 'México',
	ni: 'Nicaragua',
	pa: 'Panamá',
	py: 'Paraguay',
	pe: 'Perú',
	sv: 'El Salvador',
	uy: 'Uruguay',
	ve: 'Venezuela',
};

export const rebillCountries = ['cl', 'uy', 'pe', 'mx', 'co'];

export const getCountryCompleteName = (code: string = 'ar'): string | null => {
	const lowerCaseCode = code.toLowerCase();
	return countryToName[lowerCaseCode] || null; // Devuelve null si el código no está en el objeto
};

export const createCRMUser = async (formDataUser: any, countryCompleteName: any, formData: any) => {
	try {
		const response = await fetch(`${ENDPOINT_CRM}/api/zoho/contacts/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenCRM}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...formDataUser,
				Profesi_n: formDataUser.profession,
				First_Name: formDataUser.firstName,
				first_name: formDataUser.firstName,
				Full_Name: formDataUser.firstName,
				name: formDataUser.firstName,
				last_name: formDataUser.lastName,
				Last_Name: formDataUser.lastName,
				speciality: formDataUser.specialty,
				Especialidad: formDataUser.specialty,
				country: countryCompleteName,
				state: formData.state,
				city: formData.city,
				address: formData.address,
				street: formData.address,
				postal_code: formData.postal_code,
				type_doc: formData.type_doc,
				Tipo_de_Documento: formData.type_doc,
				identification: formData.identification,
				converted_by: 'Checkout Web',
				Raz_n_social: formDataUser.firstName + ' ' + formDataUser.lastName,
				zipcode: formData.postal_code,
			}),
		});

		return response.json();
	} catch (error) {
		console.error('Error al crear usuario en CRM:', error);
		throw error;
	}
};

export const getCRMUser = async (email: any) => {
	try {
		const response = await fetch(`${ENDPOINT_CRM}/api/zoho/contacts/by_email/${email}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${tokenCRM}`,
				'Content-Type': 'application/json',
			},
		});
		return response.json();
	} catch (error) {}
};

export const createRebillUser = async (formDataUser: any, country: any) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/rebill/${country}/customers`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenGATEWAY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: formDataUser.email,
				first_name: formDataUser.firstName,
				last_name: formDataUser.lastName,
				address_country: country,
				address_floor: '',
				address_apartment: '',
				address_description: '',
				birthday: formDataUser.birthday,
			}),
		});

		return response.json();
	} catch (error) {
		console.error('Error al crear usuario en Rebill:', error);
		throw error;
	}
};

interface PaymentConfig {
	payment: string;
	paymentMethod: string;
	totalPayments: number;
	remainingPayments: number;
}

const paymentOptions: Record<string, PaymentConfig> = {
	rebill: {
		payment: 'Rebill',
		paymentMethod: 'Cobro recurrente',
		totalPayments: 12,
		remainingPayments: 11,
	},
	mercadopago: {
		payment: 'Mercado Pago',
		paymentMethod: 'Cobro recurrente',
		totalPayments: 6,
		remainingPayments: 5,
	},
	stripe: {
		payment: 'Stripe',
		paymentMethod: 'Cobro recurrente',
		totalPayments: 12,
		remainingPayments: 11,
	},
	// En el futuro puedes agregar Stripe u otros métodos aquí
};

export const createContractCRM = async (
	customer_id: any,
	product: any,
	transactionAmount: any,
	currency: any,
	countryCompleteName: any,
	paymentType: 'rebill' | 'mercadopago' | 'stripe',
) => {
	try {
		const paymentConfig = paymentOptions[paymentType] || paymentOptions.mercadopago;

		const contractData = {
			customer_id,
			products: [
				{
					code: product.ficha.product_code,
					quantity: 1,
					price: transactionAmount,
					total: transactionAmount,
					net_total: transactionAmount,
					total_after_discount: transactionAmount,
					list_price: transactionAmount,
				},
			],
			status: 'borrador',
			currency,
			country: countryCompleteName,
			sub_total: transactionAmount,
			grand_total: transactionAmount,
			payment: paymentConfig.payment,
			paymentMethod: paymentConfig.paymentMethod,
			Modo_de_pago: paymentConfig.paymentMethod,
			M_todo_de_pago: paymentConfig.payment,
			Fecha_de_primer_cobro: new Date().toISOString().split('T')[0],
			Seleccione_total_de_pagos_recurrentes: paymentConfig.totalPayments.toString(),
			Cantidad_de_pagos_recurrentes_restantes: paymentConfig.remainingPayments.toString(),
			Monto_de_cada_pago_restantes: Math.ceil(transactionAmount / paymentConfig.totalPayments),
			Canal_por_el_que_se_cerro_la_venta: 'Web',
			channel_sale: 'Web',
			Fuente_de_cierre_venta: 'Consulta directa',
		};

		const response = await fetch(`${ENDPOINT_CRM}/api/zoho/sales_order/create_contract`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenCRM}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(contractData),
		});

		return response.json();
	} catch (error) {
		console.error('Error al crear contrato en CRM:', error);
		throw error;
	}
};

export const updateContractCRM = async (
	contract_id: string,
	subscription_id: string = '',
	transactionAmountWithDescount: any,
	paymentType: 'rebill' | 'mercadopago' | 'stripe',
	discount: any,
) => {
	const paymentConfig = paymentOptions[paymentType] || paymentOptions.mercadopago;
	try {
		const contractData = {
			status: 'Confirmado',
			Estado_de_cobro: 'Activo',
			stripe_subscription_id: subscription_id,
			mp_subscription_id: subscription_id,
			Monto_de_cada_pago_restantes: parseFloat((transactionAmountWithDescount / paymentConfig.totalPayments).toFixed(2)),
			discount: discount,
		};
		const response = await fetch(`${ENDPOINT_CRM}/api/zoho/sales_order/update_contract/${contract_id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${tokenCRM}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(contractData),
		});
		return response.json();
	} catch (error) {
		console.error('Error al crear contrato en CRM:', error);
		throw error;
	}
};

export const createPaymentRebill = async (
	email: string | undefined,
	contractId: string,
	amount: number,
	currency: string,
	cardId: string,
	country: string | undefined,
) => {
	try {
		const response = await fetch(`${ENDPOINT_GATEWAY}/api/rebill/${country}/checkout/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenGATEWAY}`,
			},
			body: JSON.stringify({
				email,
				contract_id: contractId,
				amount: Math.ceil(amount / 12),
				// amount: Math.ceil(1000 / 12),
				currency,
				recurrence: 1,
				card_id: cardId,
			}),
		});

		return await response.json();
	} catch (error) {
		console.error('Error en la solicitud de checkout:', error);
		throw error;
	}
};
