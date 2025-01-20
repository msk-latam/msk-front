'use client';
import { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import CardDetailsForm from './forms/CardDetailsForm';
import DocumentDetailsForm from './forms/DocumentDetailsForm';
import AddressForm from './forms/AddressForm';
import { validatePaymentField } from './validators/paymentValidator';
import CheckoutPaymentButtons from './buttons/CheckoutPaymentButtons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
// import CheckoutRebill from './CheckoutRebill';

interface CheckoutContentProps {
	product?: any;
	country?: string;
}

// import { useEffect } from 'react';

interface CheckoutRebillProps {
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
	mode?: 'payment' | 'subscription'; // Define si es un pago único o una suscripción
}

let checkoutForm: any;
const CheckoutRebill: React.FC<CheckoutRebillProps> = ({ formData, mode = 'payment' }) => {
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

		const rebill = new window.Rebill('pk_test_8f248fff-0734-11ef-92e2-0e2c69b9aaf7');

		try {
			if (mode === 'payment') {
				// Crea un formulario para pagos únicos
				checkoutForm = rebill.checkout.create({
					name: formData.productName,
					description: formData.description || '',
					amount: formData.amount,
					currency: formData.currency,
				});
				console.log(formData.customerData?.identification?.type);
				checkoutForm.set({
					customerInformation: {
						email: formData.customerData.email || '',
						firstName: formData.customerData.firstName || '',
						lastName: formData.customerData.lastName || '',
						phoneNumber: formData.customerData.phoneNumber || { number: 0 },
						identification: {
							type: formData.customerData?.identification?.type,
							id: formData.customerData?.identification?.id,
						},
					},
					billing: {
						city: formData.billing?.city || '',
						country: formData.billing?.country || '',
						line1: formData.billing?.line1 || '',
						line2: formData.billing?.line2 || '',
						zipCode: formData.billing?.zipCode || '',
						state: formData.billing?.state || '',
					},
				});
				checkoutForm.display({
					userLogin: false,
					billing: false,
					customerInformation: false,
					// cardholderDetails: false,
					discountCode: false,
					// checkoutSummary: false,
					submitButton: false,
					// resetButton: false,
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});
				checkoutForm.custom({
					css: `
					
					 [id^="headlessui-listbox-option"]:nth-child(n+6) {
		  display: none !important;
		}
				`,
				});
			}

			checkoutForm.custom({
				css: `
				
				 [id^="headlessui-listbox-option"]:nth-child(n+6) {
      display: none !important;
    }
			`,
			});

			// Monta el formulario en el contenedor
			checkoutForm.mount('rebill-container');

			checkoutForm.on('approved', (e) => {
				console.log('Pago aprobado:', e);
			});

			checkoutForm.on('error', (e) => {
				console.error('Error en el formulario:', e);
			});

			checkoutForm.on('rejected', (e) => {
				console.warn('Pago rechazado:', e);
			});

			// console.log('Formulario inicializado:', checkoutForm);
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	}, [formData, mode]);

	return (
		<div className=''>
			<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex h-[500px]'>
				{/* El iframe se montará aquí */}
			</div>
		</div>
	);
};

// export default CheckoutRebill;

