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

let isSubmittingPay = false;

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
		certifications,
	} = useCheckout();
	const currency = currencies[country] || 'USD';
	const currentCountry = countryToName[country];
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);

	const certificationsTotal = certifications?.reduce((sum, cert) => sum + cert.price, 0) || 0;

	const productBaseAmount = Number(product.total_price.replace(/,/g, '').replace('.', ''));

	// Monto total incluyendo certificaciones
	const transactionAmount = productBaseAmount;

	const discount =
		appliedCoupon && appliedCoupon.discountType === 'percentage'
			? transactionAmount * (appliedCoupon.value / 100)
			: appliedCoupon && appliedCoupon.discountType === 'fixed'
			? appliedCoupon.value
			: 0;

	const transactionAmountWithDiscount = Math.max(transactionAmount - discount, 0);

	console.log(certificationsTotal);
	console.log(productBaseAmount);
	console.log(transactionAmount);
	console.log(transactionAmountWithDiscount);

	const total = transactionAmountWithDiscount + certificationsTotal;

	console.log(total);

	const [formData, setFormData] = useState({
		quote_amount: parseFloat((total / 12).toFixed(2)),
		total_contract_amount: parseFloat(total.toFixed(2)),
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
			amount: parseFloat(total.toFixed(2)),
		},
	});
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			quote_amount: parseFloat((total / 12).toFixed(2)),
			total_contract_amount: parseFloat(total.toFixed(2)),
			product: {
				...prev.product,
				amount: parseFloat(total.toFixed(2)),
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
		setIsSubmitting(true);

		if (!stripe || !elements) {
			console.error('Stripe.js no ha sido cargado correctamente.');
			setIsLoading(false);
			setIsSubmitting(false);
			return;
		}

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			console.error('No se encontró el elemento de tarjeta.');
			setIsLoading(false);
			setIsSubmitting(false);
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
					appliedCoupon?.code ?? null,
					certifications,
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
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-lg p-6 mx-auto bg-white border border-gray-300 shadow-xl rounded-3xl'
		>
			<h2 className='mb-4 text-2xl font-raleway font-semibold text-center text-[#1a1a1a]'>Finalizar Pago</h2>

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
				className='flex items-center justify-center w-full py-3 mt-6 font-semibold text-white transition-all duration-300 bg-[#9200AD] rounded-[38px] hover:bg-[#B814D6]'
				disabled={isLoading}
			>
				{isLoading ? (
					<div className='w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin'></div>
				) : (
					'Pagar'
				)}
			</button>
		</form>
	);
};

const CheckoutPaymentStripe = ({ product, country }: any) => {
	const { subStep, setSubStep, activeStep, setActiveStep, setPaymentType, isSubmitting } = useCheckout();
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
		<div className='space-y-20 sm:space-y-28 sm:flex sm:flex-col'>
			<div className='transform translate-y-16'>
				<CheckoutStripe product={product} country={country} />
			</div>
			<StepButtons
				isDisabled={isSubmitting}
				isFormValid={true}
				isSubmitting={false}
				handlePreviousStep={handlePreviousStep}
				handleSubmit={() => console.log('')}
			/>
		</div>
	);
};

export default CheckoutPaymentStripe;

// 'use client';
// import StepButtons from './buttons/CheckoutPaymentButtons';
// import { CardElement } from '@stripe/react-stripe-js';
// import { useCheckout } from './CheckoutContext';

// const CheckoutStripe = () => {
// 	return (
// 		<form
// 			onSubmit={(e) => e.preventDefault()}
// 			className='w-full max-w-lg p-6 mx-auto bg-white border border-gray-300 shadow-xl rounded-3xl'
// 		>
// 			<h2 className='mb-4 text-2xl font-raleway font-semibold text-center text-[#1a1a1a]'>Finalizar Pago</h2>

// 			<div className='p-4 border border-gray-300 rounded-lg bg-gray-50'>
// 				<CardElement
// 					options={{
// 						style: {
// 							base: {
// 								fontSize: '18px',
// 								color: '#333',
// 								'::placeholder': { color: '#a0aec0' },
// 							},
// 						},
// 					}}
// 				/>
// 			</div>

// 			<button
// 				type='submit'
// 				className='flex items-center justify-center w-full py-3 mt-6 font-semibold text-white transition-all duration-300 bg-[#9200AD] rounded-[38px] hover:bg-[#B814D6]'
// 			>
// 				Pagar
// 			</button>
// 		</form>
// 	);
// };

// const CheckoutPaymentStripe = () => {
// 	const { subStep, setSubStep, activeStep, setActiveStep, setPaymentType } = useCheckout();

// 	const handlePreviousStep = () => {
// 		if (subStep > 0) {
// 			setSubStep(subStep - 1);
// 			setActiveStep(activeStep - 1);
// 			setPaymentType(null);
// 		} else if (activeStep > 1) {
// 			setActiveStep(activeStep - 1);
// 		}
// 	};

// 	return (
// 		<div className='flex flex-col justify-between mt-16'>
// 			<CheckoutStripe />
// 			<StepButtons
// 				isDisabled={false}
// 				isFormValid={true}
// 				isSubmitting={false}
// 				handlePreviousStep={handlePreviousStep}
// 				handleSubmit={() => console.log('Submit fake')}
// 			/>
// 		</div>
// 	);
// };

// export default CheckoutPaymentStripe;
