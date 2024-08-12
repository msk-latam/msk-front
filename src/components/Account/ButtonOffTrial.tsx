import  { FC, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { statusOrdenVenta } from "logic/account";
import { UserCourseProgress } from "data/types";
import CancelTrialModal from "components/ModalCancelTrial/CancelTrial";

interface ButtonOffTrialProps {
  item: UserCourseProgress;
  email: string;
}

const ButtonOffTrial: FC<ButtonOffTrialProps> = ({
  item,
  email,
}) => {
  const statusOV = statusOrdenVenta(item?.ov);
  const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
  const [onRequest, setOnRequest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = async () => {
    setOnRequest(true);
  };

  useEffect(() => {
    if (isRunning != onRequest) {
      //console.log({isRunning, onRequest})
      setOnRequest(isRunning);
      setIsDisabled(isRunning);
    }
  }, [isRunning]);

  return (
    <>
    <ButtonPrimary
      onClick={handleClick}
      className=" border-2 border-solid hover:border-red-500 border-violet-custom text-violet-custom disabled:border-grey-disabled disabled:bg-transparent disabled:text-grey-disabled"
      sizeClass="py-0.5 sm:py-1 px-2 sm:px-5 mt-2"
      bordered={true}
      disabled={ isDisabled || onRequest }
    >
      {/* {onRequest ? (
        <div className="flex justify-center items-center">
          <div className="w-4 h-4 my-1 border-t-2 border-violet-custom hover:border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : ( */}
        <span className="text-[14px] sm:text-sm">Dar de baja</span>
   {/*    )} */}
    </ButtonPrimary>
   {/*  <NcModalSmall 
    isOpenProp={onRequest}
    onCloseModal={() => {
      setOnRequest(false);
    }}
    renderTrigger={() => {
      return null;
    }}
    contentExtraClass="max-w-[500px]"
    renderContent={() => (
      <TrialModalContent
        title="Tu prueba de 7 días gratis finalizará" 
        desc="Si más adelante deseas continuar 
        con este curso, deberás inscribirte.
        ¿Quieres darte de baja?"
        textButton="Confirmar" 
        cancelButton={true}
        setShow={setOnRequest}
        cancelTrial={suspendTrial}
        />
        )}
    />
    <NcModalSmall 
    isOpenProp={confirmModal}
    onCloseModal={() => {
      setConfirmModal(false);
    }}
    renderTrigger={() => {
      return null;
    }}
    contentExtraClass="max-w-[500px]"
    renderContent={() => (
      <TrialModalContent
        title="Has finalizado tu prueba de 7 días gratis" 
        desc="Para continuar con este curso, debes inscribirte."
        textButton="Ir al curso" 
        productSlug={item.slug}
        setShow={setConfirmModal}
        />
        )}
    /> */}
    <CancelTrialModal 
      isOpenProp={onRequest} 
      item={item} 
      onCloseModal={() => {
        setOnRequest(false)
      }}
    />
    </>
  );
};

export default ButtonOffTrial;
