import { useEffect } from 'react';

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
	mode?: 'payment' | 'subscription'; // Define si es un pago único o una suscripción
}

const CheckoutRebill: React.FC<CheckoutRebillProps> = ({ formData, mode = 'payment' }) => {
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

		const rebill = new window.Rebill('pk_test_8f248fff-0734-11ef-92e2-0e2c69b9aaf7');

		let checkoutForm;
		try {
			if (mode === 'payment') {
				// Crea un formulario para pagos únicos
				checkoutForm = rebill.checkout.create({
					name: formData.productName,
					description: formData.description || '',
					amount: formData.amount,
					currency: formData.currency,
				});
				console.log(formData.customerData?.identification?.type);
				checkoutForm.set({
					customerInformation: {
						email: formData.customerData.email || '',
						firstName: formData.customerData.firstName || '',
						lastName: formData.customerData.lastName || '',
						phoneNumber: formData.customerData.phoneNumber || { number: 0 },
						identification: {
							type: formData.customerData?.identification?.type,
							id: formData.customerData?.identification?.id,
						},
					},
					billing: {
						city: formData.billing?.city || '',
						country: formData.billing?.country || '',
						line1: formData.billing?.line1 || '',
						line2: formData.billing?.line2 || '',
						zipCode: formData.billing?.zipCode || '',
						state: formData.billing?.state || '',
					},
				});
				checkoutForm.display({
					userLogin: false,
					// billing: false,
					// customerInformation: false,
					// cardholderDetails: false,
					discountCode: false,
					// checkoutSummary: false,
					// submitButton: false,
					// resetButton: false,
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});
				checkoutForm.custom({
					css: `
					
					 [id^="headlessui-listbox-option"]:nth-child(n+6) {
		  display: none !important;
		}
				`,
				});
			} else if (mode === 'subscription') {
				// Crea un formulario para suscripciones
				if (!formData.frequency) {
					throw new Error("Para suscripciones, 'frequency' es requerido.");
				}
				checkoutForm = rebill.checkout.create({
					name: formData.productName,
					description: formData.description || '',
					amount: formData.amount,
					currency: formData.currency,
					frequency: formData.frequency,
					debitDay: formData.debitDay,
					repetitions: formData.repetitions,
				});
				checkoutForm.display({
					userLogin: false,
					// billing: false,
					customerInformation: false,
					// cardholderDetails: false,
					discountCode: false,
					// checkoutSummary: false,
					// submitButton: false,
					// resetButton: false,
					excludePaymentMethods: ['CASH', 'REBILL_PIX', 'TRANSFER'],
				});
				checkoutForm.set({
					customerInformation: {
						email: formData.customerData.email || '',
						firstName: formData.customerData.firstName || '',
						lastName: formData.customerData.lastName || '',
						phoneNumber: formData.customerData.phoneNumber || { number: 0 },
					},
				});
			}

			checkoutForm.custom({
				css: `
				
				 [id^="headlessui-listbox-option"]:nth-child(n+6) {
      display: none !important;
    }
			`,
			});

			// Monta el formulario en el contenedor
			checkoutForm.mount('rebill-container');

			checkoutForm.on('approved', (e) => {
				console.log('Pago aprobado:', e);
			});

			checkoutForm.on('error', (e) => {
				console.error('Error en el formulario:', e);
			});

			checkoutForm.on('rejected', (e) => {
				console.warn('Pago rechazado:', e);
			});

			console.log('Formulario inicializado:', checkoutForm);
		} catch (error) {
			console.error('Error al inicializar Rebill Checkout:', error);
		}
	}, [formData, mode]);

	return (
		<div className=''>
			<div id='rebill-container' className='p-6 bg-white border border-gray-300 rounded-lg flex h-screen'>
				{/* El iframe se montará aquí */}
			</div>
		</div>
	);
};

export default CheckoutRebill;
