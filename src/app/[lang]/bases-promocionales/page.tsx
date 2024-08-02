<<<<<<< Updated upstream
import React, { FC } from "react";
import PageBasesPromocionalesComponent from "@/components/MSK/bases-promocionales/Page";
import { IS_PROD } from "@/contains/constants";
export async function generateMetadata() {
  return {
    title: "Bases promocionales | MSK",
    robots: IS_PROD
=======
import React, { FC } from 'react';
import PageBasesPromocionalesComponent from '@/components/MSK/bases-promocionales/Page';
import { isProduction } from '@/utils/isProduction';
export async function generateMetadata() {
  return {
    title: 'Bases promocionales | MSK',
    robots: isProduction
>>>>>>> Stashed changes
      ? {
          index: true,
          follow: true,
        }
      : undefined,
    description:
<<<<<<< Updated upstream
      "Consulta las bases promocionales de MSK para conocer todos los detalles de nuestras promociones.",
=======
      'Consulta las bases promocionales de MSK para conocer todos los detalles de nuestras promociones.',
>>>>>>> Stashed changes
  };
}
const PageContractConditions: FC = () => {
  return <PageBasesPromocionalesComponent />;
};

export default PageContractConditions;
