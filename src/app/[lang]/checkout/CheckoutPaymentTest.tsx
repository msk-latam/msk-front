import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { selectCountryKey } from './rebill/rebillKeys';
import { useRecoilState, useRecoilValue } from 'recoil';
import { rebillIdState, transactionAmountWithDiscountState } from './checkoutAtom';
import { AuthContext } from '@/context/user/AuthContext';
import { createPaymentRebill, currencies, updateContractCRM } from './utils/utils';

let checkoutForm: any;
let rebillPayment: any;

interface CheckoutRebillProps {
	mode?: 'payment' | 'subscription';
	country?: string;
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
	const transactionAmountWithDiscount = useRecoilState(transactionAmountWithDiscountState);
	console.log(transactionAmountWithDiscount);

	const transactionAmount = formData.amount;

	console.log(formData);
	console.log(transactionAmount);

	const discount =
		appliedCoupon && appliedCoupon.discountType === 'percentage'
			? transactionAmount * (appliedCoupon.value / 100) // Descuento porcentual
			: appliedCoupon && appliedCoupon.discountType === 'fixed'
			? appliedCoupon.value // Descuento fijo
			: 0;

	// const transactionAmountWithDiscount = Math.max(transactionAmount - discount, 0);

	useEffect(() => {
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
				checkoutForm = rebill.card.create(rebillId);
				checkoutFormRef.current = checkoutForm;

				checkoutForm.display({
					userLogin: false,
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});
			}
			checkoutForm.set({
				issuerCountry: country?.toUpperCase(),
			});

			checkoutForm.translations({
				es: {
					'Add card': 'Pagar',
				},
				en: {
					'Add card': 'Pay',
				},
			});

			checkoutForm.mount('rebill-container');

			checkoutForm.on('success', async (e: any) => {
				// console.log('Tarjeta tokenizada', e);
				setProcessingPayment(true);

				const contract_id = user.contract_id;
				console.log(transactionAmountWithDiscount, 'precio con descuento');

				try {
					const data = await createPaymentRebill(
						formData.customerData?.email,
						contract_id,
						transactionAmountWithDiscount,
						formData.currency,
						e.card.id,
						country,
					);

					if (
						data.invoice &&
						data.failedTransaction === null &&
						data.invoice.paidBags?.[0]?.payment?.status === 'SUCCEEDED'
					) {
						setPaymentStatus('approved');
						const paymentRebillId = data.invoice.paidBags[0].payment.id;

						const updateContract = await updateContractCRM(
							contract_id,
							paymentRebillId,
							transactionAmountWithDiscount,
							'rebill',
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
						setIsSubmitting(false);
					}
				} catch (error) {
					console.error('Error en la solicitud de checkout:', error);
				} finally {
					// setProcessingPayment(false);
				}
			});

			checkoutForm.on('error', (e: any) => {
				console.error('Error en tarjeta:', e);
				rebillPayment = 'Contrato en proceso de cobro';
				setPaymentStatus('rejected');
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
				setIsSubmitting(false);
			});
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	}, [mode]);

	return (
		<div>
			{processingPayment ? (
				<div className='flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded-lg'>
					<span className='animate-spin w-8 h-8 border-4 border-gray-300 border-t-[#392C35] rounded-full'></span>
					<p className='mt-3 text-[#392C35] font-semibold'>Procesando cobro...</p>
				</div>
			) : (
				<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex h-[800px]'></div>
			)}
		</div>
	);
};

const CheckoutPaymentTest = ({ product, country }: any) => {
	const { user, appliedCoupon } = useCheckout();
	const { state } = useContext(AuthContext);

	const transactionAmount = Number(product.total_price.replace(/,/g, '').replace('.', ''));
	const currency = currencies[country] || 'USD';

	// Estado para manejar el monto con descuento
	const [transactionAmountWithDiscount, setTransactionAmountWithDiscount] = useRecoilState(
		transactionAmountWithDiscountState,
	);

	// Función para actualizar el precio con descuento
	useEffect(() => {
		const discountValue = Number(appliedCoupon?.value) || 0;
		const discountType = appliedCoupon?.discountType;

		const discount =
			discountType === 'percentage'
				? transactionAmount * (discountValue / 100)
				: discountType === 'fixed'
				? discountValue
				: 0;

		setTransactionAmountWithDiscount(Math.max(transactionAmount - discount, 0));
	}, [appliedCoupon, transactionAmount]); // Se ejecuta cuando cambia el cupón o el precio base

	// Datos del formulario para Rebill
	const rebillForm = {
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

	console.log('appliedCoupon:', appliedCoupon);
	console.log('appliedCoupon.value:', appliedCoupon?.value);
	console.log('appliedCoupon.discountType:', appliedCoupon?.discountType);
	console.log('precio total con descuento', transactionAmountWithDiscount);

	return (
		<div className='mt-24'>
			<CheckoutRebill country={country} formData={rebillForm} />
		</div>
	);
};

export default CheckoutPaymentTest;
