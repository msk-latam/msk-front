import { IS_PROD } from '@/contains/constants';
import { UserProfile } from '@/data/types';
import { generateURLPayments } from '@/lib/generateURLPayments';
import { Dispatch, SetStateAction } from 'react';

export const getEnvKey = () => {
  let key = IS_PROD
    ? process.env.NEXT_PUBLIC_STRIPE_MSK_PK_PROD
    : process.env.NEXT_PUBLIC_STRIPE_MSK_PK_TEST;

  return key ?? '';
};

type createStripePaymentTokenProps = ({
  product,
  user,
  fullNameCountry,
  quotes,
  setClientSecret,
  setError,
  setFound,
  setWaiting,
}: {
  product: any | undefined;
  user: UserProfile | null;
  fullNameCountry: string;
  quotes: number;
  setClientSecret: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  setFound: Dispatch<SetStateAction<string>>;
  setWaiting: Dispatch<SetStateAction<boolean>>;
}) => Promise<void>;

export const createStripePaymentToken: createStripePaymentTokenProps = async ({
  product,
  user,
  fullNameCountry,
  quotes,
  setClientSecret,
  setError,
  setFound,
  setWaiting,
}) => {
  let stripeUrl = generateURLPayments('/api/gateway/api/stripe/payment/trial');
  let parsedAmount = parseInt(product?.price.total_price.replace('.', ''));
  let body = JSON.stringify({
    user,
    amount: parsedAmount,
    country: fullNameCountry,
    quotes,
    product,
  });
  const response = await fetch(stripeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6`,
    },
    body,
  });

  const paymentIntent = await response.json();
  console.log({ paymentIntent });

  if (paymentIntent.status === 302) {
    setFound('El pago realizado ha sido aprobado correctamente');
    setWaiting(false);
    return;
  }

  if (paymentIntent.error) {
    setError(paymentIntent.error);
    setWaiting(false);
    return;
  }

  setClientSecret(paymentIntent.response.client_secret);
  setWaiting(false);
};
