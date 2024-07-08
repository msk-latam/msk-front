import { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { statusOrdenVenta } from "@/lib/account";
import { UserCourseProgress } from "@/data/types";
import CancelTrialModal from "@/components/Modal/CancelTrial";

interface ButtonOffTrialProps {
  item: UserCourseProgress;
  email: string;
}

const ButtonOffTrial: FC<ButtonOffTrialProps> = ({ item, email }) => {
  const statusOV = statusOrdenVenta(item?.ov);
  const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
  const [onRequest, setOnRequest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = async () => {
    setOnRequest(true);
  };

  useEffect(() => {
    if (isRunning != onRequest) {
      //// console.log({isRunning, onRequest})
      setOnRequest(isRunning);
      setIsDisabled(isRunning);
    }
  }, [isRunning]);

  return (
    <>
      <ButtonPrimary
        onClick={handleClick}
        className="border-2 border-solid hover:border-red-500 border-violet-custom text-violet-custom disabled:border-grey-disabled bg-transparent disabled:text-grey-disabled"
        sizeClass="py-0.5 sm:py-1 px-2 sm:px-5 mt-2"
        bordered={true}
        disabled={isDisabled || onRequest}
      >
        <span className="text-[14px] sm:text-sm font-bold">Dar de baja</span>
      </ButtonPrimary>

      <CancelTrialModal
        isOpenProp={onRequest}
        item={item}
        onCloseModal={() => {
          setOnRequest(false);
        }}
      />
    </>
  );
};

export default ButtonOffTrial;
