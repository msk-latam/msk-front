'use client';
import { AuthContext } from '@/context/user/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { validatePaymentField } from './validators/paymentValidator';
import CardDetailsForm from './forms/CardDetailsForm';
import CheckoutPaymentButtons from './buttons/CheckoutPaymentButtons';
import { createPaymentMercadoPago } from './utils/utils';
import { updateContractCRM } from '../[lang]/checkout/utils/utils';

interface CheckoutContentProps {
	product?: any;
	country?: string;
}
const CheckoutPaymentMercadoPago: React.FC<CheckoutContentProps> = ({ product, country }) => {
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
		appliedCoupon,
	} = useCheckout();

	console.log(user);

	const [formData, setFormData] = useState({
		cardholderName: '',
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
		country: country || '',
		state: user.state,
		city: user.city,
		address: user.address,
		postal_code: user.postal_code,
		profession: user?.profession || [],
		name: user?.firstName || state.profile.name,
		last_name: user?.lastName || state.profile.last_name,
		email: user?.email || state.profile.email,
		phone: user?.phone || state.profile.phone,
		speciality: user?.specialty || state.profile.speciality,
		privacyPolicy: user?.privacyPolicy || true,
		converted_by: 'Checkout Web',
		type_doc: user.type_doc,
		identification: user.identification,
		fiscal_regime: 'a',
	});

	const [errors, setErrors] = useState({
		cardholderName: '',
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
		type_doc: '',
		documentNumber: '',
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
		identification: '',
		fiscal_regime: '',
	});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const allErrorsAreEmpty = Object.values(errors).every((error) => error === '');
		const allFieldsAreFilled = Object.values(formData).every((value) => value !== '' && value !== false);
		const formIsValid = allErrorsAreEmpty && allFieldsAreFilled;
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

	const currency = 'ARS';

	const totalPrice = product.total_price;
	const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);
	const regularPrice = product.regular_price;
	const regularPriceFixed = parseInt(regularPrice.replace(/[\.,]/g, ''), 10);

	const discount =
		appliedCoupon && appliedCoupon.discountType === 'percentage'
			? transactionAmount * (appliedCoupon.value / 100) // Descuento porcentual
			: appliedCoupon && appliedCoupon.discountType === 'fixed'
			? appliedCoupon.value // Descuento fijo
			: 0;

	// Aplica el descuento asegurando que no haya valores negativos
	const transactionAmountWithDiscount = Math.max(transactionAmount - discount, 0);
	const regularPriceWithDiscount = Math.max(regularPriceFixed - discount, 0);

	const mapFormDataToRequest = (formData: any) => {
		return {
			// transaction_amount: 1000,
			transaction_amount: transactionAmountWithDiscount,
			installments: 6,
			description: 'Pago de contrato MSK',
			payer: {
				name: formData.firstName || user?.firstName || state.profile.name,
				email: formData.email || state.email,
				first_name: formData.firstName || user?.firstName || state.profile.name,
				last_name: formData.lastName || user?.lastName || state.profile.last_name,

				identification: {
					type: user.type_doc,
					number: user.identification,
				},
			},
			payment_data: {
				cardNumber: formData.cardNumber,
				expirationMonth: formData.expiryMonth,
				expirationYear: formData.expiryYear,
				securityCode: formData.cvv,
				identification: {
					type: user.type_doc,
					number: user.identification,
				},
			},
			additional_information: {
				telefono: formData.phone,
				direccion: user.address,
				ciudad: user.city,
				provincia: user.state,
				cp: user.postal_code,
				profesion: user.profession,
				especialidad: formData.speciality,
			},
			product: {
				items: [
					{
						code: product.ficha.product_code,
						quantity: 1,
						price: regularPriceWithDiscount,
						total: regularPriceWithDiscount,
						net_total: regularPriceWithDiscount,
						total_after_discount: regularPriceWithDiscount,
						list_price: regularPriceWithDiscount,
						// price: 1000,
						// total: 1000,
						// net_total: 1000,
						// total_after_discount: 1000,
						// list_price: 1000,
					},
				],
				currency,
				country: formData.country,
				sub_total: regularPriceWithDiscount,
				grand_total: transactionAmountWithDiscount,
				// sub_total: 1000,
				// grand_total: 1000,
			},
		};
	};

	const handleSubmitMercadoPago = async () => {
		if (!isFormValid) return;

		const requestBody = mapFormDataToRequest(formData);
		setIsSubmitting(true);

		try {
			const data = await createPaymentMercadoPago(requestBody);

			console.log(data);

			if (data[0].status === 'approved') {
				setPaymentStatus('approved');

				const mercadoPagoPaymentId = data[0].id.toString();

				const updateContract = await updateContractCRM(
					user.contract_id,
					mercadoPagoPaymentId,
					transactionAmountWithDiscount,
					'mercadopago',
				);

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
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
				setPaymentStatus('rejected');
			}
		} catch (error) {
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
			setPaymentStatus('rejected');
		} finally {
			setIsSubmitting(false);
			const updateContract = await updateContractCRM(user.contract_id, '', transactionAmountWithDiscount, 'mercadopago');
			console.log(updateContract);
		}
	};

	return (
		<div>
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
					isFormValid={isFormValid}
					isSubmitting={isSubmitting}
					handlePreviousStep={handlePreviousStep}
					handleSubmit={handleSubmitMercadoPago}
					isDisabled
				/>
			</>
		</div>
	);
};

export default CheckoutPaymentMercadoPago;
