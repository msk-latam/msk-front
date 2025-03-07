'use client';
import { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import CardDetailsForm from './forms/CardDetailsForm';
import { validatePaymentField } from './validators/paymentValidator';
import CheckoutPaymentButtons from './buttons/CheckoutPaymentButtons';
import { ENDPOINT_GATEWAY } from '../[lang]/checkout/rebill/rebillEndpoints';

interface CheckoutContentProps {
	product?: any;
	country?: string;
}

const CheckoutPayment: React.FC<CheckoutContentProps> = ({ product, country }) => {
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
		// country: '',
		// state: '',
		// city: '',
		// address: '',
		// postal_code: '',
		// profession: '',
		// name: '',
		// last_name: '',
		// email: '',
		// phone: '',
		// speciality: '',
		// privacyPolicy: '',
		// converted_by: '',
		// other_profession: '',
		// other_speciality: '',
		// type_doc: '',
		// identification: '',
		// fiscal_regime: '',
	});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isFormValid, setIsFormValid] = useState(false);
	const [rebillValid, setRebillValid] = useState(false);

	useEffect(() => {
		console.log('Validando formulario...');
		console.log('formData:', formData);
		console.log('errors:', errors);

		const allErrorsAreEmpty = Object.values(errors).every((error) => error === '');
		console.log('¿Todos los errores están vacíos?', allErrorsAreEmpty);

		const allFieldsAreFilled = Object.values(formData).every((value) => value !== '' && value !== false);
		console.log('¿Todos los campos están llenos?', allFieldsAreFilled);

		const formIsValid = allErrorsAreEmpty && allFieldsAreFilled;
		console.log('¿El formulario es válido?', formIsValid);

		setIsFormValid(formIsValid);
	}, [formData, errors]);

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

	const countryName = 'Argentina';
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

	const currency = 'ARS';

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
				first_name: formData.firstName || user?.firstName || state.profile.name, // Asegúrate de que no dependa de cardholderName
				last_name: formData.lastName || user?.lastName || state.profile.last_name,

				identification: {
					type: 'DNI',
					// type: formData.type_doc,
					number: '39161045',
					// number: formData.identification,
				},
			},
			payment_data: {
				cardNumber: formData.cardNumber,
				expirationMonth: formData.expiryMonth,
				expirationYear: formData.expiryYear,
				securityCode: formData.cvv,
				identification: {
					type: 'DNI',
					// type: formData.type_doc,
					number: '39161045',
					// number: formData.identification,
				},
			},
			additional_information: {
				telefono: formData.phone,
				direccion: '67 321',
				// direccion: formData.address,
				ciudad: 'La Plata',
				// ciudad: formData.city,
				provincia: 'Buenos Aires',
				// provincia: formData.state,
				// cp: formData.postal_code,
				cp: 1900,
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

	const gateways = {
		ar: {
			name: 'MercadoPago',
			url: `${ENDPOINT_GATEWAY}/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho`,
			// url: 'https://gateway.msklatam.net/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
			authToken: '$2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
		},
	};

	const selectedGateway = gateways['ar'];

	// tarjeta prueba 4509953566233704 || 5031755734530604

	const handleSubmitMercadoPago = async () => {
		// if (!isFormValid) return;

		const requestBody = mapFormDataToRequest(formData);
		setIsSubmitting(true);

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
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
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
					{country === 'ar' && (
						<CardDetailsForm
							formData={formData}
							handleBlur={handleBlur}
							handleChange={handleChange}
							errors={errors}
							touched={touched}
						/>
					)}
				</form>
			</div>
			<CheckoutPaymentButtons
				isFormValid={true}
				// isFormValid={isFormValid}
				isSubmitting={isSubmitting}
				handlePreviousStep={handlePreviousStep}
				handleSubmit={handleSubmitMercadoPago}
				isDisabled
			/>
		</>
	);
};

export default CheckoutPayment;
