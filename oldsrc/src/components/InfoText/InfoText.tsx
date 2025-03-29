import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";

interface InfoTextProps {
  addClassNames?: string;
  text: string;
}

const InfoText: FC<InfoTextProps> = ({ addClassNames, text }) => {
  return (
    <span
      className={`${addClassNames} dark:text-primary-500 forgot-password col-span-2 text-sm flex items-center`}
    >
      <NcImage
        src={"/images/icons/info.svg"}
        alt="Mensaje Informativo"
        className="mr-1"
        height="15"
        width="15"
      />
      <span className="text-violet-wash">{text}</span>
    </span>
  );
};

export default InfoText;
