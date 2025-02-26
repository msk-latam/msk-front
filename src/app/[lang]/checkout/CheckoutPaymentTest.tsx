import React, { useEffect } from 'react';
import { useCheckout } from './CheckoutContext';
import { selectCountryKey } from './rebill/rebillKeys';
import { useRecoilValue } from 'recoil';
import { rebillIdState } from './checkoutAtom';

let checkoutForm: any;
let rebillPayment: any;

interface CheckoutRebillProps {
	// formData: {
	// 	amount: number;
	// 	currency: string;
	// 	productName: string;
	// 	description?: string;
	// 	frequency?: {
	// 		type: string;
	// 		quantity: number;
	// 	};
	// 	debitDay?: number;
	// 	repetitions?: number | null;
	// 	customerData?: {
	// 		email?: string;
	// 		firstName?: string;
	// 		lastName?: string;
	// 		phoneNumber?: {
	// 			number: number;
	// 		};
	// 		identification?: {
	// 			type: string;
	// 			id: string;
	// 		};
	// 	};
	// 	billing?: {
	// 		city: string;
	// 		country: string;
	// 		line1: string;
	// 		line2: string;
	// 		zipCode: string;
	// 		state: string;
	// 	};
	// };
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

			checkoutForm.on('approved', (e: any) => {
				console.log('Pago aprobado:', e);
				rebillPayment = 'Contrato Efectivo';
			});

			checkoutForm.on('error', (e: any) => {
				console.error('Error en el formulario:', e);
				rebillPayment = 'Contrato en proceso de cobro';
			});

