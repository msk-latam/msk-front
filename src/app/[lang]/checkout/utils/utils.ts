import { ENDPOINT_CRM, ENDPOINT_GATEWAY } from '../rebill/rebillEndpoints';

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
	cl: 'Chile',
	cr: 'Costa Rica',
	co: 'Colombia',
	hn: 'Honduras',
};

export const getCountryCompleteName = (code: string): string | null => {
	const lowerCaseCode = code.toLowerCase();
	return countryToName[lowerCaseCode] || null; // Devuelve null si el código no está en el objeto
};

export const createCRMUser = async (formDataUser: any, countryCompleteName: any, formData: any, tokenCRM: any) => {
	try {
		const response = await fetch(`${ENDPOINT_CRM}/api/zoho/contacts/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokenCRM}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...formDataUser,
				name: formDataUser.firstName,
				last_name: formDataUser.lastName,
				Last_Name: formDataUser.lastName,
				speciality: formDataUser.specialty,
				country: countryCompleteName,
				state: formData.state,
				city: formData.city,
				address: formData.address,
				postal_code: formData.postal_code,
				type_doc: formData.type_doc,
				identification: formData.identification,
				converted_by: 'Checkout Web',
			}),
		});

		return response.json();
	} catch (error) {
		console.error('Error al crear usuario en CRM:', error);
		throw error;
	}
};

export const createRebillUser = async (formDataUser: any, country: any, tokenGATEWAY: any) => {
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
				address_country: 'Argentina', // Hardcodeado por testing
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

export const createContractCRM = async (
	customer_id: any,
	product: any,
	transactionAmount: any,
	currency: any,
	countryCompleteName: any,
	tokenCRM: any,
) => {
	try {
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
			payment: 'Rebill',
			paymentMethod: 'Cobro recurrente',
			Fecha_de_primer_cobro: new Date().toISOString().split('T')[0],
			Seleccione_total_de_pagos_recurrentes: '6', // Dinamizar
			Cantidad_de_pagos_recurrentes_restantes: '5', // Dinamizar
			Monto_de_cada_pago_restantes: (transactionAmount / 6).toFixed(2),
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
