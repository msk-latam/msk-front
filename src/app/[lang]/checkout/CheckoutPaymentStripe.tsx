'use client';
import { useEffect, useState } from 'react';
import { ENDPOINT_GATEWAY } from './rebill/rebillEndpoints';
import { countryToName, createPaymentRebill, currencies, updateContractCRM } from './utils/utils';
import { AuthContext } from '@/context/user/AuthContext';
import { useCheckout } from './CheckoutContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
	attachCardToUser,
	createStripeSubscription,
	getPaymentIntentId,
	getStripeCustomerIdBySubId,
	updatePaymentIntent,
} from './stripe/stripeUtils';
import StepButtons from './buttons/CheckoutPaymentButtons';

const CheckoutStripe = ({ product, country }: any) => {
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
		appliedCoupon,
	} = useCheckout();
	const currency = currencies[country] || 'USD';
	const currentCountry = countryToName[country];
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);

	const transactionAmount = Number(product.total_price.replace(/,/g, '').replace('.', ''));

	const discount =
		appliedCoupon && appliedCoupon.discountType === 'percentage'
			? transactionAmount * (appliedCoupon.value / 100)
			: appliedCoupon && appliedCoupon.discountType === 'fixed'
			? appliedCoupon.value
			: 0;

	const transactionAmountWithDiscount = Math.max(transactionAmount - discount, 0);

	const [formData, setFormData] = useState({
		quote_amount: parseFloat((transactionAmountWithDiscount / 12).toFixed(2)),
		total_contract_amount: parseFloat(transactionAmountWithDiscount.toFixed(2)),
		currency: currency,
		quotes: 12,
		contract_id: user.contract_id,
		contract_so: (BigInt(user.contract_id) + BigInt(1)).toString(),
		customer: {
			name: (user?.firstName || state?.profile?.name || '') + ' ' + (user?.lastName || state?.profile?.last_name || ''),
			email: user?.email || state?.profile?.email || '',
			first_name: user?.firstName || state?.profile?.name || '',
			last_name: user?.lastName || state?.profile?.last_name || '',
			country: currentCountry,
		},
		product: {
			name: product.ficha.title,
			product_code: product.ficha.product_code,
			amount: parseFloat(transactionAmountWithDiscount.toFixed(2)),
		},
	});
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			quote_amount: parseFloat((transactionAmountWithDiscount / 12).toFixed(2)),
			total_contract_amount: parseFloat(transactionAmountWithDiscount.toFixed(2)),
			product: {
				...prev.product,
				amount: parseFloat(transactionAmountWithDiscount.toFixed(2)),
			},
		}));
	}, [transactionAmountWithDiscount, currency]);

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
		setIsLoading(true);

		if (!stripe || !elements) {
			console.error('Stripe.js no ha sido cargado correctamente.');
			setIsLoading(false);
			return;
		}

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			console.error('No se encontró el elemento de tarjeta.');
			setIsLoading(false);
			return;
		}

		try {
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement,
				billing_details: {
					name: formData.customer.name,
					email: formData.customer.email,
					address: { country: country },
				},
			});

			if (error) {
				console.error(error);
				return;
			}

			const paymentMethodId = paymentMethod.id;
			const updatedFormData = {
				...formData,
				paymentMethodId,
			};

			const stripeSubscriptionResponse = await createStripeSubscription(updatedFormData);
			const stripeSubscriptionId = stripeSubscriptionResponse.response.subscription_id;

			const customerResponse = await getStripeCustomerIdBySubId(stripeSubscriptionId);
			const customerId = customerResponse.customer;
			const invoiceId = customerResponse.latest_invoice;

			const paymentIntent = await getPaymentIntentId({ invoiceId });

			const paymentIntentId = paymentIntent.payment_intent;

			const updatePayment = await updatePaymentIntent({ paymentIntentId, paymentMethodId });

			console.log(updatePayment);

			console.log(customerId); //cus
			console.log(stripeSubscriptionId); //sub
			console.log(paymentMethodId); //pm
			console.log(paymentIntentId); //pi

			await attachCardToUser({
				customer_id: customerId,
				payment_method_id: paymentMethodId,
			});

			if (stripeSubscriptionResponse?.response?.subscription_id && stripeSubscriptionResponse?.response?.client_secret) {
				setPaymentStatus('approved');

				const updateContract = await updateContractCRM(
					user.contract_id,
					stripeSubscriptionId,
					transactionAmountWithDiscount,
					'stripe',
					discount,
				);

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
			}
		} catch (error) {
			console.error('Error en la solicitud de checkout:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-lg w-full mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200'
		>
			<h2 className='text-xl font-semibold text-gray-700 mb-4 text-center'>Finalizar Pago</h2>

			<div className='p-4 border border-gray-300 rounded-lg bg-gray-50'>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '18px',
								color: '#333',
								'::placeholder': { color: '#a0aec0' },
							},
						},
					}}
				/>
			</div>

			<button
				type='submit'
				className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex justify-center items-center'
				disabled={isLoading}
			>
				{isLoading ? (
					<div className='h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
				) : (
					'Pagar'
				)}
			</button>
		</form>
	);
};

const CheckoutPaymentStripe = ({ product, country }: any) => {
	const { subStep, setSubStep, activeStep, setActiveStep, setPaymentType } = useCheckout();
	const handlePreviousStep = () => {
		if (subStep > 0) {
			setSubStep(subStep - 1);
			setActiveStep(activeStep - 1);
			setPaymentType(null);
		} else if (activeStep > 1) {
			setActiveStep(activeStep - 1);
		}
	};
	return (
		<div className='mt-24'>
			<CheckoutStripe product={product} country={country} />
			<StepButtons
				isFormValid={true}
				isSubmitting={false}
				handlePreviousStep={handlePreviousStep}
				handleSubmit={() => console.log('')}
			/>
		</div>
	);
};

export default CheckoutPaymentStripe;
