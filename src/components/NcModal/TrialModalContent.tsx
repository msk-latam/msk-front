import { useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface TrialModalContentProps {
  title: string;
  desc: string;
  faliedMessage?: string;
  textButton: string;
  setShow?: Dispatch<SetStateAction<boolean>>;
  productSlug?: string | undefined;
  goToAccount?: boolean | undefined;
  goToCourse?: string | undefined;
  cancelButton?: boolean | undefined;
  cancelTrial?: () => void;
  onCancelTrial?: () => void;
}

const TrialModalContent: FC<TrialModalContentProps> = ({
  cancelTrial,
  onCancelTrial,
  setShow,
  productSlug,
  cancelButton,
  goToAccount,
  goToCourse,
  title,
  desc,
  faliedMessage,
  textButton,
}) => {
  const [interact, setInteract] = useState(false);
  const history = useRouter();

  const handleCloseModal = (forElement: string | null = null) => {
    setInteract(true)
    if(title.includes("Prueba ya solicitada") && goToCourse){
      history.push(`/curso/${goToCourse}`)
      return
    }

    if((textButton.includes("Volver") || (forElement != null && forElement.includes("Cancelar"))) && typeof setShow !== 'undefined' && typeof onCancelTrial !== 'undefined'){
      setShow(false)
      setInteract(true)
      onCancelTrial()
      return
    }


    if((textButton.includes("Volver") || (forElement != null && forElement.includes("Cancelar"))) && typeof setShow !== 'undefined'){
      setShow(false)
      setInteract(true)
      return
    }

    if(title.includes("Listo") && goToAccount){
      history.push("/gracias?trial=success")
    }

    if(textButton.includes("Confirmar") && typeof cancelTrial !== 'undefined'){
      //console.log("Confirmar action")
      cancelTrial()
      return
    }

    if(textButton.includes("Ir al curso") && typeof productSlug !== 'undefined'){
      history.push(`/curso/${productSlug}`)
    }
  };

  const handleClickOutsideModal = (event: MouseEvent) => {
    const modal = document.getElementById("trial_modal");
    if (modal && !modal.contains(event.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
      setInteract(false);
    };
  }, []);

  return (
      <div id='trial_modal' className='text-center'>
        <h4 className='text-xl mb-4'>{title}</h4>
        <p className='mb-4 font-medium text-violet-wash'>{desc}</p>
        {faliedMessage && <p className='mb-8 font-medium text-red-600'>{faliedMessage}</p>}
        <button onClick={() => handleCloseModal()} disabled={interact}
                className="video-cart-btn w-full disabled:cursor-not-allowed disabled:bg-grey-disabled">{interact ? "Solicitando ..." : textButton}</button>
        {cancelButton &&
            <button
                onClick={() => handleCloseModal("Cancelar")}
                disabled={interact}
                className="video-cart-btn border-2 w-full mt-2 disabled:cursor-not-allowed disabled:hover:bg-grey-disabled disabled:bg-grey-disabled disabled:text-white disabled:border-white disabled:hover:border-white">Cancelar</button>
        }
      </div>
  );
};

export default TrialModalContent;
