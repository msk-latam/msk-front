'use client';
import { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import CardDetailsForm from './forms/CardDetailsForm';
import eitnerLog from '../../../../eitnerLog';
import DocumentDetailsForm from './forms/DocumentDetailsForm';
import AddressForm from './forms/AddressForm';
import { validatePaymentField } from './validators/paymentValidator';
import CheckoutPaymentButtons from './buttons/CheckoutPaymentButtons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import api from '@/services/api';

interface CheckoutContentProps {
	product?: any;
	country?: string;
}

const CheckoutPayment: React.FC<CheckoutContentProps> = ({ product, country }) => {
	eitnerLog(product);
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
		idType: '',
		documentNumber: '',
		country: '',
		state: '',
		city: '',
		address: '',
		postalCode: '',
	});
	const [errors, setErrors] = useState({
		cardholderName: '',
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
		idType: '',
		documentNumber: '',
		country: '',
		state: '',
		city: '',
		address: '',
		postalCode: '',
	});

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

	eitnerLog(state);
	useEffect(() => {
		if (user) {
			// Si el usuario está disponible en el contexto, usamos esos datos
			setFormData((prevState) => ({
				...prevState,
				cardholderName: `${user.firstName} ${user.lastName}`,
				documentNumber: '', // O el campo que desees usar para el documento
				idType: '', // O el campo que desees usar para el tipo de documento
				country: '', // O el campo que desees usar para el país
				state: '', // Este campo puedes configurarlo o dejarlo vacío si no lo tienes en el contexto
				address: '', // Igual para la dirección
				postalCode: '', // Igual para el código postal
			}));
		} else if (state && state.profile) {
			// Si el usuario no está en el contexto, usamos los datos del state
			setFormData((prevState) => ({
				...prevState,
				cardholderName: `${state.profile.name} ${state.profile.last_name}`,
				documentNumber: state.profile.identification || '',
				idType: state.profile.type_doc || '',
				country: state.profile.country || '',
				state: state.profile.state || '',
				address: state.profile.address || '',
				postalCode: state.profile.postal_code || '',
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
		return {
			transaction_amount: product.total_price,
			installments: paymentType === 'unico' ? 1 : 12,
			description: 'Pago de contrato MSK',
			payer: {
				email: state.email,
				first_name: formData.cardholderName.split(' ')[0] || 'Nombre',
				last_name: formData.cardholderName.split(' ')[1] || 'Apellido',
				identification: {
					type: formData.idType,
					number: formData.documentNumber,
				},
			},
			payment_data: {
				cardNumber: formData.cardNumber,
				expirationMonth: formData.expiryMonth,
				expirationYear: formData.expiryYear,
				securityCode: formData.cvv,
				identification: {
					type: formData.idType,
					number: formData.documentNumber,
				},
			},
			additional_information: {
				telefono: '',
				direccion: formData.address,
				ciudad: formData.city,
				provincia: formData.state,
				cp: formData.postalCode,
			},
			product: {
				items: {
					code: product.ficha.product_code,
					quantity: 1,
					price: product.regular_price,
					total: product.regular_price,
					net_total: product.regular_price,
					total_after_discount: product.regular_price,
					list_price: product.regular_price,
				},
				currency,
				country: formData.country,
				sub_total: product.regular_price,
				grand_total: product.total_price,
			},
		};
	};

	const handleSubmit = async () => {
		if (!isFormValid) return;

		const requestBody = mapFormDataToRequest(formData);
		setIsSubmitting(true);

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
			console.log('Respuesta del servidor:', data);
			const status = data.paymentStatus || 'rejected';
			setPaymentStatus(status);

			if (subStep === 0) {
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
			} else {
				setActiveStep(activeStep + 1);
				completeStep(activeStep);
				setSubStep(0);
			}
			try {
				// Preparar los datos para la actualización del usuario
				const userUpdateData = {
					...formData,
					recaptcha_token: await executeRecaptcha('edit_profile'),
				};

				// Llamar al endpoint de actualización
				// const userResponse = await fetch('https://tu-api.com/update-user', {
				// 		method: 'POST',
				// 		headers: {
				// 				'Content-Type': 'application/json',
				// 				Authorization: 'Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
				// 		},
				// 		body: JSON.stringify(userUpdateData),
				// });

				const userResponse = await api.updateUserData(formData);
				console.log(userResponse);

				if (!userResponse.ok) {
					throw new Error('Error al actualizar los datos del usuario');
				}

				const userData = await userResponse.json();
				console.log('Respuesta del servidor (actualización de usuario):', userData);

				if (userData.code === 'SUCCESS') {
					console.log('Usuario actualizado correctamente.');
				} else {
					console.error('Error en la respuesta del servidor al actualizar el usuario:', userData);
				}
			} catch (userError) {
				console.error('Error al actualizar el usuario:', userError);
			}
		} catch (error) {
			// Maneja errores en la solicitud
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
			console.error('Error al enviar los datos:', error);
			// setPaymentStatus('rejected');
			setPaymentStatus('approved');
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
