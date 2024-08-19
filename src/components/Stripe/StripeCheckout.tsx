import React, {
  useState,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createStripePaymentToken, getEnvKey } from '@/logic/Stripe';
import { FetchSingleProduct, JsonMapping } from '@/data/types';
import countryNamesMapping from '@/data/jsons/__countriesNames.json';
import CheckoutInputSkeleton from '../Skeleton/CheckoutInputSkeleton';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import stImg from '@/public/images/ST.svg';

const key = getEnvKey();
const stripePromise = loadStripe(key);
const countryNames: JsonMapping = countryNamesMapping;

interface CheckoutFormProps {
  isTrial: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setFaliedMessage: Dispatch<SetStateAction<string>>;
  setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  isTrial,
  setShow,
  setFaliedMessage,
  setPaymentCorrect,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [onPaymentRequest, setOnPaymentRequest] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setOnPaymentRequest(true);
    if (!stripe || !elements) {
      setOnPaymentRequest(false);

      return;
    }
    if (isTrial) {
      const stripeResponse = await stripe.confirmSetup({
        elements,
        confirmParams: {
          //return_url: 'http://localhost:3000',
        },
        redirect: 'if_required',
      });

      // console.log({ stripeResponse });

      if (
        stripeResponse.error &&
        typeof stripeResponse.error.message !== 'undefined'
      ) {
        setFaliedMessage(stripeResponse.error.message);
        setError(stripeResponse.error.message);
      } else if (stripeResponse?.setupIntent?.status === 'succeeded') {
        setSuccess(true);
        setPaymentCorrect(true);
        setShow(true);
      }
      setOnPaymentRequest(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mx-4 mb-5'>
      <PaymentElement className='box mt-3 mb-4' />

      <div className='field'>
        <div className='control'>
          <button
            className='button msk-color-button is-fullwidth'
            type='submit'
            disabled={!stripe || !elements || onPaymentRequest}
          >
            {onPaymentRequest ? 'Procesando ...' : 'Finalizar'}
          </button>
        </div>
      </div>
      {error && <div className='notification is-danger'>{error}</div>}
      {/* {success && <div className='notification is-success'>¡Pago Exitoso!</div>} */}
    </form>
  );
};

interface StripeCheckoutProps {
  product: FetchSingleProduct | undefined;
  country: string;
  quotes: number;
  setShow: Dispatch<SetStateAction<boolean>>;
  setFaliedMessage: Dispatch<SetStateAction<string>>;
  setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>;
}

const StripeCheckout: FC<StripeCheckoutProps> = ({
  product,
  country,
  quotes,
  setShow,
  setFaliedMessage,
  setPaymentCorrect,
}) => {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [found, setFound] = useState('');
  const [waiting, setWaiting] = useState(true);
  const fullNameCountry = countryNames[country];
  const { profile } = useAuth();

  useEffect(() => {
    const productNotUndefined = typeof product !== 'undefined';
    const userSessionNotUndefined =
      typeof profile !== 'undefined' && profile !== null;

    if (productNotUndefined && userSessionNotUndefined) {
      createStripePaymentToken({
        product: product?.ficha,
        user: profile,
        fullNameCountry,
        quotes,
        setError,
        setClientSecret,
        setFound,
        setWaiting,
      });
    }
  }, [profile]);

  const options = {
    clientSecret,
    theme: 'flat',
  };

  if (waiting) {
    {
      return <CheckoutInputSkeleton />;
    }
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            isTrial={true}
            setShow={setShow}
            setFaliedMessage={setFaliedMessage}
            setPaymentCorrect={setPaymentCorrect}
          />
        </Elements>
      )}
      {error && (
        <div className='notification is-danger has-text-centered mb-4 mx-4'>
          {error}
        </div>
      )}
      {found && (
        <div className='notification is-success has-text-centered mb-4 mx-4'>
          {found}
        </div>
      )}

      <div className='text-violet-wash flex items-center justify-center gap-x-3 mb-4'>
        <span>Pagos procesados con</span>

        <Image src={stImg.src} width={70} height={80} alt={'Stripe Image'} />
      </div>
    </>
  );
};

export default StripeCheckout;