const CheckoutPayment: React.FC<CheckoutContentProps> = ({ product, country }) => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const { state } = useContext(AuthContext);
	const {
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
		user,
	} = useCheckout();
	const [formData, setFormData] = useState({
		// cardholderName: '',
		// cardNumber: '',
		// expiryMonth: '',
		// expiryYear: '',
		// cvv: '',
		country: country || '',
		state: '',
		city: '',
		address: '',
		postal_code: '',
		profession: user?.profession || [],
		name: user?.firstName || state.profile.name,
		last_name: user?.lastName || state.profile.last_name,
		email: user?.email || state.profile.email,
		phone: user?.phone || state.profile.phone,
		speciality: user?.specialty || state.profile.speciality,
		privacyPolicy: user?.privacyPolicy || true,
		converted_by: 'Checkout Web',
		other_profession: [],
		other_speciality: [],
		type_doc: '',
		identification: '',
		fiscal_regime: 'a',
	});
	// console.log(formData);
	const [errors, setErrors] = useState({
		// cardholderName: '',
		// cardNumber: '',
		// expiryMonth: '',
		// expiryYear: '',
		// cvv: '',
		// type_doc: '',
		// documentNumber: '',
		country: '',
		state: '',
		city: '',
		address: '',
		postal_code: '',
		profession: '',
		name: '',
		last_name: '',
		email: '',
		phone: '',
		speciality: '',
		privacyPolicy: '',
		converted_by: '',
		other_profession: '',
		other_speciality: '',
		type_doc: '',
		identification: '',
		fiscal_regime: '',
	});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isFormValid, setIsFormValid] = useState(false);
	const [rebillValid, setRebillValid] = useState(false);

	useEffect(() => {
		const formIsValid =
			Object.values(errors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');
		setIsFormValid(formIsValid);
	}, [formData, errors]);

	useEffect(() => {
		if (isFormValid) {
			setRebillValid(true);
		}
	}, [isFormValid]);

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id } = e.target;

		setTouched((prevTouched) => ({
			...prevTouched,
			[id]: true,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[id]: validatePaymentField(id, formData[id as keyof typeof formData]),
		}));
	};

	const countryMap = {
		ar: 'Argentina',
		cl: 'Chile',
		br: 'Brasil',
		mx: 'Mexico',
		// Agrega más países según sea necesario
	};
	const normalizeCountryCode = (code) => code?.toLowerCase() || '';
	const getCountryName = (code) => {
		const normalizedCode = normalizeCountryCode(code);
		return countryMap[normalizedCode] || '';
	};

	const countryName = getCountryName(country);
	useEffect(() => {
		if (user) {
			// Si el usuario está disponible en el contexto, usamos esos datos
			setFormData((prevState) => ({
				...prevState,
				cardholderName: `${user.firstName} ${user.lastName}`,
				identification: '',
				type_doc: '',
				country: countryName || '',
				state: '',
				address: '',
				postal_code: '',
				profession: user.profession,
				speciality: user.specialty,
			}));
		} else if (state && state.profile) {
			setFormData((prevState) => ({
				...prevState,
				cardholderName: `${state.profile.name} ${state.profile.last_name}`,
				identification: state.profile.identification || '',
				type_doc: state.profile.type_doc || '',
				country: state.profile.country || '',
				state: state.profile.state || '',
				address: state.profile.address || '',
				postal_code: state.profile.postal_code || '',
			}));
		}
	}, [user, state]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePreviousStep = () => {
		if (subStep > 0) {
			setSubStep(subStep - 1);
			setPaymentType(null);
		} else if (activeStep > 1) {
			setActiveStep(activeStep - 1);
		}
	};

	const handleNextStep = () => {
		if (subStep === 0) {
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
		} else {
			setActiveStep(activeStep + 1);
			completeStep(activeStep);
			setSubStep(0);
		}
	};

	const currencies: any = {
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
	const currency = currencies[country] || 'USD';

	const totalPrice = product.total_price;
	const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);
	const regularPrice = product.regular_price;
	const regularPriceFixed = parseInt(regularPrice.replace(/[\.,]/g, ''), 10);

	const mapFormDataToRequest = (formData: any) => {
		return {
			// transaction_amount: 1100,
			transaction_amount: transactionAmount,
			installments: paymentType === 'unico' ? 1 : 6,
			description: 'Pago de contrato MSK',
			payer: {
				email: formData.email || state.email,
				// first_name: formData.cardholderName.trim().split(' ')[0] || 'Nombre',
				// last_name: formData.cardholderName.trim().split(' ').slice(1).join(' ') || 'Apellido',
				first_name: formData.firstName || user.firstName, // Asegúrate de que no dependa de cardholderName
				last_name: formData.lastName || user.lastName,

				identification: {
					type: formData.type_doc,
					number: formData.identification,
				},
			},
			payment_data: {
				cardNumber: formData.cardNumber,
				expirationMonth: formData.expiryMonth,
				expirationYear: formData.expiryYear,
				securityCode: formData.cvv,
				identification: {
					type: formData.type_doc,
					number: formData.identification,
				},
			},
			additional_information: {
				telefono: formData.phone,
				direccion: formData.address,
				ciudad: formData.city,
				provincia: formData.state,
				cp: formData.postal_code,
				profesion: formData.profession,
				especialidad: formData.speciality,
			},
			product: {
				items: [
					{
						code: product.ficha.product_code,
						quantity: 1,
						price: regularPriceFixed,
						total: regularPriceFixed,
						net_total: regularPriceFixed,
						total_after_discount: regularPriceFixed,
						list_price: regularPriceFixed,
						// price: 1300,
						// total: 1400,
						// net_total: 1500,
						// total_after_discount: 1600,
						// list_price: 1700,
					},
				],
				currency,
				country: formData.country,
				sub_total: regularPriceFixed,
				grand_total: transactionAmount,
				// sub_total: 1800,
				// grand_total: 1900,
			},
		};
	};

	const countryToCode = {
		ar: 'ARG', // Argentina
		cl: 'CHL', // Chile
		cr: 'CRI', // Costa Rica
		co: 'COL', // Colombia
		hn: 'HND', // Honduras
	};
	const getCountryCode = (country: string): string | null => {
		const lowerCaseCountry = country.toLowerCase();
		return countryToCode[lowerCaseCountry] || null; // Devuelve null si el país no está mapeado
	};
	const countryCode = getCountryCode(country);

	const gateways = {
		ar: {
			name: 'MercadoPago',
			url: 'http://localhost:8465/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
			// url: 'https://gateway.msklatam.net/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
			authToken: '$2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
		},
		cl: {
			name: 'Rebill',
			url: 'http://localhost:8465/api/rebill/CL/checkout/full',
			// url: 'https://gateway.msklatam.net/api/rebill/CL/checkout/full',
			authToken: '$2y$12$O4BEY9Ghrs2GCb5MtrNBWeeaG4H9MlWJsViHO7vKYhMb2ChNcPYRK',
		},
		cr: {
			name: 'Stripe',
			url: `http://localhost:8465/api/gateway/stripe/payment/${countryCode}/process-payment`,
			// url: `https://gateway.msklatam.net/api/gateway/stripe/payment/${countryCode}/process-payment`,
			authToken: 'your-stripe-auth-token',
		},
		co: {
			name: 'Stripe',
			url: `http://localhost:8465/api/gateway/stripe/payment/${countryCode}/process-payment`,
			// url: `https://gateway.msklatam.net/api/gateway/stripe/payment/${countryCode}/process-payment`,
			authToken: 'your-stripe-auth-token',
		},
		hn: {
			name: 'Stripe',
			url: `http://localhost:8465/api/gateway/stripe/payment/${countryCode}/process-payment`,
			// url: `https://gateway.msklatam.net/api/gateway/stripe/payment/${countryCode}/process-payment`,
			authToken: 'your-stripe-auth-token',
		},
		ec: {
			name: 'MercadoPago',
			url: 'http://localhost:8465/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
			// url: `https://payment.msklatam.com/api/gateway/stripe/payment/${countryCode}/process-payment`,
			// authToken: 'your-stripe-auth-token',
			authToken: '$2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
		},
		pe: {
			name: 'MercadoPago',
			url: 'http://localhost:8465/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
			// url: `https://payment.msklatam.com/api/gateway/stripe/payment/${countryCode}/process-payment`,
			// authToken: 'your-stripe-auth-token',
			authToken: '$2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
		},
	};

	const selectedGateway = gateways[country.toLowerCase()];
	// console.log(selectedGateway);

	if (!selectedGateway) {
		console.error(`No gateway configured for country: ${country}`);
	}

	// tarjeta prueba 4509953566233704 || 5031755734530604
	const productCRM: any = {
		total_price: product.total_price,
		country: product.country,
		title: product.ficha.title,
		product_code: product.ficha.product_code,
	};

	console.log(isFormValid);
	console.log(rebillValid, 'rebill');
	const handleSubmit = async () => {
		if (!isFormValid) return;

		const requestBody = mapFormDataToRequest(formData);

		const response = await checkoutForm.submit();

		const dataCRM: any = {
			product: productCRM,
			userData: formData,
			rebillResponse: response,
		};
		console.log(dataCRM);
		setIsSubmitting(false);

		if (response.status === 'approved' && response.data.payment.status === 'SUCCEEDED') {
			setPaymentStatus(response.status);
			if (subStep === 0) {
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
			} else {
				setActiveStep(activeStep + 1);
				completeStep(activeStep);
				setSubStep(0);
			}
		} else {
			// console.error('Pago no procesado correctamente');
			setPaymentStatus('rejected');
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
			// console.error('Error al enviar los datos:', error);
			setPaymentStatus('rejected');
			setIsSubmitting(false);
		}

		// try {
		// 	const response = await fetch(selectedGateway.url, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${selectedGateway.authToken}`,
		// 		},
		// 		body: JSON.stringify(requestBody),
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error('Error al procesar el pago');
		// 	}

		// 	const data = await response.json();
		// 	if (data.status === 200 && data.message === 'Se cobro el pago y creo en zoho') {
		// 		const status = data.paymentStatus || 'approved';
		// 		setPaymentStatus(status);

		// 		if (subStep === 0) {
		// 			completeStep(activeStep);
		// 			setActiveStep(activeStep + 1);
		// 		} else {
		// 			setActiveStep(activeStep + 1);
		// 			completeStep(activeStep);
		// 			setSubStep(0);
		// 		}
		// 	} else {
		// 		console.error('Pago no procesado correctamente');
		// 		setPaymentStatus('rejected');
		// 	}
		// } catch (error) {
		// 	completeStep(activeStep);
		// 	setActiveStep(activeStep + 1);
		// 	console.error('Error al enviar los datos:', error);
		// 	setPaymentStatus('rejected');
		// } finally {
		// 	setIsSubmitting(false);
		// }
	};

	const handleSubmit1 = async () => {
		if (!isFormValid) return;

		const requestBody = mapFormDataToRequest(formData);
		setIsSubmitting(true);

		// try {
		// 	const userUpdateData = {
		// 		...formData,
		// 		recaptcha_token: await executeRecaptcha('edit_profile'),
		// 	};

		// 	console.log(userUpdateData);
		// 	const userResponse = await api.updateUserData(userUpdateData);
		// 	console.log(userResponse);

		// 	// if (!userResponse.ok) {
		// 	// 	throw new Error('Error al actualizar los datos del usuario');
		// 	// }

		// 	console.log('Respuesta del servidor (actualización de usuario):', userResponse);

		// 	if (userResponse.data[0].code === 'SUCCESS') {
		// 		console.log('Usuario actualizado correctamente.');
		// 	} else {
		// 		console.error('Error en la respuesta del servidor al actualizar el usuario:', userResponse);
		// 	}
		// } catch (userError) {
		// 	console.error('Error al actualizar el usuario:', userError);
		// }

		try {
			const response = await fetch(selectedGateway.url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${selectedGateway.authToken}`,
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error('Error al procesar el pago');
			}

			const data = await response.json();
			if (data.status === 200 && data.message === 'Se cobro el pago y creo en zoho') {
				const status = data.paymentStatus || 'approved';
				setPaymentStatus(status);

				if (subStep === 0) {
					completeStep(activeStep);
					setActiveStep(activeStep + 1);
				} else {
					setActiveStep(activeStep + 1);
					completeStep(activeStep);
					setSubStep(0);
				}
			} else {
				console.error('Pago no procesado correctamente');
				setPaymentStatus('rejected');
			}
		} catch (error) {
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
			console.error('Error al enviar los datos:', error);
			setPaymentStatus('rejected');
		} finally {
			setIsSubmitting(false);
		}
	};
	const excludedCountriesForForm = ['cl']; // Lista de países donde no se renderiza el formulario
	const allowedCountriesForRebill = ['cl'];
	const rebillForm = {
		amount: transactionAmount,
		currency: currency || 'USD',
		productName: product.ficha.title,
		customerData: {
			// document: '12345678',
			email: user?.email || state.profile.email,
			// city: 'Santiago',
			firstName: user?.firstName || state.profile.name,
			lastName: user?.lastName || state.profile.last_name,
			phoneNumber: { number: user?.phone || state.profile.phone },
			identification: {
				type: formData.type_doc === '05 - CÉDULA' ? 'CI' : formData.type_doc,

				id: formData.identification,
			},
		},
		billing: {
			city: formData.city || '',
			country: countryName || '',
			line1: formData.address,
			line2: '',
			zipCode: formData.postal_code || '',
			state: formData.state || '',
		},
	};

	return (
		<>
			<h2 className='flex items-center text-[#392C35] text-2xl font-semibold my-8'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					2
				</span>
				Pago
			</h2>

			<div className='p-6 bg-white border border-gray-300 rounded-lg '>
				<h2 className='text-2xl font-semibold text-[#392C35]'>Datos de tarjeta</h2>

				<form className='mt-6'>
					{/* <CardDetailsForm
						formData={formData}
						handleBlur={handleBlur}
						handleChange={handleChange}
						errors={errors}
						touched={touched}
					/> */}

					<h3 className='mt-8 text-xl font-semibold text-[#392C35]'>Datos de facturación</h3>
					<DocumentDetailsForm
						formData={formData}
						handleBlur={handleBlur}
						handleChange={handleChange}
						errors={errors}
						touched={touched}
						country={country}
					/>

					<h3 className='mt-8 text-xl font-semibold text-[#392C35]'>Dirección de facturación</h3>
					<AddressForm
						formData={formData}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors}
						touched={touched}
					/>
				</form>

				{rebillValid && (
					<div className='w-full'>
						<CheckoutRebill formData={rebillForm} />
					</div>
				)}
			</div>
			<CheckoutPaymentButtons
				isFormValid={isFormValid}
				isSubmitting={isSubmitting}
				handlePreviousStep={handlePreviousStep}
				handleSubmit={handleSubmit}
				isDisabled
			/>
		</>
	);
};

export default CheckoutPayment;
