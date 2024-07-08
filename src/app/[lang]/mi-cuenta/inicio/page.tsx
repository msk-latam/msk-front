import React, { FC } from "react";
import PageMiCuentaComponent from "@/components/MSK/mi-cuenta/Page";
export async function generateMetadata() {
  return {
    title: "Mi Cuenta",
  };
}
const PageGracias: FC = () => {
  return <PageMiCuentaComponent/>;
};

export default PageGracias;