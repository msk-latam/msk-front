import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { selectCountryKey } from './rebill/rebillKeys';
import { useRecoilState, useRecoilValue } from 'recoil';
import { rebillIdState, transactionAmountWithDiscountState } from './checkoutAtom';
import { AuthContext } from '@/context/user/AuthContext';
import { createPaymentRebill, currencies, updateContractCRM } from './utils/utils';
import StepButtons from './buttons/CheckoutPaymentButtons';

let checkoutForm: any;
let rebillPayment: any;

interface CheckoutRebillProps {
	mode?: 'payment' | 'subscription';
	country?: string;
	formData: {
		discount?: number;
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
		appliedCoupon,
	} = useCheckout();
	const rebillId = useRecoilValue(rebillIdState);
	const variables = selectCountryKey(country);
	const [processingPayment, setProcessingPayment] = useState(false);
	const checkoutFormRef = useRef<any>(null);

	const transactionAmount = formData.amount;
	const discountAmount = formData.discount;

	console.log('datos del formulario', formData);

	console.log('monto de transaccion para crm', transactionAmount);
	console.log('descuento para crm', discountAmount);

	const initializeRebillCheckout = () => {
		if (!window.Rebill) {
			console.error(
				'Rebill SDK no está disponible. Verifica que el script https://sdk.rebill.com/v3/rebill.js se haya cargado correctamente.',
			);
			return;
		}

		if (checkoutFormRef.current) {
			console.log('Checkout ya inicializado, evitando duplicaciones');
			return;
		}

		const container = document.getElementById('rebill-container');
		if (container) {
			container.innerHTML = '';
		}

		const rebill = new window.Rebill(variables.API_KEY);

		try {
			if (rebillId !== '') {
				const checkoutForm = rebill.card.create(rebillId);
				checkoutFormRef.current = checkoutForm;

				checkoutForm.display({
					userLogin: false,
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});

				checkoutForm.set({
					issuerCountry: country?.toUpperCase(),
				});

				checkoutForm.translations({
					es: { 'Add card': 'Pagar' },
					en: { 'Add card': 'Pay' },
				});

				checkoutForm.mount('rebill-container');
				checkoutForm.on('submit', async (e: any) => {
					setIsSubmitting(true);
				});

				checkoutForm.on('success', async (e: any) => {
					setIsSubmitting(true);
					handlePaymentSuccess(e);
				});

				checkoutForm.on('error', (e: any) => {
					setIsSubmitting(false);
					handlePaymentError(e);
				});
			}
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	};

	useEffect(() => {
		initializeRebillCheckout();
	}, [mode]);

	const handlePaymentSuccess = async (e: any) => {
		// setProcessingPayment(true);
		setIsSubmitting(true);

		try {
			const data = await createPaymentRebill(
				formData.customerData?.email,
				user.contract_id,
				formData.amount,
				formData.currency,
				e.card.id,
				country,
			);

			if (data.invoice && data.failedTransaction === null && data.invoice.paidBags?.[0]?.payment?.status === 'SUCCEEDED') {
				setPaymentStatus('approved');
				const paymentRebillId = data.invoice.paidBags[0].payment.id;

				await updateContractCRM(
					user.contract_id,
					paymentRebillId,
					transactionAmount,
					'rebill',
					discountAmount,
					appliedCoupon?.code ?? null,
				);

				advanceStep();
			} else {
				setPaymentStatus('rejected');
				advanceStep();
			}
		} catch (error) {
			console.error('Error en la solicitud de checkout:', error);
		} finally {
			// setProcessingPayment(false);
			setIsSubmitting(false);
		}
	};

	const handlePaymentError = (e: any) => {
		console.error('Error en tarjeta:', e);
		setPaymentStatus('rejected');
		advanceStep();
		setIsSubmitting(false);
	};

	const advanceStep = () => {
		if (subStep === 0) {
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
		} else {
			setActiveStep(activeStep + 1);
			completeStep(activeStep);
			setSubStep(0);
		}
	};

	return (
		<div>
			{isSubmitting ? (
				<div className='flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded-lg'>
					<span className='animate-spin w-8 h-8 border-4 border-gray-300 border-t-[#392C35] rounded-full'></span>
					<p className='mt-3 text-[#392C35] font-semibold'>Procesando cobro...</p>
				</div>
			) : (
				<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex max-h-[750px]'></div>
			)}
		</div>
	);
};

const CheckoutPaymentTest = ({ product, country }: any) => {
	const { user, appliedCoupon, subStep, setSubStep, activeStep, setActiveStep, setPaymentType, isSubmitting } =
		useCheckout();
	const { state } = useContext(AuthContext);

	const transactionAmount = Number(product.total_price.replace(/,/g, '').replace('.', ''));
	const currency = currencies[country] || 'USD';

	const discountValue = Number(appliedCoupon?.value) || 0;
	const discountType = appliedCoupon?.discountType;

	const discount =
		discountType === 'percentage' ? transactionAmount * (discountValue / 100) : discountType === 'fixed' ? discountValue : 0;

	const transactionAmountWithDiscount = parseFloat(Math.max(transactionAmount - discount, 0).toFixed(2));

	console.log('precio con descuento de recoil', transactionAmountWithDiscount);

	// Datos del formulario para Rebill
	const rebillForm = {
		discount: parseFloat(discount.toFixed(2)),
		amount: transactionAmountWithDiscount,
		currency,
		productName: product.ficha.title,
		customerData: {
			email: user?.email || state?.profile?.email || '',
			firstName: user?.firstName || state?.profile?.name || '',
			lastName: user?.lastName || state?.profile?.last_name || '',
			phoneNumber: { number: user?.phone || state?.profile?.phone || '' },
		},
	};

	console.log('precio total con descuento despues del form', transactionAmountWithDiscount);
	const handlePreviousStep = () => {
		if (subStep > 0) {
			setSubStep(subStep - 1);
			setActiveStep(activeStep - 1);
			setPaymentType(null);
		} else if (activeStep > 1) {
			setActiveStep(activeStep - 1);
		}
	};

	console.log(isSubmitting);

	return (
		<div className='mt-24'>
			<CheckoutRebill country={country} formData={rebillForm} />
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

export default CheckoutPaymentTest;
