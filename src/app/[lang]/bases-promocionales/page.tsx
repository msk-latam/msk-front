import React, { FC } from "react";
import PageBasesPromocionalesComponent from "@/components/MSK/bases-promocionales/Page";
export async function generateMetadata() {
  return {
    title: "Bases promocionales",
  };
}
const PageContractConditions: FC = () => {
  return <PageBasesPromocionalesComponent/>;
};

export default PageContractConditions;