"use client";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import installmentsMapping from "@/data/jsons/__countryInstallments.json";
import {JsonInstallmentsMapping} from "@/data/types";
import { useParams } from "next/navigation";
import { CountryContext } from "@/context/country/CountryContext";
import useRequestedTrialCourse from "@/hooks/useRequestedTrialCourse";
import TrialInfo from "@/components/Trial/TrialInfo";
import NcLink from "@/components/NcLink/NcLink";
import NcModalSmall from "@/components/NcModal/NcModalSmall";
import TrialModalContent from "@/components/NcModal/TrialModalContent";
import MissingModalContent from "@/components/NcModal/MissingModalContent";
import useSingleProduct from "@/hooks/useSingleProduct";
import { AuthContext } from "@/context/user/AuthContext";
import ssr from "@Services/ssr";
import RebillCheckout from "@/components/Checkout/RebillCheckout";
import MercadoPagoCheckout from "@/components/Checkout/MercadoPagoCheckout";

export interface PageTrialSuscribeProps {
  className?: string;
}

const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = () => {
  const {countryState: { country }} = useContext(CountryContext);
  const { state: AuthState, dispatch } = useContext(AuthContext);
  const { slug }: { slug: string } = useParams();
  const { product } = useSingleProduct(slug, { country });

  const [show, setShow] = useState<boolean>(false);
  const viewRef = useRef<any>();
  const [mountedInput, setMountedInput] = useState<boolean>(false);
  const [faliedMessage, setFaliedMessage] = useState<string>("");
  const [paymentCorrect, setPaymentCorrect] = useState<boolean | null>(null);

  let installments = 0 as number | null;

  const [totalAmount, setTotalAmount] = useState(0)
  const [installmentAmount, setInstallmentAmount] = useState(0)

  const { executeRecaptcha } = useGoogleReCaptcha();

  let gateway: null | string = null;
  if (installmentsJSON && country && installmentsJSON[country]) {
    gateway = installmentsJSON[country].gateway;
  }

  const mountedInputObjectState = {
    state: mountedInput,
    setState: setMountedInput,
  };
  const {
    hasCoursedRequested,
    showAlreadyRequest,
    showMissingData,
    setShowAlreadyRequest,
    setShowMissingData,
  } = useRequestedTrialCourse(product);

  useEffect(() => {
    if (installmentsJSON && country && installmentsJSON[country]) {
      installments = installmentsJSON[country].quotes;
    }

    if(typeof product !== 'undefined' && installments != null){
      let totalAmount = parseFloat(product.total_price.replace(/\./g, "").replace(",", ".").replaceAll(".",""));
      setTotalAmount(totalAmount)
      setInstallmentAmount(totalAmount / installments)

      product.totalAmount = totalAmount
      product.installmentAmount = (totalAmount / installments)
    }

  }, [product])


  useEffect(() => {
    if (typeof window !== "undefined") {
      const profile = AuthState.profile;
      console.log("Profile Effect", { profile });

      const fetchProfile = async () => {
        const res = await ssr.getUserData();
        // console.log(res)
        dispatch({ type: "UPDATE_PROFILE", payload: { profile: res.contact } });
      };

      if (profile == null || typeof AuthState === "undefined") {
        fetchProfile();
      }
    }
  }, [AuthState.profile]);

  const renderCheckoutComponent = () =>{
    console.log({gateway})
    switch (gateway) {
      case 'REBILL':
        return <RebillCheckout
                    product={product}
                    hasCoursedRequested={hasCoursedRequested}
                    country={country}
                    showMissingData={showMissingData}
                    setShow={setShow}
                    setFaliedMessage={setFaliedMessage}
                    setPaymentCorrect={setPaymentCorrect}
                    mountedInputObjectState={mountedInputObjectState}
              />;
      case 'MP':
        return <MercadoPagoCheckout
                    product={product}
                    quotes={installments}
                    hasCoursedRequested={hasCoursedRequested}
                    country={country}
                    showMissingData={showMissingData}
                    setShow={setShow}
                    setFaliedMessage={setFaliedMessage}
                    setPaymentCorrect={setPaymentCorrect}
                    mountedInputObjectState={mountedInputObjectState}
                />;
      case 'ST':
       // return <StripePaymentForm payment={invoiceDetail} currency={currencyOptions.currency} />;
      default:
        return <RebillCheckout
            product={product}
            hasCoursedRequested={hasCoursedRequested}
            country={country}
            showMissingData={showMissingData}
            setShow={setShow}
            setFaliedMessage={setFaliedMessage}
            setPaymentCorrect={setPaymentCorrect}
            mountedInputObjectState={mountedInputObjectState}
        />;;
    }
  }

  return (
    <div ref={viewRef} className="nc-PageSuscribe relative animate-fade-down">
      <div className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5 my-24">
          <TrialInfo
            country={country}
            product={product}
            installmentAmount={installmentAmount}
            mountedInputState={mountedInputObjectState}
          />

          <section>
            <p className="text-center mb-4 text-violet-strong font-normal">
              Ingresa los datos de tu tarjeta de débito o crédito. <br />
              No se realizará ningún cargo hasta el octavo día.
            </p>

            {renderCheckoutComponent()}

            <NcLink
              href="/condiciones-de-contratacion#trial"
              target="_blank"
              className="text-primary hover:text-primary underline flex items-center justify-center mt-3"
            >
              Ver términos y condiciones de prueba gratuita
            </NcLink>
          </section>
        </div>
      </div>

      <NcModalSmall
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
          viewRef.current.classList.remove("blur-md");
        }}
        renderTrigger={() => {
          return null;
        }}
        blurView={viewRef}
        contentExtraClass="max-w-screen-lg"
        renderContent={() =>
          paymentCorrect ? (
            <TrialModalContent
              title="¡Listo!"
              desc="Ya tienes disponible tu prueba de 7 días gratis en el curso elegido"
              textButton="Comienza ahora"
              goToAccount={true}
            />
          ) : (
            <TrialModalContent
              title="Prueba otro método de pago"
              desc="No pudimos procesar los datos de tu tarjeta. Intenta con otra."
              faliedMessage={faliedMessage}
              textButton="Volver"
              setShow={setShow}
            />
          )
        }
      />

      <NcModalSmall
        isOpenProp={showMissingData}
        onCloseModal={() => {
          setShowMissingData(false);
          viewRef.current.classList.remove("blur-md");
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-[350px]"
        blurView={viewRef}
        renderContent={() => (
          <MissingModalContent
            title="Antes de acceder a tu prueba gratuita"
            desc="Completa tu número de documento entre los datos personales de tu cuenta y continúa con tu solicitud de prueba."
            textButton="Ir a Datos personales"
            productSlug={slug}
            goToPersonalData={true}
          />
        )}
      />

      <NcModalSmall
        isOpenProp={showAlreadyRequest}
        onCloseModal={() => {
          setShowAlreadyRequest(false);
          viewRef.current.classList.remove("blur-md");
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        blurView={viewRef}
        renderContent={() => (
          <TrialModalContent
            title="Prueba ya solicitada"
            desc="Para continuar con este curso, debes inscribirte."
            textButton="Volver"
            goToCourse={slug}
          />
        )}
      />
    </div>
  );
};

export default PageTrialSuscribe;
