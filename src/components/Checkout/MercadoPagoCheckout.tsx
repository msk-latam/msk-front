import React, {Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import {CardNumber, createCardToken, ExpirationDate, initMercadoPago, SecurityCode} from "@mercadopago/sdk-react";
import {getMPPublicKeyFromCountry} from "@/logic/MercadoPago";
import cardIcon from '/public/images/credit-card.svg'
import {AuthContext} from "@/context/user/AuthContext";
import Image from 'next/image'
import {FetchSingleProduct} from "@/data/types";
import InputSkeleton from "@/components/Skeleton/InputSkeleton";
import api from "@/services/api";

interface MercadoPagoCheckoutProps{
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
        setState: Dispatch<SetStateAction<boolean>>
    }
}

const MercadoPagoCheckout: FC<MercadoPagoCheckoutProps> = ({
                                                               product,
                                                                quotes,
                                                               country,
                                                               mountedInputObjectState
}) => {
    const { state: AuthState } = useContext(AuthContext);

    const documentNumber = AuthState?.profile?.identification
    const [onPaymentRequest, setOnPaymentRequest] = useState(false);
    console.log({AuthState})

    let mpKey = getMPPublicKeyFromCountry(country);
    console.log({mpKey})
    initMercadoPago(mpKey);

    if(typeof mpKey !== "undefined" && mpKey !== "" && product?.ficha){
        mountedInputObjectState.setState(true);
    }

    const cardToken = async () => {
        const response = await createCardToken({
            cardholderName: 'APRO',
            identificationType: 'DNI',
            identificationNumber: documentNumber,
        });
        console.log('Card Token Response = ', response);
        return response?.id;
    };

    const handlePayment = async () => {
        setOnPaymentRequest(true);
        let token = await cardToken();
        try {
            const paymentResult = await api.createContactTrialMP({
                token,
                transaction_amount: product?.installmentAmount,
                description: `Solicitud de trial (${product?.ficha.title})`,
                installments: quotes,
                payment_method_id: 'visa',
                user: AuthState.profile,
                product
            }, country)


            console.log('Payment Result: ', paymentResult);
        } catch (error: any) {
            console.error('Error processing payment: ', {error});
            if(error.status === 504){
                console.log('Error al procesar el pago', 'El servidor no logro procesar el pago correctamente, intentelo nuevamente', 'error');
            }
        }finally {
            setOnPaymentRequest(false);
        }
    }

    return(
        <>
            {mountedInputObjectState.state ? <div className="mpc-box">
                <div className={`mpc-field ${onPaymentRequest ? 'mpc-field-requesting hidden' : null}`}>
                    <Image src={cardIcon} alt="Mercado Pago" className="mr-3"></Image>
                    <CardNumber
                        placeholder='1234 5678 9123 4567'
                    />
                    <ExpirationDate
                        placeholder='01/01'
                        mode='short'
                    />
                    <SecurityCode
                        placeholder='333'
                    />
                </div>

                <button
                    className="mpc-button"
                    onClick={() => handlePayment()}
                    disabled={onPaymentRequest}
                >
                    {onPaymentRequest ? 'Procesando ...' : 'Finalizar'}
                </button>
            </div> : <InputSkeleton className="w-[390px] mx-auto"/>}
        </>
    )

}

export default MercadoPagoCheckout;