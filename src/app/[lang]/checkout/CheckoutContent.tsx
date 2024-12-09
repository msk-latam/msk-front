'use client';
import CheckoutRegister from './CheckoutRegister';
import CheckoutPayment from './CheckoutPayment';
import CheckoutState from './CheckoutState';
import { useCheckout } from './CheckoutContext';

const CheckoutContent: React.FC = () => {
	const { activeStep } = useCheckout();

	switch (activeStep) {
		case 1:
			return <CheckoutRegister />;
		case 2:
			return <CheckoutPayment />;
		case 3:
			return <CheckoutState />;
		default:
			return <div>Paso no válido</div>;
	}
};

export default CheckoutContent;
