import React, { FC, useContext, useEffect, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import useInterval from "@/hooks/useInterval";
//import { useInterval } from 'usehooks-ts'
import { hasText, statusOrdenVenta } from "@/lib/account";
import { UserCourseProgress } from "@/data/types";

interface ButtonAccessCourseProps {
  item: UserCourseProgress;
  goToEnroll: (product_code: number, email: string) => Promise<any>;
  goToLMS: (
    product_code: number,
    product_code_cedente: string,
    email: string
  ) => void;
  email: string;
}

const ButtonAccessCourse: FC<ButtonAccessCourseProps> = ({
  item,
  goToEnroll,
  goToLMS,
  email,
}) => {
  const statusOV = statusOrdenVenta(item?.ov);

  const [status, setStatus] = useState(item?.status);
  const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
  const [onRequest, setOnRequest] = useState(false);
  const isReadyToEnroll = item?.status?.includes("Listo para enrolar");

  const { isRunning, data, startWatch } = useInterval(email);

  const handleClick = async () => {
    console.log('handle click as');
    setOnRequest(true);
    try {
      console.log(status);
      if (status === "Sin enrolar") {
        const response = await goToEnroll(item.product_code, email);

        if (response.data[0].code.includes("SUCCESS")) {
          const watching = await startWatch(item.product_code);
          // console.log(!!watching, { watching });
          setOnRequest(!!watching);
        } else {
          setOnRequest(false);
        }
      } else {
        console.log('go to LMS: ', item.product_code, item.product_code_cedente);
        goToLMS(item.product_code, item.product_code_cedente as string, email);
        setOnRequest(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isRunning !== onRequest) {
      setOnRequest(isRunning);
    }
  }, [isRunning]);

  return (
    <ButtonPrimary
      onClick={handleClick}
      sizeClass="py-0.5 sm:py-1 px-2 sm:px-5"
      disabled={isDisabled || onRequest || isReadyToEnroll}
    >
      {onRequest || isReadyToEnroll ? (
        <div className="flex justify-center items-center">
          <span className="text-[10px] sm:text-sm mr-2">Activando</span>
          <div className="w-4 h-4 my-1 border-t-2 border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <span className="text-[14px] sm:text-sm font-bold">{hasText(status)}</span>
      )}
    </ButtonPrimary>
  );
};

export default ButtonAccessCourse;
