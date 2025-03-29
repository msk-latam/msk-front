import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";

const NoResults: FC = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <NcImage
        src={"/images/icons/no_results.svg"}
        width="47"
        height="47"
        className="mx-auto"
        alt=""
      />
      <h4 className="text-center text-[18px] w-full font-medium">
        No hay resultados para tu búsqueda
      </h4>
      <p className="text-center text-[12px] leading-4">
        Elige otra opción e infórmate en Medical & Scientific Knowledge
      </p>
    </div>
  );
};

export default NoResults;
