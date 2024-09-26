import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FetchSingleProduct, UserProfile } from '@/data/types';
import InputSkeleton from '@/components/Skeleton/InputSkeleton';
import { useAuth } from '@/hooks/useAuth';
import ssr from '@/services/ssr';
import { useYupValidation } from '@/hooks/useYupValidation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import mpImg from '@/public/images/MP.png';
import Image from 'next/image';
import ButtonPrimary from '../Button/ButtonPrimary';

interface MercadoPagoCheckoutProps {
  product: FetchSingleProduct | undefined;
  quotes: number;
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

type PaymentStatus = 'approved' | 'in_process' | 'error';

const MercadoPagoCheckout: FC<MercadoPagoCheckoutProps> = ({
  product,
  quotes,
  country,
  mountedInputObjectState,
}) => {
  const { profile } = useAuth();
  const sendRequestRef = useRef(false);
  const [onPaymentRequest, setOnPaymentRequest] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    // 'approved',
    // 'in_process',
    // 'error',
    null,
  );

  const profileCustomerInfo = profile?.contact ?? profile;
  const { cardMpValidation } = useYupValidation();

  // 4509953566233704

  const initialValues = {
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    amount: product?.total_price.replace('.', ''),
  };

  const createCustomerCardData = (values: any, profileCustomerInfo: any) => ({
    ...values,
    identification: {
      type: profileCustomerInfo?.type_doc,
      number: profileCustomerInfo?.identification,
    },
  });

  const createPaymentDetails = (
    profileCustomerInfo: any,
    contractDraftCreated: any,
  ) => ({
    trial: 1,
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
    mod: 'Suscripción',
    quotes,
    type: 'Suscripción',
    contract_so: contractDraftCreated.details.id,
    contract_entity_id: contractDraftCreated.details.id,
    gateway: 'Mercado Pago',
  });

  const createPaymentData = (
    product: any,
    quotes: number,
    profileCustomerInfo: any,
    contractDraftCreated: any,
    paymentData: any,
    paymentDetails: any,
  ) => ({
    transactionAmount: parseInt(product?.total_price.replace('.', '')),
    installments: quotes,
    paymentData,

    description: `Pago de contrato (ID: ${contractDraftCreated.details.id})`,
    payer: {
      first_name: profileCustomerInfo.name,
      last_name: profileCustomerInfo.last_name,
      email: profileCustomerInfo?.email,
      identification: {
        type: profileCustomerInfo?.type_doc,
        number: profileCustomerInfo?.identification,
      },
    },
    paymentDetails: {
      ...paymentDetails, // Conservamos los datos existentes de paymentDetails
      paymentData: JSON.stringify(paymentData), // Agregamos paymentData dentro de paymentDetails
    },
  });

  const createDraftContract = async (product: any, profile: any) => {
    try {
      const response = await ssr.createDraftContract(product, profile);
      console.log(response);
      if (response && response.data[0].code === 'SUCCESS') {
        return { status: 200, data: response.data[0] };
      } else {
        console.error('Error in contract response:', response);
        return { status: 500, data: null };
      }
    } catch (error) {
      console.error('Error creating contract:', error);
      return { status: 500, data: null };
    }
  };

