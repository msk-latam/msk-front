import React, { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { selectCountryKey } from './rebill/rebillKeys';
import { useRecoilValue } from 'recoil';
import { rebillIdState } from './checkoutAtom';

let checkoutForm: any;
let rebillPayment: any;

interface CheckoutRebillProps {
	mode?: 'payment' | 'subscription';
	country?: string;
	formData: {
		amount: number;
		currency: string;
		productName: string;
		description?: string;
		frequency?: {
			type: string;
			quantity: number;
		};
		debitDay?: number;
		repetitions?: number | null;
		customerData?: {
			email?: string;
			firstName?: string;
			lastName?: string;
			phoneNumber?: {
				number: number;
			};
			identification?: {
				type: string;
				id: string;
			};
		};
		billing?: {
			city: string;
			country: string;
			line1: string;
			line2: string;
			zipCode: string;
			state: string;
		};
	};
}

const CheckoutRebill: React.FC<CheckoutRebillProps> = ({ mode = 'payment', country, formData }) => {
	const {
		user,
		activeStep,
		setActiveStep,
		subStep,
		setSubStep,
		completeStep,
		setPaymentType,
		paymentType,
		setIsSubmitting,
		setPaymentStatus,
		isSubmitting,
	} = useCheckout();
	const rebillId = useRecoilValue(rebillIdState);
	const variables = selectCountryKey(country);
	const [processingPayment, setProcessingPayment] = useState(false);

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
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});
			}

			checkoutForm.mount('rebill-container');

			checkoutForm.on('success', async (e: any) => {
				console.log('Tarjeta tokenizada', e);
				setProcessingPayment(true);

				const contract_id = user.contract_id;

				try {
					const data = await createPaymentRebill(
						formData.customerData?.email,
						contract_id,
						1000,
						//formData.amount
						formData.currency,
						e.card.id,
						country,
					);

					console.log('Respuesta del checkout:', data);

					if (
						data.invoice &&
						data.failedTransaction === null &&
						data.invoice.paidBags?.[0]?.payment?.status === 'SUCCEEDED'
					) {
						setPaymentStatus('approved');
						const paymentRebillId = data.invoice.paidBags[0].payment.id;

						const updateContract = await updateContractCRM(contract_id, paymentRebillId);

						console.log(updateContract);

						if (subStep === 0) {
							completeStep(activeStep);
							setActiveStep(activeStep + 1);
						} else {
							setActiveStep(activeStep + 1);
							completeStep(activeStep);
							setSubStep(0);
						}
					} else {
						setPaymentStatus('rejected');
						completeStep(activeStep);
						setActiveStep(activeStep + 1);
						setIsSubmitting(false);
					}
				} catch (error) {
					console.error('Error en la solicitud de checkout:', error);
				} finally {
					// setProcessingPayment(false);
				}
			});

			checkoutForm.on('error', (e: any) => {
				console.error('Error en tarjeta:', e);
				rebillPayment = 'Contrato en proceso de cobro';
				setPaymentStatus('rejected');
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
				setIsSubmitting(false);
			});
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	}, [mode]);

	return (
		<div>
			{processingPayment ? (
				<div className='flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded-lg'>
					<span className='animate-spin w-8 h-8 border-4 border-gray-300 border-t-[#392C35] rounded-full'></span>
					<p className='mt-3 text-[#392C35] font-semibold'>Procesando cobro...</p>
				</div>
			) : (
				<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex h-[800px]'></div>
			)}
		</div>
	);
};

import { ENDPOINT_GATEWAY } from './rebill/rebillEndpoints';
import { createPaymentRebill, currencies, updateContractCRM } from './utils/utils';
import { AuthContext } from '@/context/user/AuthContext';

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

	const handleChange = (e: any) => {
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

	const handleSubmit = async (e: any) => {
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
	const { user } = useCheckout();
	const { state } = useContext(AuthContext);
	const totalPrice = product.total_price;
	const transactionAmount = 100;
	// const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);

	const currency = currencies[country] || 'USD';
	const rebillForm = {
		amount: transactionAmount,
		currency: currency || 'USD',
		productName: product.ficha.title,
		customerData: {
			email: user?.email || state?.profile?.email || '',
			firstName: user?.firstName || state?.profile?.name || '',
			lastName: user?.lastName || state?.profile?.last_name || '',
			phoneNumber: { number: user?.phone || state?.profile?.phone || '' },
		},
	};
	return (
		<>
			<div className='mt-24'>
				<CheckoutRebill country={country} formData={rebillForm} />
			</div>
			{/* <CheckoutStripe /> */}
		</>
	);
};

export default CheckoutPaymentTest;
