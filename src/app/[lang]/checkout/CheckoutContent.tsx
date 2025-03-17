'use client';

import CheckoutRegister from './CheckoutRegister';
import CheckoutPayment from './CheckoutPayment';
import CheckoutState from './CheckoutState';
import PaymentTypeSelection from './CheckoutPaymentTypeSelection';
import { useCheckout } from './CheckoutContext';
import CheckoutPaymentTest from './CheckoutPaymentTest';
import CheckoutRegisterTest from './CheckoutRegisterTest';
import CheckoutPaymentStripe from './CheckoutPaymentStripe';
import { rebillCountries } from './utils/utils';
interface CheckoutContentProps {
	product: any;
	country: string;
}
const CheckoutContent: React.FC<CheckoutContentProps> = ({ product, country }) => {
	const { activeStep, subStep, paymentType } = useCheckout();

	if (activeStep === 2) {
		if (subStep === 0) {
			return <PaymentTypeSelection />;
		}
		if (subStep === 1) {
			// Lista de países que deben usar CheckoutPaymentTest

			return rebillCountries.includes(country) ? (
				<CheckoutPaymentTest product={product} country={country} />
			) : (
				<CheckoutPaymentStripe product={product} country={country} />
			);
		}
		return <div>Debe seleccionar el tipo de pago</div>;
	}

	switch (activeStep) {
		case 1:
			// return <CheckoutRegister product={product} country={country} />;
			return <CheckoutRegisterTest product={product} country={country} />;
		case 3:
			return <CheckoutState />;
		default:
			return <div>Paso no válido</div>;
	}
};

export default CheckoutContent;
