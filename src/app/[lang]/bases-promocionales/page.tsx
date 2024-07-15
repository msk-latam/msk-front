import React, { FC } from "react";
import PageBasesPromocionalesComponent from "@/components/MSK/bases-promocionales/Page";
import { isProduction } from "@/utils/isProduction";
export async function generateMetadata() {
  return {
    title: "Bases promocionales | MSK",
    robots: isProduction ? {
      index: true,
      follow: true,
    }: undefined,
    description: "Consulta las bases promocionales de MSK para conocer todos los detalles de nuestras promociones."
  };
}
const PageContractConditions: FC = () => {
  return <PageBasesPromocionalesComponent/>;
};

export default PageContractConditions;