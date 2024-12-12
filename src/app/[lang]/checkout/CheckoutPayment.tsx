'use client';
import { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import CardDetailsForm from './forms/CardDetailsForm';
import eitnerLog from '../../../../eitnerLog';
import DocumentDetailsForm from './forms/DocumentDetailsForm';
import AddressForm from './forms/AddressForm';
import { validatePaymentField } from './validators/paymentValidator';

interface CheckoutContentProps {
	product: any;
	country: string;
}

const CheckoutPayment: React.FC<CheckoutContentProps> = ({ product, country }) => {
	eitnerLog(product);
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
		if (state && state.profile) {
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
	}, [state]);

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
				telefono: state.profile.phone || '',
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
			const response = await fetch(
				'http://localhost:8465/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
				// const response = await fetch('https://gateway.msklatam.net/api/mercadopago/arg/our_test/realizarPagoYActualizarZoho',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6',
					},
					body: JSON.stringify(requestBody),
				},
			);

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
			<div className='my-6 gap-4 flex justify-end'>
				<button
					type='button'
					className={`px-12 py-3 font-bold rounded-md transition focus:outline-none focus:ring-2 ${
						true
							? 'bg-gray-400 text-gray-600 border border-gray-400 cursor-not-allowed'
							: 'text-[#9200AD] border border-[#9200AD] bg-transparent'
					}`}
					onClick={handlePreviousStep}
					disabled={true}
				>
					Volver
				</button>

				<button
					type='button'
					className={`px-12 py-3 font-bold rounded-md focus:outline-none focus:ring-2 ${
						isFormValid ? 'bg-[#9200AD] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
					}`}
					onClick={handleSubmit}
					disabled={!isFormValid || isSubmitting} // Deshabilitar si está enviando
				>
					{isSubmitting ? (
						<svg
							className='animate-spin h-5 w-5 text-white mx-auto'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							></path>
						</svg>
					) : (
						'Siguiente'
					)}
				</button>
			</div>
		</>
	);
};

export default CheckoutPayment;
