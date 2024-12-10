'use client';

import CheckoutRegister from './CheckoutRegister';
import CheckoutPayment from './CheckoutPayment';
import CheckoutState from './CheckoutState';
import PaymentTypeSelection from './CheckoutPaymentTypeSelection';
import { useCheckout } from './CheckoutContext';

const CheckoutContent: React.FC = () => {
	const { activeStep, subStep, paymentType } = useCheckout();

	if (activeStep === 2) {
		if (subStep === 0 && !paymentType) {
			return <PaymentTypeSelection />;
		}
		if (subStep === 1 && paymentType) {
			return <CheckoutPayment />;
		}
		return <div>Debe seleccionar el tipo de pago</div>;
	}

	switch (activeStep) {
		case 1:
			return <CheckoutRegister />;
		case 3:
			return <CheckoutState />;
		default:
			return <div>Paso no válido</div>;
	}
};

export default CheckoutContent;