  const handleSubmit = async (values: any) => {
    console.log({ values });
    setOnPaymentRequest(true);
    setStatusMessage('');
    setErrorMessage('');
    setStatusMessage('Creando nuevo contrato...');
    let contract;
    try {
      contract = await createDraftContract(product, profile);
      console.log({ contract });
      if (contract.status === 200 && contract.data) {
        setStatusMessage('Contrato creado correctamente.');
        // setContractDraftCreated(contract.data);
      } else {
        setErrorMessage(
          'Hubo un problema al crear el contrato. Inténtalo de nuevo.',
        );
        setStatusMessage('');
        setOnPaymentRequest(false);
        return;
      }
    } catch (error) {
      console.error('Error al crear contrato:', error);
      setErrorMessage(
        'Hubo un problema al crear el contrato. Inténtalo de nuevo.',
      );
      setStatusMessage('');
      setOnPaymentRequest(false);
      return;
    }

    const customerCardData = createCustomerCardData(
      values,
      profileCustomerInfo,
    );
    setStatusMessage('Generando información de la tarjeta del cliente...');

    const paymentDetails = createPaymentDetails(
      profileCustomerInfo,
      contract.data,
    );
    setStatusMessage('Generando detalles de pago...');

    const paymentData = createPaymentData(
      product,
      quotes,
      profileCustomerInfo,
      contract.data,
      customerCardData,
      paymentDetails,
    );
    setStatusMessage('Preparando los datos para procesar el pago...');

    console.log(paymentData);
    console.log(JSON.stringify(paymentData));

    try {
      const response = await ssr.postPaymentMercadoPago(paymentData);
      if (response) {
        console.log(response);
        setPaymentStatus(response.status);
        setStatusMessage('Pago procesado exitosamente.');
        setOnPaymentRequest(false);
      } else {
        console.error('Error en la respuesta del servidor:', response);
        setErrorMessage(
          'Hubo un problema al procesar el pago. Inténtalo de nuevo.',
        );
        setStatusMessage('');
        setOnPaymentRequest(false);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // setErrorMessage(
      //   'Hubo un problema al procesar el pago. Inténtalo de nuevo.',
      // );
      setPaymentStatus('error'), setStatusMessage('');
      setOnPaymentRequest(false);
    }
  };

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = 1000;

    const checkAndSetState = () => {
      if (
        !sendRequestRef.current &&
        typeof profile !== 'undefined' &&
        profile != null &&
        product?.ficha != null
      ) {
        sendRequestRef.current = true;
        mountedInputObjectState.setState(true);
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(checkAndSetState, retryInterval);
      }
    };

    checkAndSetState();
  }, [profile, product]);

  console.log(profile);
  console.log(product);

  const paymentStatusMessages = {
    approved: {
      bgColor: 'bg-[#DBECDD]',
      strokeColor: 'border-[#0B934A]',
      textColor: 'text-[#374161]',
      title: 'El pago realizado ha sido aprobado correctamente',
      message:
        'Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.',
      icon: '/webp-images/icons/activo.svg',
    },
    in_process: {
      bgColor: 'bg-[#FFF8EE]',
      strokeColor: 'border-[#F28A52]',
      textColor: 'text-[#374161]',
      title: 'El pago realizado está en estado pendiente',
      message:
        'Tu pago está siendo procesado. Por favor, espera unos minutos y revisa tu correo para más información.',
      icon: '/webp-images/icons/trialIcon.svg',
    },
    error: {
      bgColor: 'bg-[#FFE8E8]',
      strokeColor: 'border-[#F24C4C]',
      textColor: 'text-[#374161]',
      title: 'El pago realizado ha sido rechazado',
      message:
        'Ocurrió un problema al procesar el pago. Por favor, intenta nuevamente o contacta a soporte.',
      icon: '/webp-images/icons/expirado.svg',
    },
  };

  return (
    <>
      {mountedInputObjectState.state ? (
        <div className='mpc-box !p-0 md:!p-[20px]'>
          {/* Verifica el estado del pago */}
          {paymentStatus ? (
            <div
              className={`${paymentStatusMessages[paymentStatus]?.bgColor} p-4 rounded-md border ${paymentStatusMessages[paymentStatus]?.strokeColor} relative text-left`}
            >
              {/* Icono - visible solo en pantallas grandes */}
              <div className='absolute top-0 right-0 p-5 pt-5 '>
                <img
                  src={paymentStatusMessages[paymentStatus]?.icon}
                  alt='Status Icon'
                  className='w-5 h-5'
                />
              </div>

              {/* Título - centrado en móviles */}
              <h2
                className={`text-2xl font-bold ${paymentStatusMessages[paymentStatus]?.textColor} w-full lg:w-80 pr-8 mb-2`}
              >
                {paymentStatusMessages[paymentStatus]?.title}
              </h2>

              {/* Mensaje - centrado en móviles */}
              <p
                className={`${paymentStatusMessages[paymentStatus]?.textColor} w-full font-normal`}
              >
                {paymentStatusMessages[paymentStatus]?.message}
              </p>

              <div className='mt-8'>
                {paymentStatus === 'error' ? (
                  <ButtonPrimary
                    href='#'
                    onClick={() => window.location.reload()}
                    className='w-full'
                  >
                    Volver a intentar
                  </ButtonPrimary>
                ) : (
                  <div className='mt-8'>
                    <ButtonPrimary className='w-full' href='/'>
                      Seguir navegando
                    </ButtonPrimary>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className='text-red-500'>
                  {/* Mostrar errores si existen */}
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Formulario de pago */}
              <div
                className={`mpc-field mb-5 ${
                  onPaymentRequest ? 'mpc-field-requesting hidden' : ''
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
                              setFieldValue(
                                'cardNumber',
                                e.target.value.trim(),
                              );
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
                            placeholder='Mes (MM)'
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
                            placeholder='Año (AAAA)'
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
                            type='password'
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
                        className={`cont-btn !w-full col-span-1 disabled:bg-grey-disabled disabled:cursor-not-allowed`}
                        type='submit'
                        disabled={
                          onPaymentRequest ||
                          !(isValid && dirty) ||
                          isSubmitting
                        }
                      >
                        {onPaymentRequest ? (
                          <div className='flex items-center justify-center'>
                            {/* Mostrar mensaje de estado y spinner */}
                            {statusMessage && <p>{statusMessage}</p>}
                            <svg
                              aria-hidden='true'
                              className='w-5 h-5 ml-2 text-gray-200 animate-spin fill-blue-600'
                              viewBox='0 0 100 101'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M100 50.5908C100 78.2055 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2055 0 50.5908C0 22.9761 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9761 100 50.5908ZM9.08157 50.5908C9.08157 74.1944 26.3964 91.5092 50 91.5092C73.6036 91.5092 90.9184 74.1944 90.9184 50.5908C90.9184 26.9873 73.6036 9.67255 50 9.67255C26.3964 9.67255 9.08157 26.9873 9.08157 50.5908Z'
                                fill='currentColor'
                              />
                              <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5531C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41288C69.5422 4.10285 63.2754 1.94025 56.7221 1.05197C51.7666 0.367443 46.7499 0.446843 41.8298 1.27873C39.3861 1.69037 37.9177 4.19778 38.5548 6.62326C39.1919 9.04874 41.676 10.4713 44.1492 10.1076C47.924 9.49241 51.7813 9.46611 55.5736 10.0255C60.6948 10.791 65.6273 12.6034 70.1107 15.3735C74.594 18.1435 78.5301 21.819 81.678 26.1586C84.2175 29.7198 86.2287 33.6006 87.6438 37.7002C88.4883 40.0586 91.5421 40.6779 93.9676 39.0409Z'
                                fill='currentFill'
                              />
                            </svg>
                          </div>
                        ) : (
                          'Finalizar'
                        )}
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
            </>
          )}
        </div>
      ) : (
        <InputSkeleton
          className='w-[390px] mx-auto'
          text='Cargando datos de pago'
        />
      )}
    </>
  );
};

export default MercadoPagoCheckout;
