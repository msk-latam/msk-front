import React, { FC } from "react";
import PageSuscribeComponent from "@/components/MSK/suscribe/Page";
export async function generateMetadata() {
  return {
    title: "Trial",
    description: "Una propuesta moderna para expandir tus metas profesionales"
  };
}
const PageSuscribe: FC = () => {
  return <PageSuscribeComponent/>;
};

export default PageSuscribe;