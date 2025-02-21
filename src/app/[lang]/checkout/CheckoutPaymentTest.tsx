import React, { useEffect } from 'react';
import { useCheckout } from './CheckoutContext';
import { selectCountryKey } from './rebill/rebillKeys';

let checkoutForm: any;
let rebillPayment: any;

interface CheckoutRebillProps {
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
	mode?: 'payment' | 'subscription';
	country?: string;
}

const CheckoutRebill: React.FC<CheckoutRebillProps> = ({ formData, mode = 'payment', country }) => {
	const { user } = useCheckout();
	console.log('revisando pais de checkout rebill', country);

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
			if (mode === 'payment') {
				checkoutForm = rebill.card.create('4ae8f580-15e6-4445-99ea-102623bb8b88');

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

			// console.log('Formulario inicializado:', checkoutForm);
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	}, [formData, mode]);

	return (
		<div className=''>
			<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex h-[800px] '>
				{/* El iframe se montará aquí */}
			</div>
		</div>
	);
};

const CheckoutPaymentTest = ({ product, country }: any) => {
	return (
		<>
			<CheckoutRebill formData={{}} country={country} />
		</>
	);
};

export default CheckoutPaymentTest;
