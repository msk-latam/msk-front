import React, { FC } from "react";
import PageBasesPromocionalesComponent from "@/components/MSK/bases-promocionales/Page";
export async function generateMetadata() {
  return {
    title: "MSK | Bases promocionales",
    robots: {
      index: true,
      follow: true,
    },
    description: "Consulta las bases promocionales de MSK para conocer todos los detalles de nuestras promociones."
  };
}
const PageContractConditions: FC = () => {
  return <PageBasesPromocionalesComponent/>;
};

export default PageContractConditions;