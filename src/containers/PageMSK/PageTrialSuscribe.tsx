import { FC, useContext, useEffect, useState } from "react";
import { CountryContext } from "context/country/CountryContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHead from "./PageHead";
import TrialInfo from "components/Trial/TrialInfo";
import mpImg from "../../../public/images/MP.png";
import stImg from "../../../public/images/ST.svg";
import { JsonInstallmentsMapping } from "data/types";
import installmentsMapping from "../../data/jsons/__countryInstallments.json";
import TrialModalContent from "components/NcModal/TrialModalContent";
import NcModalSmall from "components/NcModal/NcModalSmall";
import InputSkeleton from "components/Skeleton/InputSkeleton";
import { useHistory, useParams } from "react-router-dom";
import TextSkeleton from "components/Skeleton/TextSkeleton";
import { DataContext } from "context/data/DataContext";
import { initRebill } from "logic/Rebill";
import { AuthContext } from "context/user/AuthContext";

export interface PageTrialSuscribeProps {
  className?: string;
}

const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = () => {
  const history = useHistory();
  const [show, setShow] = useState<boolean>(false)
  const [paymentCorrect, setPaymentCorrect] = useState<boolean | null>(null)
  const [mountedInput, setMountedInput] = useState<boolean>(false)
  const [initedRebill, setInitedRebill] = useState(false)

  const { slug }: { slug: string } = useParams();
  const { state:{ country } } = useContext(CountryContext);
  const { state:{ allCourses } } = useContext(DataContext);
  const { state:{ profile, ...authState} } = useContext(AuthContext);
  const [product] = allCourses.filter((course: any)=> slug === course.slug)
  const { gateway } = installmentsJSON[country];
  const mountedInputObjectState = {state: mountedInput, setState:setMountedInput}

  useEffect(()=>{
    if(!initedRebill && (typeof product !== 'undefined')){
      setInitedRebill(true)
      initRebill(profile, country, product, setShow, setPaymentCorrect, setMountedInput);
    }
  },[product])

  return (
    <div className="nc-PageSuscribe relative animate-fade-down">
      <PageHead
        title="Trial"
        description="Una propuesta moderna para expandir tus metas profesionales"
      />
      {/* === END SEO === */}
     <div className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5 my-24">
          <TrialInfo 
            country={country} 
            product={product}
            mountedInputState={mountedInputObjectState} 
          />
          <section>
            <div
              id="rebill_elements"
              className="flex items-center justify-center h-auto"
            >
            {!mountedInput && <InputSkeleton className="w-[390px]" />}

            </div>
            {mountedInput ? (<div className="text-violet-wash flex items-center justify-center gap-x-3 mt-4">
              <span>Pagos procesados con</span>
              <img
                src={gateway === "MP" ? `${mpImg}` : `${stImg}`}
                alt="gateway image"
              />
            </div>) : <TextSkeleton className="w-full flex items-center justify-center"/>}
          </section>
        </div>
      </div>
      
      <NcModalSmall
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => paymentCorrect ? (
          <TrialModalContent
            title="¡Listo!" 
            desc="Ya tienes disponible tu prueba de 7 días gratis en el curso elegido"
            textButton="Comienza ahora" 
            goToAccount={() => history.push("/mi-cuenta")}

            />
            ) : (
          <TrialModalContent 
            title="Prueba otro método de pago" 
            desc="No pudimos procesar los datos de tu tarjeta. Intenta con otra." 
            textButton="Volver" 
            setShow={setShow}
            />
        )}
      />
    </div>
  );
};

export default PageTrialSuscribe;