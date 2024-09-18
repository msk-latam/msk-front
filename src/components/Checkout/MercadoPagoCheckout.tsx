import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
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
  const sendRequestRef = useRef(false);
  const [onPaymentRequest, setOnPaymentRequest] = useState(false);
  const [contractDraftCreated, setContractDraftCreated] = useState<{} | null>(
    null,
  );

  const initialValues = {
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
  };

  const profileCustomerInfo = profile?.contact ?? profile;

  const { cardMpValidation } = useYupValidation();

  const handleSubmit = async (values: any) => {
    console.log({ values });
    setOnPaymentRequest(true);
    const customerCardData = {
      ...values,
      identification: {
        type: profileCustomerInfo?.type_doc,
        number: profileCustomerInfo?.identification,
      },
    };

    console.log({ customerCardData });

    const paymentDetails = {
      trial: true,
      paymentData: {
        contractId: contractDraftCreated?.details.id,
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

    console.log({ paymentDetails });

    const paymentData = {
      transactionAmount: product?.total_price,
      installments: quotes,
      description: `Pago de contrato (ID: ${contractDraftCreated.details.id})`,
      payer: {
        email: profileCustomerInfo?.email,
        identification: {
          type: profileCustomerInfo?.type_doc,
          number: profileCustomerInfo?.identification,
        },
      },
      paymentDetails,
      customerCardData,
    };

    console.log({ paymentData });

    try {
      await ssr.postPaymentMercadoPago(paymentData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setOnPaymentRequest(false);
    }
  };

  // 5031755734530604

  // Función para crear los datos de la tarjeta del cliente

  const createCustomerCardData = (values: any, profileCustomerInfo: any) => ({
    ...values,
    identification: {
      type: profileCustomerInfo?.type_doc,
      number: profileCustomerInfo?.identification,
    },
  });

  // Función para crear los detalles del pago
  const createPaymentDetails = (
    profileCustomerInfo: any,
    contractDraftCreated: any,
  ) => ({
    trial: true,
    paymentData: {
      contractId: contractDraftCreated?.details.id,
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
  });

  // Función para crear los datos completos del pago
  const createPaymentData = (
    product: any,
    quotes: number,
    profileCustomerInfo: any,
    contractDraftCreated: any,
    customerCardData: any,
    paymentDetails: any,
  ) => ({
    transactionAmount: product?.total_price,
    installments: quotes,
    description: `Pago de contrato (ID: ${contractDraftCreated.details.id})`,
    payer: {
      email: profileCustomerInfo?.email,
      identification: {
        type: profileCustomerInfo?.type_doc,
        number: profileCustomerInfo?.identification,
      },
    },
    paymentDetails,
    customerCardData,
  });

  // const handleSubmit = async (values: any) => {
  //   console.log({ values });
  //   setOnPaymentRequest(true);

  //   // Crear datos de la tarjeta del cliente
  //   const customerCardData = createCustomerCardData(values, profileCustomerInfo);
  //   console.log({ customerCardData });

  //   // Crear detalles del pago
  //   const paymentDetails = createPaymentDetails(profileCustomerInfo, contractDraftCreated);
  //   console.log({ paymentDetails });

  //   // Crear datos completos del pago
  //   const paymentData = createPaymentData(
  //     product,
  //     quotes = 0,
  //     profileCustomerInfo,
  //     contractDraftCreated,
  //     customerCardData,
  //     paymentDetails
  //   );
  //   console.log({ paymentData });

  //   try {
  //     await ssr.postPaymentMercadoPago(paymentData);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     setOnPaymentRequest(false);
  //   }
  // };

  console.log({ product });

  useEffect(() => {
    const createDraftContract = async (product, profile) => {
      setOnPaymentRequest(true);
      const contract = await ssr.createDraftContract(product, profile);
      console.log({ contract });

      if (!contract.error) {
        setContractDraftCreated(contract.data[0]);
        setOnPaymentRequest(false);
        mountedInputObjectState.setState(true);
      }

      console.log({ contract });
    };

    if (
      !sendRequestRef.current &&
      typeof profile !== 'undefined' &&
      profile != null &&
      product?.ficha != null
    ) {
      sendRequestRef.current = true;
      console.log('In fetch');
      createDraftContract(product, profile);
    }
  }, [profile]);

  // const createDraftContract = async (product: any, profile: any) => {
  //   try {
  //     setOnPaymentRequest(true);
  //     const contract = await ssr.createDraftContract(product, profile);
  //     setContractDraftCreated(contract);
  //     console.log({ contract });

  //     // if (!contract.error) {
  //     //   // setContractDraftCreated(contract.data[0]);
  //     // }
  //     mountedInputObjectState.setState(true);
  //     setOnPaymentRequest(false);
  //   } catch (error) {
  //     console.error('Error creating contract:', error);
  //   } finally {
  //     setOnPaymentRequest(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!sendRequestRef.current && profile && product?.ficha) {
  //     sendRequestRef.current = true;
  //     console.log('In fetch');
  //     createDraftContract(product, profile);
  //   }

  //   // Opcional: cleanup si necesitas cancelar peticiones o limpiar efectos
  //   return () => {
  //     // cleanup code si es necesario
  //   };
  // }, [profile, product]);

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
                    // disabled={
                    //   onPaymentRequest || !(isValid && dirty) || isSubmitting
                    // }
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
