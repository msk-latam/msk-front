'use client';

import CheckoutState from './CheckoutState';
import PaymentTypeSelection from './CheckoutPaymentTypeSelection';
import { useCheckout } from './CheckoutContext';
import CheckoutPaymentTest from './CheckoutPaymentTest';
import CheckoutRegisterTest from './CheckoutRegisterTest';
import CheckoutPaymentStripe from './CheckoutPaymentStripe';
import { rebillCountries } from './utils/utils';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
interface CheckoutContentProps {
	product: any;
	country: string;
}
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
	throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY no está definido en las variables de entorno');
}

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);
const CheckoutContent: React.FC<CheckoutContentProps> = ({ product, country }) => {
	const { activeStep, subStep, paymentType } = useCheckout();

	if (activeStep === 2) {
		if (subStep === 0) {
			return <PaymentTypeSelection />;
		}
		if (subStep === 1) {
			return rebillCountries.includes(country) ? (
				<CheckoutPaymentTest product={product} country={country} />
			) : (
				<Elements stripe={stripePromise}>
					<CheckoutPaymentStripe product={product} country={country} />
				</Elements>
			);
		}
		return <div>Debe seleccionar el tipo de pago</div>;
	}

	switch (activeStep) {
		case 1:
			return <CheckoutRegisterTest product={product} country={country} />;
		case 3:
			return <CheckoutState />;
		default:
			return <div>Paso no válido</div>;
	}
};

export default CheckoutContent;
