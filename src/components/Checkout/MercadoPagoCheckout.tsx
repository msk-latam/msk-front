import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FetchSingleProduct } from '@/data/types';
import InputSkeleton from '@/components/Skeleton/InputSkeleton';
import { useAuth } from '@/hooks/useAuth';
import ssr from '@/services/ssr';
import { useYupValidation } from '@/hooks/useYupValidation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import mpImg from '@/public/images/MP.png';
import Image from 'next/image';

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

  const initialValues = {
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
  };

  const profileCustomerInfo = profile?.contact ?? profile;

  console.log({ profileCustomerInfo, profile, contact: profile?.contact });

  const { cardMpValidation } = useYupValidation();

  const handleSubmit = async (values: any) => {
    console.log({ values });
    setOnPaymentRequest(true);

    const customerCard = {
      ...values,
      identification: {
        type: profileCustomerInfo?.type_doc,
        number: profileCustomerInfo?.identification,
      },
    };

    const paymentDetails = {
      trial: true,
      paymentData: {
        contractId: null,
        email: profileCustomerInfo?.email,
        address: profileCustomerInfo?.address,
        phone: profileCustomerInfo?.phone,
        zip: profileCustomerInfo?.postal_code,
        fullName: `${profileCustomerInfo?.name} ${profileCustomerInfo?.last_name}`,
        contact: {
          ID_Personal: profileCustomerInfo?.identification,
        },
        dni: profileCustomerInfo?.identification,
        mod: 'Suscripcion',
      },
      type: 'Suscripcion',
      contract_so: null,
    };

    const paymentData = {
      transactionAmount: product?.total_price,
      installments: quotes,
      description: `Pago de contrato (SO:)`,
      payer: {
        email: profileCustomerInfo?.email,
        identification: {
          type: profileCustomerInfo?.type_doc,
          number: profileCustomerInfo?.identification,
        },
      },
      paymentDetails,
      customerCard,
    };

    console.log({ paymentData });

    try {
      //   await ssr.postPaymentMercadoPago(paymentData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setOnPaymentRequest(false);
    }
  };

  useEffect(() => {
    if (typeof profile !== 'undefined' && profile != null && product?.ficha) {
      console.log(
        typeof profile !== 'undefined',
        profile != null,
        product?.ficha,
        (typeof profile !== 'undefined' || profile != null) && product?.ficha,
      );
      ssr.createDrafContract(product, profile);
      mountedInputObjectState.setState(true);
    }
  }, [profile, product]);

  return (
    <>
      {mountedInputObjectState.state ? (
        <div className='mpc-box'>
          <div
            className={`mpc-field  mb-5 ${
              onPaymentRequest ? 'mpc-field-requesting hidden' : null
            }`}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={cardMpValidation}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty, setFieldValue }) => (
                <Form className='grid grid-rows-[1fr_auto] gap-3'>
                  <div
                    className={`${
                      onPaymentRequest && 'hidden'
                    } grid col-span-1 grid-cols-4 gap-3`}
                  >
                    <div className='contact-from-input col-span-4'>
                      <Field
                        type='text'
                        name='cardNumber'
                        placeholder='Número de la tarjeta'
                        className='contact-from-input'
                        onChange={(e: any) =>
                          setFieldValue('cardNumber', e.target.value.trim())
                        }
                        onBlur={(e: any) => {
                          console.log(e);
                          setFieldValue('cardNumber', e.target.value.trim());
                        }}
                      />
                      <ErrorMessage
                        name='cardNumber'
                        component='span'
                        className='error'
                      />
                    </div>
                    <div className='contact-from-input col-span-2'>
                      <Field
                        type='text'
                        name='expirationMonth'
                        placeholder='Mes de expiración (MM)'
                        className='contact-from-input'
                      />
                      <ErrorMessage
                        name='expirationMonth'
                        component='span'
                        className='error'
                      />
                    </div>
                    <div className='contact-from-input col-span-2'>
                      <Field
                        type='text'
                        name='expirationYear'
                        placeholder='Año de expiración (YYYY)'
                        className='contact-from-input'
                      />
                      <ErrorMessage
                        name='expirationYear'
                        component='span'
                        className='error'
                      />
                    </div>
                    <div className='contact-from-input col-span-4'>
                      <Field
                        type='text'
                        name='securityCode'
                        placeholder='Código de seguridad (CVV)'
                        className='contact-from-input'
                      />
                      <ErrorMessage
                        name='securityCode'
                        component='span'
                        className='error'
                      />
                    </div>
                  </div>
                  <button
                    className={`cont-btn disabled:bg-grey-disabled disabled:cursor-not-allowed !w-full col-span-1 ${
                      onPaymentRequest && ''
                    }`}
                    type='submit'
                    disabled={
                      onPaymentRequest || !(isValid && dirty) || isSubmitting
                    }
                  >
                    Pagar
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className='text-violet-wash flex items-center justify-center gap-x-3 mb-4'>
            <span>Pagos procesados con</span>

            <Image
              src={mpImg.src}
              width={100}
              height={80}
              alt={'Mercado Pago Image'}
            />
          </div>
        </div>
      ) : (
        <InputSkeleton className='w-[390px] mx-auto' />
      )}
    </>
  );
};

export default MercadoPagoCheckout;