			checkoutForm.on('rejected', (e: any) => {
				console.warn('Pago rechazado:', e);
				rebillPayment = 'Pago rechazado';
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

import { useFormik } from 'formik';
import * as Yup from 'yup';

const CheckoutStripe = () => {
	const formik = useFormik({
		initialValues: {
			transaction_amount: '',
			description: '',
			payer: {
				email: '',
				first_name: '',
				last_name: '',
			},
			payment_data: {
				cardNumber: '',
				expirationMonth: '',
				expirationYear: '',
				securityCode: '',
				identification: {
					type: '',
					number: '',
				},
			},
		},
		validationSchema: Yup.object({
			transaction_amount: Yup.number().min(1, 'Debe ser mayor a 0').required('Requerido'),
			description: Yup.string().max(255, 'Máximo 255 caracteres').required('Requerido'),
			payer: Yup.object({
				email: Yup.string().email('Email inválido').required('Requerido'),
				first_name: Yup.string().max(255, 'Máximo 255 caracteres').required('Requerido'),
				last_name: Yup.string().max(255, 'Máximo 255 caracteres').required('Requerido'),
			}),
			payment_data: Yup.object({
				cardNumber: Yup.string()
					.matches(/^\d{16}$/, 'Debe tener 16 dígitos')
					.required('Requerido'),
				expirationMonth: Yup.string()
					.matches(/^\d{2}$/, 'Debe ser MM')
					.required('Requerido'),
				expirationYear: Yup.string()
					.matches(/^\d{4}$/, 'Debe ser AAAA')
					.required('Requerido'),
				securityCode: Yup.string()
					.matches(/^\d{3,4}$/, 'Debe ser de 3 o 4 dígitos')
					.required('Requerido'),
				identification: Yup.object({
					type: Yup.string().required('Requerido'),
					number: Yup.string().required('Requerido'),
				}),
			}),
		}),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/api/process-payment', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values),
				});

				const result = await response.json();
				if (response.ok) {
					alert('Pago procesado con éxito');
				} else {
					alert(`Error: ${result.message}`);
				}
			} catch (error) {
				alert('Error al procesar el pago');
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>Formulario de Pago</h2>

			<label className='block mb-2'>
				Monto:
				<input type='number' name='transaction_amount' {...formik.getFieldProps('transaction_amount')} className='input' />
				{formik.touched.transaction_amount && formik.errors.transaction_amount && (
					<p className='text-red-500'>{formik.errors.transaction_amount}</p>
				)}
			</label>

			<label className='block mb-2'>
				Descripción:
				<input type='text' name='description' {...formik.getFieldProps('description')} className='input' />
				{formik.touched.description && formik.errors.description && (
					<p className='text-red-500'>{formik.errors.description}</p>
				)}
			</label>

			<h3 className='font-semibold mt-4'>Datos del Pagador</h3>
			<label className='block mb-2'>
				Email:
				<input type='email' name='payer.email' {...formik.getFieldProps('payer.email')} className='input' />
				{formik.touched.payer?.email && formik.errors.payer?.email && (
					<p className='text-red-500'>{formik.errors.payer.email}</p>
				)}
			</label>

			<label className='block mb-2'>
				Nombre:
				<input type='text' name='payer.first_name' {...formik.getFieldProps('payer.first_name')} className='input' />
				{formik.touched.payer?.first_name && formik.errors.payer?.first_name && (
					<p className='text-red-500'>{formik.errors.payer.first_name}</p>
				)}
			</label>

			<label className='block mb-2'>
				Apellido:
				<input type='text' name='payer.last_name' {...formik.getFieldProps('payer.last_name')} className='input' />
				{formik.touched.payer?.last_name && formik.errors.payer?.last_name && (
					<p className='text-red-500'>{formik.errors.payer.last_name}</p>
				)}
			</label>

			<h3 className='font-semibold mt-4'>Datos de la Tarjeta</h3>
			<label className='block mb-2'>
				Número de Tarjeta:
				<input
					type='text'
					name='payment_data.cardNumber'
					{...formik.getFieldProps('payment_data.cardNumber')}
					className='input'
				/>
				{formik.touched.payment_data?.cardNumber && formik.errors.payment_data?.cardNumber && (
					<p className='text-red-500'>{formik.errors.payment_data.cardNumber}</p>
				)}
			</label>

			<label className='block mb-2'>
				Expiración (MM/AAAA):
				<div className='flex gap-2'>
					<input
						type='text'
						name='payment_data.expirationMonth'
						{...formik.getFieldProps('payment_data.expirationMonth')}
						className='input w-1/2'
						placeholder='MM'
					/>
					<input
						type='text'
						name='payment_data.expirationYear'
						{...formik.getFieldProps('payment_data.expirationYear')}
						className='input w-1/2'
						placeholder='AAAA'
					/>
				</div>
				{formik.touched.payment_data?.expirationMonth && formik.errors.payment_data?.expirationMonth && (
					<p className='text-red-500'>{formik.errors.payment_data.expirationMonth}</p>
				)}
				{formik.touched.payment_data?.expirationYear && formik.errors.payment_data?.expirationYear && (
					<p className='text-red-500'>{formik.errors.payment_data.expirationYear}</p>
				)}
			</label>

			<label className='block mb-2'>
				Código de Seguridad:
				<input
					type='text'
					name='payment_data.securityCode'
					{...formik.getFieldProps('payment_data.securityCode')}
					className='input'
				/>
				{formik.touched.payment_data?.securityCode && formik.errors.payment_data?.securityCode && (
					<p className='text-red-500'>{formik.errors.payment_data.securityCode}</p>
				)}
			</label>

			<h3 className='font-semibold mt-4'>Identificación</h3>
			<label className='block mb-2'>
				Tipo:
				<input
					type='text'
					name='payment_data.identification.type'
					{...formik.getFieldProps('payment_data.identification.type')}
					className='input'
				/>
				{formik.touched.payment_data?.identification?.type && formik.errors.payment_data?.identification?.type && (
					<p className='text-red-500'>{formik.errors.payment_data.identification.type}</p>
				)}
			</label>

			<label className='block mb-2'>
				Número:
				<input
					type='text'
					name='payment_data.identification.number'
					{...formik.getFieldProps('payment_data.identification.number')}
					className='input'
				/>
				{formik.touched.payment_data?.identification?.number && formik.errors.payment_data?.identification?.number && (
					<p className='text-red-500'>{formik.errors.payment_data.identification.number}</p>
				)}
			</label>

			<button type='submit' className='w-full mt-4 bg-blue-600 text-white p-2 rounded-lg'>
				Pagar
			</button>
		</form>
	);
};

const CheckoutPaymentTest = ({ product, country }: any) => {
	return (
		<>
			<CheckoutRebill country={country} />
			<CheckoutStripe />
		</>
	);
};

export default CheckoutPaymentTest;
