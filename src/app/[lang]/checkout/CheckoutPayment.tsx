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

interface CheckoutContentProps {
	product?: any;
	country?: string;
}

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
		cardholderName: '',
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
		country: '',
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
		cardholderName: '',
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
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

	// console.log(formData, 'de pago');

	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const formIsValid =
			Object.values(errors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');
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

	useEffect(() => {
		if (user) {
			// Si el usuario está disponible en el contexto, usamos esos datos
			setFormData((prevState) => ({
				...prevState,
				cardholderName: `${user.firstName} ${user.lastName}`,
				identification: '', // O el campo que desees usar para el documento
				type_doc: '', // O el campo que desees usar para el tipo de documento
				country: '', // O el campo que desees usar para el país
				state: '', // Este campo puedes configurarlo o dejarlo vacío si no lo tienes en el contexto
				address: '', // Igual para la dirección
				postal_code: '', // Igual para el código postal
				profession: user.profession,
				speciality: user.specialty,
			}));
		} else if (state && state.profile) {
			// Si el usuario no está en el contexto, usamos los datos del state
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

	const mapFormDataToRequest = (formData: any) => {
		const totalPrice = product.total_price;
		const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);
		const regularPrice = product.regular_price;
		const regularPriceFixed = parseInt(regularPrice.replace(/[\.,]/g, ''), 10);
		return {
			transaction_amount: 1200,
			// transaction_amount: transactionAmount,
			installments: paymentType === 'unico' ? 1 : 12,
			description: 'Pago de contrato MSK',
			payer: {
				email: formData.email || state.email,
				first_name: formData.cardholderName.trim().split(' ')[0] || 'Nombre',
				last_name: formData.cardholderName.trim().split(' ').slice(1).join(' ') || 'Apellido',
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
				items: {
					code: product.ficha.product_code,
					quantity: 1,
					// price: regularPriceFixed,
					// total: regularPriceFixed,
					// net_total: regularPriceFixed,
					// total_after_discount: regularPriceFixed,
					// list_price: regularPriceFixed,
					price: 1200,
					total: 1200,
					net_total: 1200,
					total_after_discount: 1200,
					list_price: 1200,
				},
				currency,
				country: formData.country,
				// sub_total: regularPriceFixed,
				// grand_total: transactionAmount,
				sub_total: 1200,
				grand_total: 1200,
			},
		};
	};

	// tarjeta prueba 4509953566233704 || 5031755734530604

	const handleSubmit = async () => {
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
			// const response = await fetch(
			// 	'http://localhost:8465/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
			const response = await fetch('https://gateway.msklatam.net/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error('Error al procesar el pago');
			}

			const data = await response.json();
			// console.log('Respuesta del servidor:', data);

			// Aquí verificamos si el pago fue procesado correctamente en Zoho
			if (data.status === 200 && data.message === 'Se cobro el pago y creo en zoho') {
				// console.log('Pago exitoso y creado en Zoho');

				// Cambiar el estado del pago a 'approved' cuando la respuesta sea positiva
				const status = data.paymentStatus || 'approved'; // Ajusta el valor de status según el API
				setPaymentStatus(status);

				// Continuar con la lógica del siguiente paso
				if (subStep === 0) {
					completeStep(activeStep);
					setActiveStep(activeStep + 1);
				} else {
					setActiveStep(activeStep + 1);
					completeStep(activeStep);
					setSubStep(0);
				}
			} else {
				// Si la respuesta no es la esperada, se considera 'rejected'
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
					{/* Datos de tarjeta */}
					<CardDetailsForm
						formData={formData}
						handleBlur={handleBlur}
						handleChange={handleChange}
						errors={errors}
						touched={touched}
					/>

					{/* Datos de facturación */}
					<h3 className='mt-8 text-xl font-semibold text-[#392C35]'>Datos de facturación</h3>
					<DocumentDetailsForm
						formData={formData}
						handleBlur={handleBlur}
						handleChange={handleChange}
						errors={errors}
						touched={touched}
					/>

					{/* Dirección de facturación */}
					<h3 className='mt-8 text-xl font-semibold text-[#392C35]'>Dirección de facturación</h3>
					<AddressForm
						formData={formData}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors}
						touched={touched}
					/>
				</form>
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
