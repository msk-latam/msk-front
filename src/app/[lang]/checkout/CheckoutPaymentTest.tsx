import React, { useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { selectCountryKey } from './rebill/rebillKeys';
import { useRecoilValue } from 'recoil';
import { rebillIdState } from './checkoutAtom';

let checkoutForm: any;
let rebillPayment: any;

interface CheckoutRebillProps {
	mode?: 'payment' | 'subscription';
	country?: string;
}

const CheckoutRebill: React.FC<CheckoutRebillProps> = ({ mode = 'payment', country }) => {
	const rebillId = useRecoilValue(rebillIdState);
	console.log(rebillId);

	// console.log('revisando pais de checkout rebill', country);

	const variables = selectCountryKey(country);
	console.log(variables);
	useEffect(() => {
		if (!window.Rebill) {
			console.error(
				'Rebill SDK no está disponible. Verifica que el script https://sdk.rebill.com/v3/rebill.js se haya cargado correctamente.',
			);
			return;
		}

		const container = document.getElementById('rebill-container');
		if (container) {
			container.innerHTML = '';
		}

		const rebill = new window.Rebill(variables.API_KEY);

		try {
			if (rebillId !== '') {
				checkoutForm = rebill.card.create(rebillId);

				checkoutForm.display({
					userLogin: false,
					// billing: false,
					// customerInformation: false,
					// cardholderDetails: false,
					// discountCode: false,
					// checkoutSummary: false,
					// submitButton: false,
					// resetButton: false,
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});
			}

			// Monta el formulario en el contenedor
			checkoutForm.mount('rebill-container');
			const tokenGATEWAY = process.env.NEXT_PUBLIC_GATEWAY_BACKEND_TOKEN;

			checkoutForm.on('success', async (e: any) => {
				console.log('Tarjeta tokenizadaa', e);

				try {
					const response = await fetch(`${ENDPOINT_GATEWAY}/api/rebill/test/checkout/new`, {
						// const response = await fetch(`${ENDPOINT_GATEWAY}/api/rebill/${country}/checkout/new`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${tokenGATEWAY}`,
						},
						body: JSON.stringify({
							email: 'ari7@gmail.com',
							contract_id: '5344455000262757432',
							amount: 2222,
							currency: 'CLP',
							recurrence: 12,
							card_id: '43264273-7b61-4ce1-a28a-4b03dbdb1db4',
						}),
					});

					const data = await response.json();
					console.log('Respuesta del checkout:', data);
				} catch (error) {
					console.error('Error en la solicitud de checkout:', error);
				}
			});

			checkoutForm.on('error', (e: any) => {
				console.error('Error en tarjeta:', e);
				rebillPayment = 'Contrato en proceso de cobro';
			});
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	}, [mode]);

	return (
		<div className=''>
			<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex h-[800px] '></div>
		</div>
	);
};

import { ENDPOINT_GATEWAY } from './rebill/rebillEndpoints';

const CheckoutStripe = () => {
	const [formData, setFormData] = useState({
		quote_amount: 170,
		total_contract_amount: 2040,
		currency: 'PEN',
		quotes: 12,
		contract_id: '5344455000199991681',
		contract_so: '5344455000199991682',
		customer: {
			name: 'Albert Reis',
			email: 'areis@msklatam.com',
			first_name: 'Albert',
			last_name: 'Reis',
			reference: '5344455000199886983',
			country: 'Brasil',
		},
		product: {
			name: 'ACCSAP',
			product_code: '9005817',
			amount: 2040,
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		const keys = name.split('.');
		if (keys.length > 1) {
			setFormData((prev) => ({
				...prev,
				[keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = '$2y$12$O4BEY9Ghrs2GCb5MtrNBWeeaG4H9MlWJsViHO7vKYhMb2ChNcPYRK';
		try {
			const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/subscription/ecommerce`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			if (response.ok) {
				console.log('Pago procesado con éxito');
			} else {
				console.log(`Error: ${result.message}`);
			}
		} catch (error) {
			console.log('Error al procesar el pago');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>Formulario de Pago</h2>

			{Object.entries(formData).map(([key, value]) =>
				typeof value === 'object' ? (
					<div key={key}>
						<h3 className='font-semibold mt-4'>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
						{Object.entries(value).map(([subKey, subValue]) => (
							<label key={subKey} className='block mb-2'>
								{subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
								<input
									type={typeof subValue === 'number' ? 'number' : 'text'}
									name={`${key}.${subKey}`}
									value={subValue}
									onChange={handleChange}
									className='input'
								/>
							</label>
						))}
					</div>
				) : (
					<label key={key} className='block mb-2'>
						{key.charAt(0).toUpperCase() + key.slice(1)}:
						<input
							type={typeof value === 'number' ? 'number' : 'text'}
							name={key}
							value={value}
							onChange={handleChange}
							className='input'
						/>
					</label>
				),
			)}

			<button type='submit' className='w-full mt-4 bg-blue-600 text-white p-2 rounded-lg'>
				Enviar Pago
			</button>
		</form>
	);
};

const CheckoutPaymentTest = ({ product, country }: any) => {
	return (
		<>
			<CheckoutRebill country={country} />
			{/* <CheckoutStripe /> */}
		</>
	);
};

export default CheckoutPaymentTest;
