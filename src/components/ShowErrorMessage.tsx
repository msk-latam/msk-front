import { FC } from "react";
import errorIcon from "/public/images/icons/error-icon.svg";
import Image from "next/image";

interface ShowErrorMessageProps {
  text: string;
  visible?: boolean;
}

const ShowErrorMessage: FC<ShowErrorMessageProps> = ({ text, visible }) => {
  return (
    <div className="flex  items-center mt-4 w-full" style={{ visibility: visible ? "visible" : "hidden" }}>
      <Image src={errorIcon.src} width={30} height={30} className="mr-2" alt="error" />
      <span
        className="text-red-500 text-center font-bold"
        dangerouslySetInnerHTML={{ __html: text }}
      ></span>
    </div>
  );
};

export default ShowErrorMessage;
