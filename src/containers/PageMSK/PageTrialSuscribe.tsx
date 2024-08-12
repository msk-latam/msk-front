import { FC, useContext, useEffect, useRef, useState } from "react";
import { CountryContext } from "context/country/CountryContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHead from "containers/Head/PageHead";
import TrialInfo from "components/Trial/TrialInfo";
import mpImg from "../../../public/images/MP.png";
import stImg from "../../../public/images/ST.svg";
import rbImg from "../../../public/images/rebill.svg";
import { JsonInstallmentsMapping } from "data/types";
import installmentsMapping from "../../data/jsons/__countryInstallments.json";
import TrialModalContent from "components/NcModal/TrialModalContent";
import NcModalSmall from "components/NcModal/NcModalSmall";
import InputSkeleton from "components/Skeleton/InputSkeleton";
import { Link, useParams } from "react-router-dom";
import TextSkeleton from "components/Skeleton/TextSkeleton";
import { DataContext } from "context/data/DataContext";
import { REBILL_CONF, initRebill, initRebillConfig } from "logic/Rebill";
import useRequestedTrialCourse from "hooks/useRequestedTrialCourse";
import api from "Services/api";
import MissingModalContent from "components/NcModal/MissingModalContent";

export interface PageTrialSuscribeProps {
  className?: string;
}

const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = () => {
  const [show, setShow] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<string | null>(JSON.parse(localStorage.getItem("userProfile") as string))
  const viewRef = useRef<any>();
  const [mountedInput, setMountedInput] = useState<boolean>(false)
  const [faliedMessage, setFaliedMessage] = useState<string>("")
  const [paymentCorrect, setPaymentCorrect] = useState<boolean | null>(null)
  const [initedRebill, setInitedRebill] = useState<boolean | null>(null)
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { slug }: { slug: string } = useParams();
  const { state: { country } } = useContext(CountryContext);
  const { state: { allCourses } } = useContext(DataContext);
  const [product] = allCourses.filter((course: any) => slug === course.slug)
  const { gateway } = installmentsJSON[country];

  const mountedInputObjectState = { state: mountedInput, setState: setMountedInput }
  const { 
    hasCoursedRequested, 
    showAlreadyRequest, 
    showMissingData, 
    setShowAlreadyRequest,
    setShowMissingData 
  } = useRequestedTrialCourse(product);


  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile") as string);

    const fetchProfile = async () =>{
        const res = await api.getUserData();
        setUserProfile(res)
    }
    
    if(profile == null || typeof userProfile === 'undefined'){
      fetchProfile()
    }

  },[userProfile])

  useEffect(() => {
    const initialization = initRebillConfig(country);
    //console.log({rebillConf: initialization})

    let RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

    const verifiedCoursedRequested = (hasCoursedRequested != null && !hasCoursedRequested);
    const verifiedProductAndProfile = (typeof product !== 'undefined' && userProfile != null && Object.keys(userProfile).length > 1);

    if (initedRebill == null && verifiedCoursedRequested && verifiedProductAndProfile && !showMissingData) {
      setInitedRebill(true)
      console.group("Rebill")
      localStorage.removeItem('trialURL');
      initRebill(userProfile, country, product, RebillSDKCheckout, setShow,setFaliedMessage, setPaymentCorrect, setMountedInput);
      console.groupEnd()
    }
  }, [product, hasCoursedRequested, userProfile])


  return (
    <div ref={viewRef} className="nc-PageSuscribe relative animate-fade-down">
      <PageHead
        title="Trial"
        description="Una propuesta moderna para expandir tus metas profesionales"
      />
      <div className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5 my-24">
          <TrialInfo
            country={country}
            product={product}
            mountedInputState={mountedInputObjectState}
          />


          <section>
            <div className="text-center mb-4 text-violet-strong">
              Ingresa los datos de tu tarjeta de débito o crédito. <br />
              No se realizará ningún cargo hasta el octavo día.
            </div>
            <div
              id="rebill_elements"
              className="flex items-center justify-center h-auto"
            >
              {mountedInput && <InputSkeleton className="w-[390px]" />}
            </div>
            {mountedInput ? (<div className="text-violet-wash flex items-center justify-center gap-x-3 mt-4">
              <span>Pagos procesados con</span>
              <img
                src={gateway === "MP" ? `${mpImg}` : gateway === "ST" ? `${stImg}` : `${rbImg}`}
                alt="gateway image"
              />
              
            </div>) : <TextSkeleton className="w-full flex items-center justify-center" />}
            <Link
              to="/terminos-y-condiciones#trial"
              target="_blank"
              className="text-primary hover:text-primary underline flex items-center justify-center mt-3"
            >
              Ver términos y condiciones de prueba gratuita
            </Link>
          </section>
        </div>
      </div>

      <NcModalSmall
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
          viewRef.current.classList.remove("blur-md")

        }}
        renderTrigger={() => {
          return null;
        }}
        blurView={viewRef}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => paymentCorrect ? (
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
        )}
      />

    <NcModalSmall
        isOpenProp={showMissingData}
        onCloseModal={() => {
          setShowMissingData(false);
          viewRef.current.classList.remove("blur-md")
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
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
          viewRef.current.classList.remove("blur-md")
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
