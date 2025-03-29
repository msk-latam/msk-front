import React, { FC } from "react";
import PageTrialComponent from "@/components/MSK/trial/Page";
export async function generateMetadata() {
  return {
    title: "Crear cuenta | MSK",
  };
}
const PageTrial: FC = () => {
  return <PageTrialComponent/>;
};

export default PageTrial;