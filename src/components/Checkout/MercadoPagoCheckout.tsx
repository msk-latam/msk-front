import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import cardIcon from '/public/images/credit-card.svg';
import { FetchSingleProduct } from '@/data/types';
import InputSkeleton from '@/components/Skeleton/InputSkeleton';
import { useAuth } from '@/hooks/useAuth';
import useMercadoPagoInstance from '@/hooks/useMercadoPago';
import ssr from '@/services/ssr';

interface MercadoPagoCheckoutProps {
  product: FetchSingleProduct | undefined;
  quotes: number | null;
  hasCoursedRequested: boolean;
  country: string;
  showMissingData: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setFaliedMessage: Dispatch<SetStateAction<string>>;
  setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>;
  mountedInputObjectState: {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
}

const MercadoPagoCheckout: FC<MercadoPagoCheckoutProps> = ({
  product,
  quotes,
  country,
  mountedInputObjectState,
}) => {
  const { profile } = useAuth();

  const [onPaymentRequest, setOnPaymentRequest] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [identificationType, setIdentificationType] = useState('DNI');

  const [installments, setInstallments] = useState(1);
  const [paymentMethodId] = useState('');
  const [token, setToken] = useState('');
  const { issuer, mpInstance } = useMercadoPagoInstance(product, country, '');

  const profileCustomerInfo = profile?.contact ?? profile;
  console.log({ profileCustomerInfo, profile, contact: profile?.contact });
  const [identificationNumber, setIdentificationNumber] = useState(
    profileCustomerInfo?.identification,
  );

  useEffect(() => {
    console.log({ mpInstance, ficha: product?.ficha });
    if (
      (typeof mpInstance !== 'undefined' || mpInstance != null) &&
      product?.ficha
    ) {
      const cardNumberField = mpInstance.fields.create('cardNumber', {
        placeholder: 'Número de la tarjeta',
      });

      const expirationDateField = mpInstance.fields.create('expirationDate', {
        placeholder: 'MM/AA',
      });

      const securityCodeField = mpInstance.fields.create('securityCode', {
        placeholder: 'Código de seguridad',
      });

      const cardholderNameField = mpInstance.fields.create('cardholderName', {
        placeholder: 'Nombre del titular',
      });

      cardNumberField.mount('form-checkout__cardNumber');
      expirationDateField.mount('form-checkout__expirationDate');
      securityCodeField.mount('form-checkout__securityCode');
      cardholderNameField.mount('form-checkout__cardholderName');

      mountedInputObjectState.setState(true);
    }
  }, [mpInstance, product]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const customerCardData = {
      cardNumber: document.getElementById('form-checkout__cardNumber').value,
      cardholderName: document.getElementById('form-checkout__cardholderName')
        .value,
      identificationType: 'DNI',
      identificationNumber: '12345678',
      securityCode: document.getElementById('form-checkout__securityCode')
        .value,
      expirationDate: document.getElementById('form-checkout__expirationDate')
        .value,
    };

    const tokenElement = await mpInstance.fields.createCardToken(
      customerCardData,
    );

    console.log({ tokenElement });

    const cardToken = tokenElement.id;

    processPayment(cardToken);
  };

  const processPayment = (token: string) => {
    const paymentData = {
      securityCode: document.getElementById('form-checkout__securityCode')
        .value,
      token,
      issuer,
      paymentMethodId,
      transactionAmount: product?.total_price,
      installments: quotes,
      description: `Pago de contrato (SO:)`,
      payer: {
        email: profileCustomerInfo.email,
        identification: {
          type: 'DNI',
          number: profileCustomerInfo?.identification,
        },
      },
      paymentDetails: null,
    };

    // Ejemplo de envío a backend (esto es solo un esquema)
    const payment = ssr.postPaymentMercadoPago(paymentData);
    console.log({ payment });
  };

  return (
    <>
      <form id='form-checkout' onSubmit={handleSubmit}>
        <div id='form-checkout__cardNumber'></div>
        <div id='form-checkout__expirationDate'></div>
        <div id='form-checkout__securityCode'></div>
        <div id='form-checkout__cardholderName'></div>
        <button type='submit'>Pagar</button>
      </form>
      {mountedInputObjectState.state ? (
        <div className='mpc-box'>
          <div
            className={`mpc-field ${
              onPaymentRequest ? 'mpc-field-requesting hidden' : null
            }`}
          >
            <form id='form-checkout' onSubmit={handleSubmit}>
              <div id='form-checkout__cardNumber'></div>
              <div id='form-checkout__expirationDate'></div>
              <div id='form-checkout__securityCode'></div>
              <div id='form-checkout__cardholderName'></div>
              <button type='submit'>Pagar</button>
            </form>
          </div>
        </div>
      ) : (
        <InputSkeleton className='w-[390px] mx-auto' />
      )}
    </>
  );
};

export default MercadoPagoCheckout;
