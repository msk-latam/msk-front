import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";

interface CentroAyudaLinkProps {
  addClassNames?: string;
}

const CentroAyudaLink: FC<CentroAyudaLinkProps> = ({ addClassNames }) => {
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
      <div className="flex flex-wrap text-[10px] sm:text-sm">
        <span className="text-violet-wash">Visita el Centro de ayuda.</span>
        <a
          className="nc-NcLink underline text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000"
          href="https://ayuda.msklatam.com/"
          target="_blank"
        >
          Ingresa aquí
        </a>
      </div>
    </span>
  );
};

export default CentroAyudaLink;
